require.config({
    paths: {
        'jquery': 'libs/jquery/dist/jquery',
        'underscore': 'libs/lodash/dist/lodash',
        'backbone': 'libs/backbone/backbone',
        'async': 'libs/async/lib/async'
    },
    shim: {
        'jquery': {
            'exports': '$'
        },
        'underscore': {
            'exports': '_'
        },
        'backbone': {
            'deps': ['jquery', 'underscore'],
            'exports': 'Backbone'
        }
    }
});

require(['jquery', 'underscore', 'examples'], function($, _, examples) {
    window.$ = $;
    window._ = _;

    examples.init();
});
