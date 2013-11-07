;(function (root, factory) {

    // Require.js가 있을 경우
    if (typeof define === 'function' && define.amd)
        define([ "jquery", "underscore", "backbone", "bootstrap", "widget-touch" ], factory);
    else
        root.Carousel = factory(root.$, root._, root.Backbone);

}(window, function ($, _, Backbone) {
    /*
     Carousel 스와이프 기능 추가
     스와이프 기능을 사용할 Carousel 영역에 data-slide="swipe" 를 선언하므로 작동
     */
    var HAS_TOUCH = ('ontouchstart' in window);

    var Carousel = $.fn.carousel.Constructor;

    Carousel.prototype.activeSwipe = function () {
        var self;
        self = this;
        this.$element.swipe();
        $(document).on("swipeLeft", this.$element,function () {
            if (!self.isActive) {
                self.pause();
                self.slide("next");
                self.isActive = true;
            }
        }).on("swipeRight", this.$element,function () {
            if (!self.isActive) {
                self.pause();
                self.slide("prev");
                self.isActive = true;
            }
        }).on("slide", this.$element,function () {
            return self.isActive = true;
        }).on("slid", this.$element, function () {
            self.isActive = false;
        });
    };

    Carousel.prototype.pause = function (e) {
        e || (this.paused = true);

        if (this.$element.find('.next, .prev').length && $.support.transition.end) {
            this.$element.trigger($.support.transition.end);
            this.cycle(true);
        }

        this.interval = clearInterval(this.interval);
        this.$element.trigger($.Event('pause.cs.carousel'));
        return this;
    };

    Carousel.prototype.cycle = function (e) {
        e || (this.paused = false);

        this.interval && clearInterval(this.interval);

        this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval)) && this.$element.trigger($.Event('play.cs.carousel'));

        return this
    };

    $.fn.carousel.Constructor = Carousel;

    $.fn.carousel = function (option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('bs.carousel');
            var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option);
            var action = typeof option == 'string' ? option : options.slide;

            if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)));
            if (typeof option == 'number') data.to(option);
            else if (action) data[action]();
            else if (options.interval) data.pause().cycle();
        })
    };

    /**
     * 터치기반인 경우 Swipe 활성화
     */
    HAS_TOUCH && $(function () {
        $('[data-slide="swipe"]').carousel("activeSwipe");
    });

    return Backbone ? Backbone.View.extend({
        render: function(methodName) {
            if(typeof methodName === "string") {
                this.$el.carousel(methodName);
            } else {
                this.$el.carousel(this.options);
            }
            return this;
        }
    }) : Carousel;
}));
