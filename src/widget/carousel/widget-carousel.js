;
( function ( root, doc, factory ) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD
        define( [ 'jquery' ], function ( $ ) {
            factory( $, root, doc );

        } );
    } else {
        // None AMD
        factory( root.jQuery, root, doc );
    }
} ( window, document, function ( $, window, document ) {
    /*
     Carousel 스와이프 기능 추가
     스와이프 기능을 사용할 Carousel 영역에 data-slide="swipe" 를 선언하므로 작동
     */
    var HAS_TOUCH = ('ontouchstart' in window);

    this.Carousel = (function () {
        var Carousel;

        function Carousel() {
        }

        Carousel = $.fn.carousel.Constructor;

        Carousel.prototype.activeSwipe = function () {
            var self;
            self = this;
            this.$element.swipe().live("swipeLeft",function (e, swipeEventObj) {
                if (!self.isActive) {
                    self.pause();
                    self.slide("next");
                    self.isActive = true;
                }
            }).live("swipeRight", function (e, swipeEventObj) {
                    if (!self.isActive) {
                        self.pause();
                        self.slide("prev");
                        self.isActive = true;
                    }
                });
            this.$element.live("slide",function (e) {
                return self.isActive = true;
            }).live("slid", function (e) {
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
            this.$element.trigger( e = $.Event('pause.cs.carousel') );
            return this;
        }

        Carousel.prototype.cycle =  function (e) {
            e || (this.paused = false)

            this.interval && clearInterval(this.interval)

            this.options.interval
            && !this.paused
            && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
            && this.$element.trigger( e = $.Event('play.cs.carousel') );

            return this
        }

        $.fn.carousel.Constructor = Carousel;

        /**
         * 터치기반인 경우 Swipe 활성화
         */
        HAS_TOUCH 
        && $(function () {
            $('[data-slide="swipe"]').carousel("activeSwipe");
        });

        return Carousel;

    })();
} ) );

// (function () {

// 	/*
//      Carousel 스와이프 기능 추가
//      스와이프 기능을 사용할 Carousel 영역에 data-slide="swipe" 를 선언하므로 작동
//      */
//     this.Carousel = (function () {
//         var Carousel;

//         function Carousel() {
//         }

//         Carousel = $.fn.carousel.Constructor;

//         Carousel.prototype.activeSwipe = function () {
//             var self;
//             self = this;
//             this.$element.swipe().live("swipeLeft",function (e, swipeEventObj) {
//                 if (!self.isActive) {
//                     self.pause();
//                     self.slide("next");
//                     self.isActive = true;
//                 }
//             }).live("swipeRight", function (e, swipeEventObj) {
//                     if (!self.isActive) {
//                         self.pause();
//                         self.slide("prev");
//                         self.isActive = true;
//                     }
//                 });
//             this.$element.live("slide",function (e) {
//                 return self.isActive = true;
//             }).live("slid", function (e) {
//                     self.isActive = false;
//                 });
//         };

//         $.fn.carousel.Constructor = Carousel;

//         /**
//          * 터치기반인 경우 Swipe 활성화
//          */
//         $(function () {
//             $('[data-slide="swipe"]').carousel("activeSwipe");
//         });

//         return Carousel;

//     })();
// }).call(this);