'use strict';

var merge = require('merge');

module.exports = {
    load: function($object, dataAttr, defaultConfig) {
        var config = $object.data(dataAttr);

        if (typeof config === 'undefined') {
            config = {};
        } else if (typeof config !== 'object') {
            console.error('It seems that the fetched data-* attribute is not a valid JSON string. Got the following:', config);
            config = {};
        }

        if (typeof defaultConfig === 'object') {
            return merge.recursive(true, config, defaultConfig);
        }

        return config;
    }
};
