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
    | Hashii setup :: ~ Private ~
    |--------------------------------------------------------------------------
    */
   
   /**
    * Boots important library methods.
    */
    function _boot(element) {
        console.log(element);
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
     * Validate constructor arguments.
     * 
     * @param  {Object} options :: Throw error if argument is incorrect.
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
            if (source.hasOwnProperty(prop) && typeof options[prop] === 'string') {
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
     * @return {Element} :: Return elements used with Hashii alias.
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
     * @return {Boolean}         :: Element has passed conditions
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
     * Validate fields.
     * 
     * @param  {Array} fields :: Check if fields are textarea or input.
     * @return {Array}
     */
    function _collectInputs(fields) {
        // var fields = [].slice.call(fields, 0);

        // var validFields = fields.filter(function(el) {
        //     return el.tagName === 'TEXTAREA' || el.tagName === 'INPUT';
        // });

        // return validFields;
    }

    // function _parseForm(fields) {
    //     var hashArray = [];
    //     var inputs = _collectInputs(fields);

    //     inputs.forEach(function(field) {
    //         hashArray.push(_parseHashtags(field.value)[0]);
    //     });

    //     console.log(hashArray);
    // }

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

    Hashii.prototype.$data = function() {
        return ['placeholder', 'test'];
    };

    /**
     * Return the Hashii object.
     */
    return Hashii;
})();






        // if (tag === 'FORM') {
        //     _parseForm(element);
        // } else if (tag === 'INPUT' || tag === 'TEXTAREA') {
        //     _parseField(element);
        // } else {
        //     throw new Error('Hashii selector must be of element type form, input or textarea.');
        // }