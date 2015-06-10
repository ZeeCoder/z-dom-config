var config = require('../dom-config');
var assert = require('assert');
var clone = require('clone');
var mocha_jsdom = require('mocha-jsdom');
var $ = require('jquery');

describe('dom-config.js', function () {
    mocha_jsdom('<div id="asd" data-asd=\'{"asd": "asd"}\'></div>');

    console.log(window);

    beforeEach(function() {
        this.config = clone(config);
    });

    describe('#load', function () {
        it('should return empty object for invalid JSON attribute', function() {
            assert.deepEqual({asd: 'asd'}, config.load($('#asd'), 'asd'));
        });
    });
});
