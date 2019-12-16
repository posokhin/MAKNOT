$(document).ready(function () {

    $('.js-open-lang').on('click', function () {
        $(this).toggleClass('active')
    });
    $('.js-open-search').on('click', function () {
        $('.search').addClass('active');
        $('.search').find('input').focus();
    });
    $('.search__close').on('click', function () {
        $('.search').removeClass('active')
    });


    /* m-menu */
    $('.header__burger-btn').on('click', function () {
        $(this).toggleClass('active');
        $('.m-menu').toggleClass('open');
    });
    $('.m-menu__title').on('click', function (e) {
        if ($(this).siblings('.m-menu__sublist').length) {
            e.preventDefault();
            $(this).parent().toggleClass('active');
        }
    });
    /* m-menu end */

    /* slider-main */

    function ANIMATOR(autoplay, progressbar, slider, to) {
        this.autoplay = autoplay;
        this.progressbar = $(progressbar);
        this.slider = slider;
        var self = this;
        this.to = to;
        this.clear = function () {
            this.progressbar.stop(true);
            this.progressbar.css({
                width: 0 + 'px'
            });/* 
            this.progressBar = this.progressBar; */
        }

        this.animate = function(){
            this.clear()
            this.progressbar.animate({
                width: 100 + '%'
            }, self.autoplay, function () {
                self.slider.slideNext();
                /* if(sliderMainInfo.length){
                    sliderMainInfo.slideNext();
                } */
                self.clear()
                self.animate();
            });
        }
        this.initSlider = function(){
            this.slider = new Swiper(this.slider, {
                speed: 1000,
                direction: this.to,
                allowTouchMove: false,
                loop: true,
                navigation: {
                    nextEl: '.block-main__slider-pagination-next',
                    prevEl: '.block-main__slider-pagination-prev',
                },
                on: {
                    slideChangeTransitionStart: function () {
                        $('.block-main__slider-item img').removeClass('fadeIn');
                        $('.block-main__slider-item.swiper-slide-active img').addClass('animated fadeIn');
                        self.clear();
                        self.animate();
                        changeBackgroundSlider();
                    },
                }
            });
        }
        this.initSlider();
    }

    function changeBackgroundSlider() {
        var currentSlideColor = $('.block-main__slider-item.swiper-slide-active').attr("data-color");
        $('.block-main__slider-content .background').css({
            background: currentSlideColor
        });
    }

    

    var sliderMainPagination = new Swiper('.js-slider-pagination', {
        slidesPerView: 4,
        spaceBetween: 16,
        allowTouchMove: false,
        loop: true,
    });
    

    /* var sliderMainInfo = new Swiper('.js-slider-main-info', {
        speed: 1000,
        allowTouchMove: false,
        loop: true,
        thumbs: {
            swiper: sliderMainPagination
        },
        on: {
            init: function () {
                animator1.clear();
                animator1.animate();
                changeBackgroundSlider();
            },
            slideChangeTransitionStart: function () {
                var swiper = this;
                sliderMain.slideTo(swiper.activeIndex);
            }
        }
    }); */

    
    var animator1 = new ANIMATOR(1000, '.block-main__slider-pagination ul li.swiper-slide-thumb-active .line span','.js-slider-main','vertical');

    if (window.innerWidth <= 768) {
        console.log(1);
        sliderMain.destroy(false, true);
    }
    /* slider-main end */

    /* filter-main */
    $('.filter-main-form__select, .filter__item').on('click', function () {
        $(this).toggleClass('active');
    });

    $('.filter-main-form__select-item').on('click', function () {
        var dataValue = $(this).attr('data-value');
        $(this).closest('.filter-main-form__item').find('input').val(dataValue);
        $(this).closest('.filter-main-form__select, .filter__item').find('.filter-main-form__select-current span').text(dataValue);
    });
    $('.filter__item-subitem').on('click', function () {
        var dataValue = $(this).attr('data-value');
        $(this).closest('.filter__item').find('input').val(dataValue);
        $(this).closest('.filter__item').find('.filter__item-current span').text(dataValue);
    });
    /* filter tabs */
    $('.filter-main-tabs').on('click', '.filter-main-tabs__item:not(.filter-main-tabs__item.active)', function () {
        $(this).addClass('active').siblings().removeClass('active').closest('.filter-main').find('.filter-main-tabs__content').removeClass('active').animate({
            opacity: 0
        }, 300).eq($(this).index()).addClass('active').animate({
            opacity: 1
        }, 300);
    });
    /* filter tabs end */
    /* filter-main end */


    /* filter-category */
    $('.filter__toggler').on('click', function () {
        $('.filter__toggler i').siblings().toggleClass('active');
        $('.filter__form').toggleClass('open');
    });
    /* filter-category end */


    /* slider-detail */
    var sliderDetailPagination = new Swiper('.js-slider-detail-pagination', {
        slidesPerView: 4,
        spaceBetween: 16,
    });

    var sliderDetail = new Swiper('.js-slider-detail', {
        speed: 1000,
        navigation: {
            nextEl: '.block-main__slider-pagination-next',
            prevEl: '.block-main__slider-pagination-prev',
        },
        on: {

        }
    });
    /* slider-detail end */
});