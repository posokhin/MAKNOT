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


    var autoplay = 10000;
    var progressBar = $('.block-main__slider-pagination ul li.swiper-slide-thumb-active .line span');

    function clearAnimate() {
        progressBar.stop(true);
        progressBar.css({
            width: 0 + 'px'
        });
        progressBar = $('.block-main__slider-pagination ul li.swiper-slide-thumb-active .line span');
    }

    function animateLine() {
        clearAnimate()
        progressBar.animate({
            width: 100 + '%'
        }, autoplay, function () {
            sliderMain.slideNext();
            sliderMainInfo.slideNext();
            clearAnimate();
            animateLine();
        });
    }

    function changeBackgroundSlider() {
        var currentSlideColor = $('.block-main__slider-item.swiper-slide-active').attr("data-color");
        $('.block-main__slider-content .background').css({
            background: currentSlideColor
        });
    }

    $('.block-main__slider-pagination-next').on('click', function () {
        /* if (window.innerWidth >= 768) {
            sliderMain.slideNext();
        } */
        sliderMainInfo.slideNext();
        clearAnimate();
        animateLine();
        console.log(sliderMain);
    });
    $('.block-main__slider-pagination-prev').on('click', function () {
        /* if (window.innerWidth >= 768) {
            sliderMain.slidePrev();
        } */
        sliderMainInfo.slidePrev();
        clearAnimate();
        animateLine();
    });

    var sliderMainPagination = new Swiper('.js-slider-pagination', {
        slidesPerView: 4,
        spaceBetween: 16,
        allowTouchMove: false,
        loop: true,
    });

    var sliderMain = new Swiper('.js-slider-main', {
        speed: 1000,
        direction: 'vertical',
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
                clearAnimate();
                animateLine();
                changeBackgroundSlider();
            },
        }
    });

    var sliderMainInfo = new Swiper('.js-slider-main-info', {
        speed: 1000,
        allowTouchMove: false,
        loop: true,
        thumbs: {
            swiper: sliderMainPagination
        },
        on: {
            init: function () {
                clearAnimate();
                animateLine();
                changeBackgroundSlider();
            },
            slideChangeTransitionStart: function () {
                var swiper = this;
                sliderMain.slideTo(swiper.activeIndex);
            }
        }
    });


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
        $('.filter__toggler').on('click', function(){
            $('.filter__toggler i').siblings().toggleClass('active');
            $('.filter__form').toggleClass('open');
        });
    /* filter-category end */
});