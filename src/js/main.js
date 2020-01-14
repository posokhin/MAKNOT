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

    function next(slider) {
        slider.slideNext();
    }
    function prev(slider) {
        slider.slidePrev();
    }
    $('.js-main-slider-next').on('click', function () {
        sliderMainInfo.slideNext();
        clearAnimate();
        animateLine();
        next(sliderMain);
    });
    $('.js-main-slider-prev').on('click', function () {
        sliderMainInfo.slidePrev();
        clearAnimate();
        animateLine();
        prev(sliderMain);
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
        if (sliderMain.length) {
            sliderMain.destroy(false, true);
        }
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

    var progressBar2 = $('.block-main__slider-pagination ul li.swiper-slide-thumb-active .line span');

    function clearAnimate2() {
        progressBar2.stop(true);
        progressBar2.css({
            width: 0 + 'px'
        });
        progressBar2 = $('.block-main__slider-pagination ul li.swiper-slide-thumb-active .line span');
    }

    function animateLine2() {
        clearAnimate2()
        progressBar2.animate({
            width: 100 + '%'
        }, autoplay, function () {
            sliderDetail.slideNext();
            clearAnimate2();
            animateLine2();
        });
    }


    var sliderDetailPagination = new Swiper('.js-slider-detail-pagination', {
        slidesPerView: 4,
        spaceBetween: 16,
        allowTouchMove: false,
    });

    var sliderDetail = new Swiper('.js-slider-detail', {
        speed: 1000,
        allowTouchMove: false,
        loop: true,
        thumbs: {
            swiper: sliderDetailPagination
        },
        navigation: {
            nextEl: '.block-main__slider-pagination-next',
            prevEl: '.block-main__slider-pagination-prev',
        },
        on: {
            init: function () {
                clearAnimate2();
                animateLine2();
            },
            slideChangeTransitionStart: function () {
                clearAnimate2();
                animateLine2();
            }
        }
    });
    $('.js-detail-slider-next').on('click', function () {
        clearAnimate2();
        animateLine2();
        next(sliderDetail);
    });
    $('.js-detail-slider-prev').on('click', function () {
        clearAnimate2();
        animateLine2();
        prev(sliderDetail);
    });
    /* slider-detail end */


    /* popups */
    $('.js-opt').on('click', function (e) {
        e.preventDefault();
        $('.overlay').fadeIn();
        $('.popup--opt').addClass('open');
    });
    $('.popup .close').on('click', function (e) {
        e.preventDefault();
        $('.overlay').fadeOut();
        $('.popup').removeClass('open');
    });
    /* popups end */

    /* buy-tabs */

    function tabs(item, parent, content) {
        $(item).on('click', function () {
            $(this).addClass('active').siblings().removeClass('active').closest(parent).find(content).removeClass('active').animate({
                opacity: 0
            }, 300).eq($(this).index()).addClass('active').animate({
                opacity: 1
            }, 300);
        });
    }
    tabs('.buy__tabs ul li', '.buy', '.buy__tabs-content');
    /* buy-tabs end */

    /* placemap */
    $('.js-open-placeMap').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active').closest('.place__item').find('.place__map').slideToggle();
        if ($(this).hasClass('active')) {
            $(this).text('Скрыть');
        }
        else {
            $(this).text('Показать на карте');
        }
    });
    /* placemap end */

    /* placeholder */
    $('.form__item input, .form__item textarea').on('focus', function () {
        $(this).siblings('.form__placeholder').addClass('active');
    });
    $('.form__item input, .form__item textarea').on('blur', function () {
        if ($(this).val() == "") {
            $(this).siblings('.form__placeholder').removeClass('active');
        }
        else {
            return false;
        }
    });
    /* placeholder end */

    /* gallery slider */
    function changeGallerTitle() {
        var title = $('.gallery__item.swiper-slide-active').attr('data-name');
        $('.gallery__title').text(title);
    }
    var sliderGalleryThumbs = new Swiper('.js-gallery-thumbs', {
        slidesPerView: 4,
        spaceBetween: 16
    });
    var sliderGallery = new Swiper('.js-gallery-slider', {
        speed: 1000,
        thumbs: {
            swiper: sliderGalleryThumbs
        },
        navigation: {
            nextEl: '.js-gallery-button-next',
            prevEl: '.js-gallery-button-prev',
        },
        on: {
            init: function () {
                changeGallerTitle();
            },
            slideChangeTransitionStart: function () {
                changeGallerTitle();
            }
        }
    });
    /* gallery slider end */

    /* counter */
    document.querySelectorAll('.counter__button--plus').forEach(function (el) {
        el.addEventListener('click', function () {
            var max = this.parentNode.querySelector('input');
            max.value++;
        });
    });

    document.querySelectorAll('.counter__button--min').forEach(function (el) {
        el.addEventListener('click', function () {
            var min = this.parentNode.querySelector('input');
            min.value--;
            if (min.value <= 0) {
                min.value = 0;
            }
        });
    });
    /* counter end */

    /* remove cart product */
    document.querySelectorAll('.js-remove-product').forEach(function (el) {
        el.addEventListener('click', function () {
            var row = el.parentNode.parentNode;
            $(row).fadeOut(function () {
                row.remove();
            });
        });
    });
    /* remove cart product end */

    /* checkout ckeckbox button */
    $('.checkout__content-buttons-group button').on('click', function (e) {
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
    });
    /* checkout ckeckbox button end */

    var i = 0;
    function stepNext(e) {
        e.preventDefault();
        $(this).closest('.checkout__item').find('.checkout__content').slideUp().closest('.checkout__item').removeClass('active').addClass('final').siblings().eq(i).slideDown().addClass('active');
        $('.checkout__item.active .checkout__content').slideDown();
        i++
    }
    function stepPrev(e) {
        e.preventDefault();
        i--;
        $(this).closest('.checkout__item').find('.checkout__content').slideUp().closest('.checkout__item').removeClass('active').siblings().eq(i).slideDown().addClass('active');
        $('.checkout__item.active .checkout__content').slideDown();
    }
    function currentStep() {

    }
    $('.checkout__item.active .checkout__content').slideDown();
    $('.js-chekout-next').on('click', stepNext);
    $('.js-chekout-prev').on('click', stepPrev);

    /* regFrom steps */
    $('.js-registration-next').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.registration__form').removeClass('active').siblings().addClass('active');
    });
    $('.js-registration-final').on('click', function (e) {
        e.preventDefault
        $('.registration').addClass('success');
    });
    /* regFrom steps end */

    /* popup auth */
    $('.js-auth').on('click', function (e) {
        e.preventDefault()
        $('.popup-reset').fadeOut(function () {
            $('.popup-auth-inner').fadeIn()
        });
        $('.popup-auth').fadeIn().css({
            display: 'flex'
        });
    })
    $('.popup-auth .close').on('click', function () {
        $('.popup-auth').fadeOut();
    })

    $('.js-change-password').on('click', function (e) {
        e.preventDefault()
        $('.popup-auth-inner').fadeOut(function () {
            $('.popup-reset').fadeIn();
        });
    })
    /* popup auth end */

    /* phone mask */
    document.querySelectorAll('input[type="tel"]').forEach(function (el) {
        IMask(
            el, {
            mask: '+{7}(000)000-00-00'
        });
    })
    /* phone mask end */

    /* personal */
    $('.js-personal-edit').on('click', function (e) {
        e.preventDefault()
        $('.personal-data__form').removeClass('disabled').find('input').each(function () {
            $(this).removeAttr('readonly');
        });
        $('.personal-data__form').find('input').eq(0).focus();
    })
    $('.js-personal-edit-done').on('click', function (e) {
        e.preventDefault()
        $('.personal-data__form').addClass('disabled').find('input').each(function () {
            $(this).attr('readonly', 'readonly');
        });;
    })
    /* personal end */

    /* personal pay-data */
    var vm = new Vue({
        el: '.personal-data__pay',
        data: {
            addCompany: [
                {
                    name: 'Название компании',
                    value: ''
                },
                {
                    name: 'ИНН',
                    value: ''
                },
                {
                    name: 'КПП',
                    value: ''
                },
                {
                    name: 'ОГРН',
                    value: ''
                },
                {
                    name: 'Почтовый адрес',
                    value: ''
                },
                {
                    name: 'Банк',
                    value: ''
                },
                {
                    name: 'БИК',
                    value: ''
                },
                {
                    name: 'КС',
                    value: ''
                },
                {
                    name: 'РС',
                    value: ''
                }
            ],
            companies: [
                [
                    {
                        name: 'Название компании',
                        value: 'ОАО «Арканзас»'
                    },
                    {
                        name: 'ИНН',
                        value: 123
                    },
                    {
                        name: 'КПП',
                        value: 1234
                    },
                    {
                        name: 'ОГРН',
                        value: 12345
                    },
                    {
                        name: 'Почтовый адрес',
                        value: 'Санкт-Петербург'
                    },
                    {
                        name: 'Банк',
                        value: 'ВТБ'
                    },
                    {
                        name: 'БИК',
                        value: 850
                    },
                    {
                        name: 'КС',
                        value: 988
                    },
                    {
                        name: 'РС',
                        value: 111
                    }
                ],
                [
                    {
                        name: 'Название компании',
                        value: '«Пятое колесо»'
                    },
                    {
                        name: 'ИНН',
                        value: 123
                    },
                    {
                        name: 'КПП',
                        value: 1234
                    },
                    {
                        name: 'ОГРН',
                        value: 12345
                    },
                    {
                        name: 'Почтовый адрес',
                        value: 'Санкт-Петербург'
                    },
                    {
                        name: 'Банк',
                        value: 'ВТБ'
                    },
                    {
                        name: 'БИК',
                        value: 850
                    },
                    {
                        name: 'КС',
                        value: 988
                    },
                    {
                        name: 'РС',
                        value: 111
                    }
                ]
            ],
        },
        methods: {
            dataAddEdit: function (value) {
                event.target.closest('.personal-data__pay-list').classList.add('add');
                event.target.closest('.personal-data__add').classList.add('active');
            },
            dataAdd: function (e) {
                e.preventDefault()
                this.companies.push(this.addCompany);
                this.addCompany = [
                    {
                        name: 'Название компании',
                        value: ''
                    },
                    {
                        name: 'ИНН',
                        value: ''
                    },
                    {
                        name: 'КПП',
                        value: ''
                    },
                    {
                        name: 'ОГРН',
                        value: ''
                    },
                    {
                        name: 'Почтовый адрес',
                        value: ''
                    },
                    {
                        name: 'Банк',
                        value: ''
                    },
                    {
                        name: 'БИК',
                        value: ''
                    },
                    {
                        name: 'КС',
                        value: ''
                    },
                    {
                        name: 'РС',
                        value: ''
                    }
                ]
                event.target.closest('.personal-data__pay-list').classList.remove('add');
                event.target.closest('.personal-data__add').classList.remove('active');
            },
            dataEdit: function () {
                event.target.closest('.personal-data__pay-item').classList.add('active');
                event.target.closest('.personal-data__pay-list').classList.add('edit');
            },
            dataSave: function (e) {
                e.preventDefault()
                event.target.closest('.personal-data__pay-item').classList.remove('active');
                event.target.closest('.personal-data__pay-list').classList.remove('edit');
            },
            deleteData: function (index) {
                this.companies.splice(index, 1);
            },
        },
    });
    /* personal pay-data end */
});