var Hashii = (function() {
    /*
    |--------------------------------------------------------------------------
    | Hashii setup and error methods :: ~ Private ~
    |--------------------------------------------------------------------------
    */
   
    /**
     * Hashii module scope accessor
     */
    var $scope;

    /**
     * Hashii instance defaults.
     * 
     * @return {Object} :: Return defaults for overriding
     */
    function _defaults() {
        return {
            alias: '',
            wrapWithTag: false,
            supportMarkdown: false
        };
    }

        /**
    * Hashii Constructor.
    *
    * @param  {Object} options :: Override Hashii defaults.
    */
    function Hashii(options) {
        _validateArguments(arguments[0]);

        $scope = this;
        $scope.options = _override(_defaults(), options);
    }

    /**
    * Validate constructor arguments.
    *
    * @param  {Object} options :: Throw error if argument is incorrect.
    */
    function _validateArguments(options) {
        if (options && typeof options !== 'object') {
            throw new Error('Options argument must be of type object');
        }
    }

    /**
    * Override Hashii default options.
    * 
    * @param  {Object} source :: Default options object.
    * @param  {Object} options :: User passed options argument.
    * @return {Object} :: Merged options object.
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
    | Hashii core methods :: ~ Private ~
    |--------------------------------------------------------------------------
    */

    /**
    * Hashii DOM element
    * 
    * @return {Element} :: Return element used with Hashii alias.
    */
    function _elementFromAlias() {
        var element = document.querySelector('[hashii\\:' + $scope.options.alias.toLowerCase() + ']');

        if (element === null) throw new Error('Hashii key is incorrect or does not exist.');

        return element;
    }

    /**
     * Determine Hashii element type.
     * 
     * @return {Function} :: Call method dynamically based on element.
     */
    function _fieldsController() {
        var element = _elementFromAlias();
        var tag = element.tagName;

        if (tag === 'FORM') {
            _parseForm(element);
        } else if (tag === 'INPUT' || tag === 'TEXTAREA') {
            _parseInput(element);
        } else {
            throw new Error('Hashii selector must be of element type form, input or textarea.');
        }
    }

    function _parseForm(fields) {
        [].forEach.call(fields, function(field, index) {
            console.log(field.value);
        });
    }

    function _parseInput(field) {
        // @TODO
    }

    function _parseHashtags() {
        // @TODO
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
    * Return the Hashii object.
    */
    return Hashii;
})();