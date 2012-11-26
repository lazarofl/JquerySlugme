/*
 *  Project: Jquery Slugme
 *  Description: Converts a text from any html element to a slug format used to build a part of a url
 *  Author: Lazaro Lima - http://www.linkedin.com/in/lazaroflima  >>> São Paulo, Brazil
 */

;(function ( $, window, undefined ) {

    var pluginName = 'JquerySlugme',
        document = window.document,
        defaults = {
            invalid: "",
            whiteSpace: "",
            dashes: "",
            prefixOut: "",
            keyboardHandler: "focusout" // http://api.jquery.com/category/events/keyboard-events/
        };

    function Plugin( element, toElement, options, callback ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options,{ toElement: toElement}) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init(callback);
    }

    var _trim = function(value)
    {
        return value.replace(/^\s+|\s+$/g, '');  
    }

    var _toLower = function(value)
    {
        return value.toLowerCase();  
    }

    var _removeAccentsAndCodes = function(value)
    {
        var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
        var to = "aaaaaeeeeeiiiiooooouuuunc------";
        for (var i = 0, l = from.length; i < l; i++) {
            value = value.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        };
        return value;  
    }

    Plugin.prototype.init = function (_callback) {
        var _this = this;
        var $options = _this.options;

        $(_this.element).bind($options.keyboardHandler, function(){

            var $_toElement = $($options.toElement);
            var _this_value = $(_this.element).is("input") ? $(_this.element).val() : $(_this.element).html();

            _this_value = _trim(_this_value);
            _this_value = _toLower(_this_value);
            _this_value = _removeAccentsAndCodes(_this_value);
            _this_value = _this_value
                .replace(/[^a-z0-9 -]/g, $options.invalid) //invalid charsTo
                .replace(/-+/g, $options.dashes)//dashes
                .replace(/\s+/g, $options.whiteSpace) //whitespaces
                ;

            $_toElement.is("input") 
                ? $_toElement.val(_this_value) 
                : $_toElement.html(_this_value);

            if (_callback && typeof(_callback) === "function") {  
                _callback();  
            } 
        })
    };

    $.fn[pluginName] = function ( toElement, options, callback ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, toElement, options, callback ));
            }
        });
    };

}(jQuery, window));