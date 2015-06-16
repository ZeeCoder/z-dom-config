var clone      = require('clone');
var jsdom      = require('jsdom');
var fs         = require('fs');
var expect     = require('chai').expect;
var dom_config = require('../dom-config');
require('mocha-sinon');

describe('dom-config.js', function () {
    var window, document, body, $;

    beforeEach(function() {
        this.sinon.stub(console, 'error');
        this.dom_config = clone(dom_config);

        jsdom.env(
            fs.readFileSync(__dirname + '/fixtures/index.html', 'utf-8'),
            function (err, windowObj) {
                window = windowObj;
                document = windowObj.document;
                $ = require('jquery')(window);
            }
        );
    });

    describe('#load', function () {
        it('should load the data-attributes in json properly', function() {
            expect(this.dom_config.load($('#module1'), 'module')).to.deep.equal({
                key: 'value'
            });
        });

        it('should load an empty object if the given json attribute is not a valid json', function() {
            expect(this.dom_config.load($('#module2'), 'module')).to.deep.equal({});
        });

        it('should log a console error if the data- attribute is not a valid json', function() {
            this.dom_config.load($('#module2'), 'module');
            expect(console.error.calledOnce).to.be.true;
            expect(console.error.calledWith('It seems that the fetched data-* attribute is not a valid JSON string. Got the following:')).to.be.true;
        });

        it('should load an empty object where the data- attribute does not exists', function() {
            expect(this.dom_config.load($('#module3'), 'module')).to.deep.equal({});
        });

        it('should load the default values, and overwrite them with the given configuration', function() {
            expect(this.dom_config.load($('#module1'), 'module', {
                key: 'default-value',
                a_default_key: 'value'
            })).to.deep.equal({
                key: 'value',
                a_default_key: 'value'
            });
        });

        it('should deep-merge the default- and data-configurations', function() {
            expect(this.dom_config.load($('#module4'), 'module', {
                deep: {
                    deep: {
                        deepest: 'overwritten value'
                    }
                }
            })).to.deep.equal({
                deep: {
                    deep: {
                        deepest: 'of all'
                    }
                },
                not_so_deep: true
            });
        });
    });
});
