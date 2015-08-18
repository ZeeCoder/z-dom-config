# z-dom-config
[![Build Status](https://travis-ci.org/ZeeCoder/z-dom-config.svg?branch=master)](https://travis-ci.org/ZeeCoder/z-dom-config)
[![npm version](https://badge.fury.io/js/z-dom-config.svg)](http://badge.fury.io/js/z-dom-config)

This module helps loading JSON configuration from `data-*` attributes.

Since it's a CommonJS module, it must be used alongside with [Browserify](http://browserify.org/), or
something similar, like [WebPacker](http://webpack.github.io/).

## Example, explanation

```html
<!-- The DOM element we want to extract the configuration from -->
<div
    id="target-element"
    data-configuration='{
        "bool_value": false
    }'
></div>
```

```js
var dom_config = require('z-dom-config');

// Loads and parses the "data-configuration" attribute, then deep-merges the
// results with the object given as the default configuration if given.
// Note: If the string is not a valid JSON string, then a console error is shown
// and an empty object will be used instead of the attribute's contents.
dom_config.load(
    // jQuery is optional, it works with `document.getElementById('target-element')` too
    $('#target-element'),
    'configuration',
    {
        bool_value: true,
        something_else: 42
    }
);
// -> {bool_value: false, something_else: 42}
```

## License
[MIT](LICENSE)
