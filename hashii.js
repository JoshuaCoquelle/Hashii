(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Hashii = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*

  _    _           _____ _    _ _____ _____ 
 | |  | |   /\    / ____| |  | |_   _|_   _|
 | |__| |  /  \  | (___ | |__| | | |   | |  
 |  __  | / /\ \  \___ \|  __  | | |   | |  
 | |  | |/ ____ \ ____) | |  | |_| |_ _| |_ 
 |_|  |_/_/    \_\_____/|_|  |_|_____|_____|

 */

var Hashii = (function() {
    /**
     * Hashii module scope accessor.
     */
    var $scope;

    /**
     * Hashii constructor.
     *
     * @param  {Object} options
     */
    function Hashii(options) {
        $scope = this;
        $scope.options = _override(_defaults(), options);

        /* Console accessors */
        $scope.$element = _returnHashiiDomElement();
        $scope.$defaults = _defaults();
        $scope.$settings = $scope.options;

        _validateArguments(arguments[0]);
    }

    /*
    |--------------------------------------------------------------------------
    | Hashii initialization :: ~ Private ~
    |--------------------------------------------------------------------------
    */

    /**
     * Hashii instance defaults.
     * 
     * @return {Object} :: Return defaults for overriding.
     */
    function _defaults() {
        return {
            ref: '',
            format: '[]',
            includeHash: false,
        };
    }

    /**
     * Validate constructor arguments and boot.
     * 
     * @param  {Object} options :: Throw error if argument is incorrect otherwise boot.
     */
    function _validateArguments(options) {
        if (options && typeof options !== 'object') {
            throw new Error('Options argument must be of type object');
        }
    }

    /**
     * Override Hashii default options.
     * 
     * @param  {Object} source  :: Default options object.
     * @param  {Object} options :: User passed options argument.
     * @return {Object}
     */
    function _override(source, options) {
        for (var prop in options) {
            if (source.hasOwnProperty(prop)) {
                source[prop] = options[prop];
            }
        }

        return source;
    }

    /*
    |--------------------------------------------------------------------------
    | Hashii internal methods :: ~ Private ~
    |--------------------------------------------------------------------------
    */

    /**
     * Hashii DOM element.
     * 
     * @return {Element} :: Validate and return element with Hashii reference hook.
     */
    function _returnHashiiDomElement() {
        var element = document.querySelector('[hashii\\:' + $scope.options.ref.toLowerCase() + ']');

        if (_elementMeetsConditions(element)) {
            return element;
        }
    }

    /**
     * Check element validity.
     * 
     * @param  {Element} element :: DOM element utilized by Hashii
     * @return {Boolean}         :: Element has met conditions
     */
    function _elementMeetsConditions(element) {
        if (element === null) {
            throw new Error('Hashii key is incorrect or does not exist.');
        }

        if (element.tagName !== 'FORM' &&
            element.tagName !== 'INPUT' &&
            element.tagName !== 'TEXTAREA')
        {
            throw new Error('Hashii selector must be of element type form, input or textarea.');
        }

        return true;
    }

    /**
     * Collection of valid parsable Hashii field elements.
     * 
     * @param  {Element} element :: Hashii DOM element.
     * @return {Array}           :: Filtered fields collection
     */
    function _validFieldsArray(element) {
        var collection = _buildFieldsArrayFrom(element);

        var filteredCollection = collection.filter(function(field) {
            return field.tagName === 'TEXTAREA' || field.tagName === 'INPUT';
        });

        return filteredCollection;
    }

    /**
     * Builds collection of fields from element.
     * 
     * @param  {Element} element :: Hashii DOM element.
     * @return {Array}           :: Return newly built collection.
     */
    function _buildFieldsArrayFrom(element) {
        var collection;

        if (element.tagName === 'FORM' && element.childElementCount > 0) {
            collection = [].slice.call(element.children);
        } else {
            collection = [element];
        }

        return collection;
    }

    /**
     * Parse hashtags that match hash regex.
     * 
     * @param  {String} field :: String value to compare regex with.
     * @return {Array}        :: Return array containing hashtag matches.
     */
    function _parseTagsFrom(field) {
        if (!$scope.options.includeHash) {
            var strippedHashes = field.match(/(?:^|)(?:#)([a-zA-Z\d]+)/g).map(function (tag) {
                return tag.replace('#','');
            });

            return strippedHashes;
        }

        return field.match(/(?:^|)(?:#)([a-zA-Z\d]+)/g);
    }

    /**
     * Create hashtags array from element field(s).
     * 
     * @param  {Array} collection :: Array of DOM inputs within Hashii scope.
     * @return {Array}            :: Return formatted array of hashtags.
     */
    function _createTagsArrayFrom(collection) {
        var hashtags = [];

        collection.filter(function(field) {
            return field.value != '';
        }).forEach(function(field) {
            hashtags = hashtags.concat(_parseTagsFrom(field.value));
        });

        return hashtags;
    }

    /**
     * Convert hashtags array into JSON string.
     * 
     * @return {Object} :: JSON hashtags using index as keys.
     */
    function _convertTagsToJSON() {
        var hashtagArray = _createTagsArrayFrom(_validFieldsArray($scope.$element));

        var tags = hashtagArray.reduce(function(obj, value, index) {
            obj[index] = value;
            return obj;
        }, {});

        return JSON.stringify(tags);
    }

    /**
     * Return formatted hashtags to caller.
     * 
     * @return {Function} :: Converts tags into object or array.
     */
    function _returnTags() {
        var format = $scope.options.format;
        
        if (format.indexOf('[') >= 0) {
            return _createTagsArrayFrom(
                _validFieldsArray($scope.$element)
            );
        }

        if (format.indexOf('{') >= 0) {
            return _convertTagsToJSON();
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Hashii API methods :: ~ Public ~
    |--------------------------------------------------------------------------
    */
   
    /**
     * Return hashtags to caller.
     * 
     * @type {Array | Object} :: Based on instance 'format' options.
     */
    Hashii.prototype.$tags = _returnTags;

    /**
     * Expose Hashii constructor
     */
    return Hashii;
})();

module.exports = Hashii;
},{}]},{},[1])(1)
});