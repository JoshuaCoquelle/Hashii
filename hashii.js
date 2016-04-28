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
        $scope.$element = _elementByHook();
        $scope.$defaults = _defaults();
        $scope.$settings = $scope.options;
        $scope.$tags = function() {
            return _returnHashtagsFrom(_scopedFields($scope.$element));
        }

        _validateArgsThenBoot(arguments[0]);
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
            key: '',
            includeHash: false,
            wrapWithTag: false
        };
    }

    /**
     * Validate constructor arguments and boot.
     * 
     * @param  {Object} options :: Throw error if argument is incorrect otherwise boot.
     */
    function _validateArgsThenBoot(options) {
        if (options && typeof options !== 'object') {
            throw new Error('Options argument must be of type object');
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
        var element = document.querySelector('[hashii\\:' + $scope.options.key.toLowerCase() + ']');

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
    function _scopedFields(element) {
        var collection = _buildFieldsCollectionFrom(element);

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
    function _buildFieldsCollectionFrom(element) {
        var collection;

        if (element.tagName === 'FORM' && element.childElementCount > 0) {
            collection = [].slice.call(element.children);
        } else {
            collection = [element];
        }

        return collection;
    }

    /**
     * Parse hashtags from element field(s).
     * 
     * @param  {Array} collection :: Array of DOM inputs within Hashii scope.
     * @return {Array}            :: Return formatted array of hashtags.
     */
    function _returnHashtagsFrom(collection) {
        var hashtags = [];

        [].map.call(collection, function(field) {
            hashtags = hashtags.concat(_getHashtagsFrom(field.value));
        });

        return hashtags;
    }

    /**
     * Return hashtags that match hash regex.
     * 
     * @param  {String} field :: String value to compare regex with.
     * @return {Array}        :: Return array containing hashtag matches.
     */
    function _getHashtagsFrom(field) {
        if (!$scope.options.includeHash) {
            var hashArray = field.match(/(?:^|)(?:#)([a-zA-Z\d]+)/g);
            var strippedHash = hashArray.map(function (tag) { return tag.replace('#',''); });

            return strippedHash;
        }

        return field.match(/(?:^|)(?:#)([a-zA-Z\d]+)/g);
    }

    /*
    |--------------------------------------------------------------------------
    | Hashii API methods :: ~ Public ~
    |--------------------------------------------------------------------------
    */

    /**
     * Return the Hashii object.
     */
    return Hashii;
})();