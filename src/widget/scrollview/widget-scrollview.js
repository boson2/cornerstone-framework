/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : featured-scrollview.js
 *  Description: 스크롤뷰는 코너스톤 UI에 맞게 기본적으로 설정하며, DATA-API를 사용해서 스크립트 사용없이 마크업
 *  속성만으로 작동되도록 구현함.
 *  Author: 김우섭
 *  License :
 */

;(function (root, factory) {

    // Require.js가 있을 경우
    if (typeof define === "function" && define.amd)
        define([ "jquery", "underscore", "backbone", "iscroll" ], factory);
    else
        root.ScrollView = factory(root.$, root._, root.Backbone);

}(window, function ($, _, Backbone) {
    var pluginName = "featuredScrollView",
    eventNamespace = ".cs.scrollView",
    events = [
        {"eventName": "pullDown", "callbackName": "pullDownAction"},
        {"eventName": "pullUp", "callbackName": "pullUpAction"},
        {"eventName": "refresh", "callbackName": "onRefresh"},
        {"eventName": "beforeScrollStart", "callbackName": "onBeforeScrollStart"},
        {"eventName": "start", "callbackName": "onScrollStart"},
        {"eventName": "beforeScrollMove", "callbackName": "onBeforeScrollMove"},
        {"eventName": "move", "callbackName": "onScrollMove"},
        {"eventName": "beforeScrollEnd", "callbackName": "onBeforeScrollEnd"},
        {"eventName": "scrollEnd", "callbackName": "onScrollEnd"},
        {"eventName": "touchEnd", "callbackName": "onTouchEnd"},
        {"eventName": "destroy", "callbackName": "onDestroy"}
    ],
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset;


    var Plugin = function (element, options) {
        var defaultOptions = {
            scrollbars: true,
            mouseWheel: true,
            scrollbarClass: "scrollViewBar",
            interactiveScrollbars: true,
            formFields: undefined,
            pullDownAction: undefined,
            pullUpAction: undefined,
            onRefresh: undefined,
            onBeforeScrollStart: undefined,
            onScrollStart: undefined,
            onBeforeScrollMove: undefined,
            onScrollMove: undefined,
            onBeforeScrollEnd: undefined,
            onScrollEnd: undefined,
            onTouchEnd: undefined,
            onDestroy: undefined
        };

        this.$el = $(element);
        this.options = $.extend(true, defaultOptions, options);

        this.formCheck();
        this.pullToRefresh();

        // 기본 스크롤이 있는 페이지에 Nested하게 ScrollView를 사용하는 경우 스크롤뷰에서 move할 때 기본 스크롤이 움직이지 않도록 함.
        this.$el.off("touchmove" + eventNamespace).on("touchmove" + eventNamespace, function (e) {
            if (e.target.type === "range") {
                return;
            }
            e.preventDefault();
        });

        // ScrollView 영역에서 마우스 휠이벤트가 발생할때 기본 스크롤이 같이 움직이지 않도록 함
        this.$el.off("mouseover" + eventNamespace).on("mouseover" + eventNamespace,function () {
            $(window).on("mousewheel" + eventNamespace + " DOMMouseScroll" + eventNamespace, function (e) {
                var delta = e.wheelDelta || -e.detail;
                this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
                e.preventDefault();
            });
        }).off("mouseout" + eventNamespace).on("mouseout" + eventNamespace, function () {
            $(window).off("mousewheel" + eventNamespace + " DOMMouseScroll" + eventNamespace);
        });

        this.options = this.addEventListener(this.options);

        this.iscroll = new iScroll(this.$el[0], this.options);
        return this;
    };

    Plugin.prototype.addEventListener = function (options) {
        var self = this;
        $(events).each(function () {
            var event = this;
            var _callback = options[event.callbackName];
            options[event.callbackName] = function () {
                if (typeof _callback === "function") {
                    _callback.call(this, arguments);
                } else {
                    _callback = function () {
                    };
                }
                self.$el.trigger(event.eventName + eventNamespace);
            };
        });
        return options
    };

    Plugin.prototype.destroy = function () {
        this.iscroll.destroy();
        this.$el.off("touchmove" + eventNamespace);
        this.$el.off("mouseover" + eventNamespace);
        this.$el.off("mouseout" + eventNamespace);
        $(window).off("mousewheel" + eventNamespace + " DOMMouseScroll" + eventNamespace);
        this.$el.data(pluginName, null);
    };

    Plugin.prototype.refresh = function () {
        this.iscroll.refresh();
    };

    // TODO onDestroy 필요

    // 폼 엘리먼트인 경우 드래그로 입력박스 터치불가한 문제를 해결
    Plugin.prototype.formCheck = function () {
        if (!(!$.isEmptyObject(this.options) && $.isArray(this.options.formFields) && this.options.formFields.length > 0)) {
            return false;
        }
        var self = this;
        // 폼 엘리먼트인 경우 드래그 이벤트를 무시하도록 하기 위한 예외처리
        var onBeforeScrollStart = function (e) {
            var target = e.target;
            var isNotField = true;
            while (target.nodeType != 1) target = target.parentNode;

            // 배열로 예외처리할 폼 엘리먼트를 tagName과 비교한다.
            $.grep(self.options.formFields, function (n, i) {
                isNotField = isNotField && target.tagName != n;
            });

            if (isNotField)
                e.preventDefault();
        };
        this.defaultOptions.onBeforeScrollStart = onBeforeScrollStart;
    };

    // Pull to refresh
    Plugin.prototype.pullToRefresh = function () {
        var self = this;
        pullDownEl = self.$el.find('[data-featured-scrollview="pullDown"]');
        pullUpEl = self.$el.find('[data-featured-scrollview="pullUp"]');

        if (!(this.options && pullDownEl.length && pullUpEl.length)) {
            return false;
        }

        pullDownOffset = pullDownEl && pullDownEl[0].offsetHeight;
        pullUpOffset = pullUpEl && pullUpEl[0].offsetHeight;

        var topOffset = pullDownOffset;
        var onRefresh = function () {
            pullDownEl = self.$el.find('[data-featured-scrollview="pullDown"]');
            pullDownOffset = pullDownEl && pullDownEl[0].offsetHeight;
            pullUpEl = self.$el.find('[data-featured-scrollview="pullUp"]');
            pullUpOffset = pullUpEl && pullUpEl[0].offsetHeight;
            if (pullDownEl && pullDownEl.attr("class").match('loading')) {
                pullDownEl.removeClass("flip loading");
            } else if (pullUpEl && pullUpEl.attr("class").match('loading')) {
                pullUpEl.removeClass("flip loading");
            }
        };

        var onScrollMove = function () {
            pullDownEl = self.$el.find('[data-featured-scrollview="pullDown"]');
            pullDownOffset = pullDownEl && pullDownEl[0].offsetHeight;
            pullUpEl = self.$el.find('[data-featured-scrollview="pullUp"]');
            pullUpOffset = pullUpEl && pullUpEl[0].offsetHeight;
            if (this.y > 5 && pullDownEl && !pullDownEl.attr("class").match('flip')) {
                pullDownEl.addClass("flip");
                this.minScrollY = 0;
            } else if (this.y < 5 && pullDownEl && pullDownEl.attr("class").match('flip')) {
                pullDownEl.removeClass("flip loading");
                this.minScrollY = -pullDownOffset;
            } else if (this.y < (this.maxScrollY - 5) && pullUpEl && !pullUpEl.attr("class").match('flip')) {
                pullUpEl.addClass("flip");
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl && pullUpEl.attr("class").match('flip')) {
                pullUpEl.removeClass("flip loading");
                this.maxScrollY = pullUpOffset;
            }
        };
        var onScrollEnd = function () {
            pullDownEl = self.$el.find('[data-featured-scrollview="pullDown"]');
            pullDownOffset = pullDownEl && pullDownEl[0].offsetHeight;
            pullUpEl = self.$el.find('[data-featured-scrollview="pullUp"]');
            pullUpOffset = pullUpEl && pullUpEl[0].offsetHeight;
            if (pullDownEl && pullDownEl.attr("class").match('flip')) {
                pullDownEl.addClass("loading");
                self.options.pullDownAction && self.options.pullDownAction();
            } else if (pullDownEl && pullUpEl.attr("class").match('flip')) {
                pullUpEl.addClass("loading");
                self.options.pullUpAction && self.options.pullUpAction();
            }
        };

        this.options.topOffset = topOffset;
        this.options.onRefresh = onRefresh;
        this.options.onScrollMove = onScrollMove;
        this.options.onScrollEnd = onScrollEnd;
    };

    // 스크롤뷰 플러그인 랩핑 및 기본값 설정
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data(pluginName);

            // 초기 실행된 경우 플러그인을 해당 엘리먼트에 data 등록
            if (!data) {
                $this.data(pluginName, (data = new Plugin(this, options)))
            }

            // 옵션이 문자로 넘어온 경우 함수를 실행시키도록 한다.
            if (typeof options == 'string') {
                data[options](data.options);
            }
        });
    };

    $(function () {
        /**
         * DATA API (HTML5 Data Attribute)
         */
        $("[data-featured=scrollView]").each(function (i) {
            $(this)[pluginName]();
        });
    });

    return Backbone ? Backbone.View.extend({
        render: function () {
            _.extend(this, this.$el.featuredScrollView(this.options).data("featuredScrollView"));
            return this;
        }
    }) : Plugin;
}));