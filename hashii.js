var Hashii = (function() {  
    /**
     * Hashii module scope accessor.
     */
    var $scope;

    /**
     * Hashii constructor.
     *
     * @param  {Object} options :: Override Hashii defaults.
     */
    function Hashii(options) {
        $scope = this;
        $scope.options = _override(_defaults(), options);

        _validateArgsThenBoot(arguments[0], _boot);
    }

    /*
    |--------------------------------------------------------------------------
    | Hashii initialization :: ~ Private ~
    |--------------------------------------------------------------------------
    */
   
   /**
    * Boot internal library methods
    */
    function _boot(element) {
        /*
                 @TODO
        =========================
        - Collection input/inputs
        - Parse hashtags
        - Format and return collection based on options
        - Add hashtag highlighting when typing?
         */
        
        _collectFieldsFrom(element);
    }

    /**
     * Hashii instance defaults.
     * 
     * @return {Object} :: Return defaults for overriding.
     */
    function _defaults() {
        return {
            alias: '',
            wrapWithTag: false,
            supportMarkdown: false
        };
    }

    /**
     * Validate constructor arguments and boot.
     * 
     * @param  {Object} options :: Throw error if argument is incorrect otherwise boot.
     */
    function _validateArgsThenBoot(options, callback) {
        if (options && typeof options !== 'object') {
            throw new Error('Options argument must be of type object');
        }

        if (typeof callback === 'function') {
            callback(_elementByHook());
        }
    }

    /**
     * Override Hashii default options.
     * 
     * @param  {Object} source :: Default options object.
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
     * @return {Element} :: Validate and return element with Hashii hook.
     */
    function _elementByHook() {
        var element = document.querySelector('[hashii\\:' + $scope.options.alias.toLowerCase() + ']');

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
     * Collection of input fields.
     * 
     * @param  {Element} element :: Hashii DOM element.
     * @return {Array}           :: Filtered fields collection
     */
    function _collectFieldsFrom(element) {
        var collection = _buildFieldCollectionFrom(element);

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
    function _buildFieldCollectionFrom(element) {
        var collection;

        if (element.tagName === 'FORM' && element.childElementCount) {
            collection = [].slice.call(element.children);
        } else {
            collection = [element];
        }

        return collection;
    }

    /**
     * Parse hashtags from element field(s).
     * 
     * @param  {String} field
     * @return {Array}
     */
    function _parseHashtags(field) {
        return field.match(/(?:^|)(?:#)([a-zA-Z\d]+)/g);
    }

    /*
    |--------------------------------------------------------------------------
    | Hashii API methods :: ~ Public ~
    |--------------------------------------------------------------------------
    */

    /**
     * Hashii defaults.
     * 
     * @return {Object} :: Return Hashii defaults for user reference.
     */
    Hashii.prototype.$defaults = function() {
        return _defaults();
    };

    /**
     * Hashii options.
     * 
     * @return {Object} :: Return Hashii instance options.
     */
    Hashii.prototype.$options = function() {
        return $scope.options;
    };

    /**
     * Hashii alias key.
     * 
     * @return {String} :: Return the unique Hashii key used in DOM.
     */
    Hashii.prototype.$element = function() {
        return document.querySelector('[hashii\\:' + $scope.options.alias.toLowerCase() + ']');
    };

    /**
     * Hashtags from Data.
     * 
     * @return {Array} :: Returns array of hashtags to send with XHR.
     */
    Hashii.prototype.$data = function() {
        return ['placeholder', 'test'];
    };

    /**
     * Return the Hashii object.
     */
    return Hashii;
})();