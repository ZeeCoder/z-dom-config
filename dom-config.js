'use strict';

var merge = require('merge');

module.exports = {
    load: function(DOMElement, dataAttrName, defaultConfig) {
        if (typeof jQuery !== 'undefined' || typeof $ !== 'undefined') {
            // There's a global jQuery object, so there's a chance, that the
            // DOMElement variable is a jQuery Object.
            if (DOMElement instanceof jQuery || DOMElement instanceof $) {
                DOMElement = DOMElement[0];
            }
        }

        var attrData = DOMElement.getAttribute('data-' + dataAttrName);

        try {
            if (attrData === null) {
                throw '';
            }

            var config = JSON.parse(attrData);
        } catch (e) {
            console.error('It seems that the fetched data-* attribute is not a valid JSON string. Got the following:', attrData);
        }

        if (typeof config === 'undefined') {
            config = {};
        } else if (typeof config !== 'object') {
            config = {};
        }

        if (typeof defaultConfig === 'object') {
            return merge.recursive(true, defaultConfig, config);
        }

        return config;
    }
};
