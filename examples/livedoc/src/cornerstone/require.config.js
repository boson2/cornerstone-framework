var jam = {
    "packages": [
        {
            "name": "backbone",
            "location": "../cornerstone/backbone",
            "main": "backbone-min.js"
        },
        {
            "name": "bootstrap",
            "location": "../cornerstone/bootstrap",
            "main": "js/bootstrap.min.js"
        },
        {
            "name": "form-view",
            "location": "../cornerstone/form-view",
            "main": "form.js"
        },
        {
            "name": "handlebars",
            "location": "../cornerstone/handlebars",
            "main": "handlebars.js"
        },
        {
            "name": "iscroll",
            "location": "../cornerstone/iscroll",
            "main": "iscroll.js"
        },
        {
            "name": "jquery",
            "location": "../cornerstone/jquery",
            "main": "jquery-1.10.2.min.js"
        },
        {
            "name": "launcher",
            "location": "../cornerstone/launcher",
            "main": "launcher.js"
        },
        {
            "name": "multipage-router",
            "location": "../cornerstone/multipage-router",
            "main": "multipage.js"
        },
        {
            "name": "style",
            "location": "../cornerstone/style",
            "main": "style.js"
        },
        {
            "name": "template",
            "location": "../cornerstone/template",
            "main": "template.js"
        },
        {
            "name": "theme-white",
            "location": "../cornerstone/theme-white"
        },
        {
            "name": "transition",
            "location": "../cornerstone/transition",
            "main": "transition.js"
        },
        {
            "name": "underscore",
            "location": "../cornerstone/underscore",
            "main": "underscore-min.js"
        },
        {
            "name": "validation-view",
            "location": "../cornerstone/validation-view",
            "main": "validation.js"
        },
        {
            "name": "widget-scrollview",
            "location": "../cornerstone/widget-scrollview",
            "main": "widget-scrollview.js"
        }
    ],
    "version": "0.2.17",
    "shim": {
        "backbone": {
            "deps": [
                "underscore",
                "jquery"
            ],
            "exports": "Backbone"
        },
        "bootstrap": {
            "deps": [
                "jquery"
            ]
        },
        "form-view": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "validation-view",
                "bootstrap"
            ],
            "exports": "form-view"
        },
        "handlebars": {
            "exports": "Handlebars"
        },
        "iscroll": {
            "exports": "iScroll"
        },
        "jquery": {
            "exports": "jQuery"
        },
        "multipage-router": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "transition"
            ],
            "exports": "multipage-router"
        },
        "style": {
            "deps": [
                "jquery"
            ],
            "exports": "style"
        },
        "template": {
            "deps": [
                "jquery",
                "handlebars"
            ],
            "exports": "template"
        },
        "transition": {
            "deps": [
                "jquery"
            ],
            "exports": "Transition"
        },
        "underscore": {
            "exports": "_"
        },
        "validation-view": {
            "deps": [
                "backbone",
                "underscore",
                "jquery"
            ],
            "exports": "validation-view"
        },
        "widget-scrollview": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "iscroll"
            ],
            "exports": "widget-scrollview"
        }
    }
};

if (typeof require !== "undefined" && require.config) {
    require.config({
    "packages": [
        {
            "name": "backbone",
            "location": "../cornerstone/backbone",
            "main": "backbone-min.js"
        },
        {
            "name": "bootstrap",
            "location": "../cornerstone/bootstrap",
            "main": "js/bootstrap.min.js"
        },
        {
            "name": "form-view",
            "location": "../cornerstone/form-view",
            "main": "form.js"
        },
        {
            "name": "handlebars",
            "location": "../cornerstone/handlebars",
            "main": "handlebars.js"
        },
        {
            "name": "iscroll",
            "location": "../cornerstone/iscroll",
            "main": "iscroll.js"
        },
        {
            "name": "jquery",
            "location": "../cornerstone/jquery",
            "main": "jquery-1.10.2.min.js"
        },
        {
            "name": "launcher",
            "location": "../cornerstone/launcher",
            "main": "launcher.js"
        },
        {
            "name": "multipage-router",
            "location": "../cornerstone/multipage-router",
            "main": "multipage.js"
        },
        {
            "name": "style",
            "location": "../cornerstone/style",
            "main": "style.js"
        },
        {
            "name": "template",
            "location": "../cornerstone/template",
            "main": "template.js"
        },
        {
            "name": "theme-white",
            "location": "../cornerstone/theme-white"
        },
        {
            "name": "transition",
            "location": "../cornerstone/transition",
            "main": "transition.js"
        },
        {
            "name": "underscore",
            "location": "../cornerstone/underscore",
            "main": "underscore-min.js"
        },
        {
            "name": "validation-view",
            "location": "../cornerstone/validation-view",
            "main": "validation.js"
        },
        {
            "name": "widget-scrollview",
            "location": "../cornerstone/widget-scrollview",
            "main": "widget-scrollview.js"
        }
    ],
    "shim": {
        "backbone": {
            "deps": [
                "underscore",
                "jquery"
            ],
            "exports": "Backbone"
        },
        "bootstrap": {
            "deps": [
                "jquery"
            ]
        },
        "form-view": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "validation-view",
                "bootstrap"
            ],
            "exports": "form-view"
        },
        "handlebars": {
            "exports": "Handlebars"
        },
        "iscroll": {
            "exports": "iScroll"
        },
        "jquery": {
            "exports": "jQuery"
        },
        "multipage-router": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "transition"
            ],
            "exports": "multipage-router"
        },
        "style": {
            "deps": [
                "jquery"
            ],
            "exports": "style"
        },
        "template": {
            "deps": [
                "jquery",
                "handlebars"
            ],
            "exports": "template"
        },
        "transition": {
            "deps": [
                "jquery"
            ],
            "exports": "Transition"
        },
        "underscore": {
            "exports": "_"
        },
        "validation-view": {
            "deps": [
                "backbone",
                "underscore",
                "jquery"
            ],
            "exports": "validation-view"
        },
        "widget-scrollview": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "iscroll"
            ],
            "exports": "widget-scrollview"
        }
    }
});
}
else {
    var require = {
    "packages": [
        {
            "name": "backbone",
            "location": "../cornerstone/backbone",
            "main": "backbone-min.js"
        },
        {
            "name": "bootstrap",
            "location": "../cornerstone/bootstrap",
            "main": "js/bootstrap.min.js"
        },
        {
            "name": "form-view",
            "location": "../cornerstone/form-view",
            "main": "form.js"
        },
        {
            "name": "handlebars",
            "location": "../cornerstone/handlebars",
            "main": "handlebars.js"
        },
        {
            "name": "iscroll",
            "location": "../cornerstone/iscroll",
            "main": "iscroll.js"
        },
        {
            "name": "jquery",
            "location": "../cornerstone/jquery",
            "main": "jquery-1.10.2.min.js"
        },
        {
            "name": "launcher",
            "location": "../cornerstone/launcher",
            "main": "launcher.js"
        },
        {
            "name": "multipage-router",
            "location": "../cornerstone/multipage-router",
            "main": "multipage.js"
        },
        {
            "name": "style",
            "location": "../cornerstone/style",
            "main": "style.js"
        },
        {
            "name": "template",
            "location": "../cornerstone/template",
            "main": "template.js"
        },
        {
            "name": "theme-white",
            "location": "../cornerstone/theme-white"
        },
        {
            "name": "transition",
            "location": "../cornerstone/transition",
            "main": "transition.js"
        },
        {
            "name": "underscore",
            "location": "../cornerstone/underscore",
            "main": "underscore-min.js"
        },
        {
            "name": "validation-view",
            "location": "../cornerstone/validation-view",
            "main": "validation.js"
        },
        {
            "name": "widget-scrollview",
            "location": "../cornerstone/widget-scrollview",
            "main": "widget-scrollview.js"
        }
    ],
    "shim": {
        "backbone": {
            "deps": [
                "underscore",
                "jquery"
            ],
            "exports": "Backbone"
        },
        "bootstrap": {
            "deps": [
                "jquery"
            ]
        },
        "form-view": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "validation-view",
                "bootstrap"
            ],
            "exports": "form-view"
        },
        "handlebars": {
            "exports": "Handlebars"
        },
        "iscroll": {
            "exports": "iScroll"
        },
        "jquery": {
            "exports": "jQuery"
        },
        "multipage-router": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "transition"
            ],
            "exports": "multipage-router"
        },
        "style": {
            "deps": [
                "jquery"
            ],
            "exports": "style"
        },
        "template": {
            "deps": [
                "jquery",
                "handlebars"
            ],
            "exports": "template"
        },
        "transition": {
            "deps": [
                "jquery"
            ],
            "exports": "Transition"
        },
        "underscore": {
            "exports": "_"
        },
        "validation-view": {
            "deps": [
                "backbone",
                "underscore",
                "jquery"
            ],
            "exports": "validation-view"
        },
        "widget-scrollview": {
            "deps": [
                "backbone",
                "underscore",
                "jquery",
                "iscroll"
            ],
            "exports": "widget-scrollview"
        }
    }
};
}

if (typeof exports !== "undefined" && typeof module !== "undefined") {
    module.exports = jam;
}