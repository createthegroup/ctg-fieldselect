/*global jQuery */
/*jshint bitwise: true, camelcase: true, curly: true, eqeqeq: true, forin: true,
immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: single,
undef: true, unused: true, strict: true, trailing: true, browser: true */

(function ($) {

    'use strict';

    $.widget('ctg.fieldSelect', {

        options: {
            valueClass: 'ctg-fieldselect-value',
            textClass: 'ctg-fieldselect-text',
            iconClass: 'ctg-fieldselect-icon',
            focusClass: 'ctg-fieldselect-focus',
            disabledClass: 'ctg-fieldselect-disabled'
        },

        _create: function () {

            this.element.addClass('ctg-fieldselect');
            
            this._objects();
            this._events();
            this.refresh();

            return;
        },

        _objects: function () {

            this.objects = {};

            this.objects.select = this.element.find('select');
            this.objects.value = $('<span />', {
                'class': this.options.valueClass
            });
            this.objects.text = $('<span />', {
                'class': this.options.textClass
            });
            this.objects.icon = $('<span />', {
                'class': this.options.iconClass
            });

            this.objects.value
                .append(this.objects.text)
                .append(this.objects.icon)
                .prependTo(this.element);

            return;
        },

        _events: function () {

            var self = this;

            this.element
                .delegate('select', 'change keyup', function () {
                    self._updateValue();
                })
                .delegate('select', 'focus', function () {
                    self.element.addClass(self.options.focusClass);
                })
                .delegate('select', 'blur', function () {
                    self.element.removeClass(self.options.focusClass);
                });

            return;
        },

        _updateWidth: function () {

            var self = this,
                widths;

            this.objects.value.width('');

            // set width to widest value (mimics behaviour of native select boxes)
            widths = $.map(self.objects.select.find('option'), function (value) {
                self.objects.text.text($(value).text());
                return self.objects.value.width();
            });

            this._updateValue(); // reset value to selected option
            
            this.objects.value.width(Math.max.apply(Math, widths));
            this.objects.select.width(this.objects.value.outerWidth());

            return;
        },

        _updateValue: function () {

            this.objects.text
                .text(this.objects.select.find('option:selected').text());

            return;
        },

        _updateState: function () {

            this.element[this.objects.select.is(':disabled') ? 'addClass' : 'removeClass'](this.options.disabledClass);

            return;
        },

        refresh: function () {

            this._updateValue();
            this._updateWidth();
            this._updateState();

            return;
        }

    });

})(jQuery);