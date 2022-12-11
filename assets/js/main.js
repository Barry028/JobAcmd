        ;
        (function($) {

            $.Main = {

                init: function() {

                    $(document).ready(function(e) {
                        

                        // Extends jQuery
                        $.Main.helpers.extendjQuery();
                        // Botostrap Tootltips
                        $('[data-toggle="tooltip"]').tooltip();
                        // Botostrap Popover
                        $('[data-toggle="popover"]').popover();

                        // Set Background Image Dynamically
                        if ($('[data-bg-img-src]').length) {
                            $.Main.helpers.bgImage($('[data-bg-img-src]'));
                        }
                        if ($('[data-mask]').length > 0) {
                            $.MaskedInput.init('[data-mask]');
                        }
                        // DETECT INTERNET EXPLORER (IE)
                        $.Main.helpers.detectIE();

                        // POLLYFILL IMG (IE)
                        if ($('img.img-fluid').length > 0) {
                            var $someImages = $('img.img-fluid');
                            objectFitImages($someImages);
                        }
                        // Side Bar Scroll
                        if ($('.js-scrollbar').length)
                            $.TUScrollBar.init($('.js-scrollbar'), {
                                setHeight: '100%' //设置你内容的高度 值可以是像素值或者百分比(string),取值300,"30%"

                            });


                        if ($('.js-x-scrollbar').length)
                            $.TUScrollBar.init($('.js-x-scrollbar'), {

                                axis: "x",
                                advanced: {
                                    autoExpandHorizontalScroll: true,
                                    updateOnBrowserResize: true
                                }
                            })

                        $.TUBackToGo.init('.js-go-to');

                        // BURGER
                        $('#burger').on('click', function() {
                            $('#main_nav').toggleClass('nav-show')
                        });


                        // CheckBox & radio
                        $('.check_wrap-label').on('keydown', function() {
                            var code = event.keyCode || event.which;
                            var _this = $(this);
                            if (code == 13) {
                              _this.click();
                            }
                          });

                        // PASSWORD
                        $('.tu-eye-off').on('click', function() {
                            var _this = $(this);
                            var input = _this.parent().find('.form-control');
                            var type = _this.parent().find('.form-control').attr('type');
                            if (type === 'password') {
                                _this.removeClass('tu-eye-off').addClass('tu-eye');
                                input.attr('type', 'text');
                            } else {
                                _this.removeClass('tu-eye').addClass('tu-eye-off');
                                input.attr('type', 'password');
                            }
                        });

                        // 相加 Input
                        $(".form-nums .inputNum").blur(function() {

                            var input_f = $(this).parents('ul').find('li').eq(0).find('.inputNum');
                            var input_f_val = parseInt(input_f.val()) || 0;
                            var input_m = $(this).parents('ul').find('li').eq(1).find('.inputNum');
                            var input_m_val = parseInt(input_m.val()) || 0;
                            var input_total = $(this).parents('ul').find('li').eq(2).find('.form-control');

                            input_total.val(input_f_val + input_m_val);
                        });

                        // 上方輪播廣告 
                        var slider = $("#slider");
                        if (slider.length > 0) {
                            slider.owlCarousel({
                                animateOut: 'zoomOut',
                                animateIn: 'zoomIn',
                                loop: false, // 
                                dots: true,
                                lazyLoad: true,
                                nav: true,
                                navText: ["", ""],
                                items: 1,
                                margin: 10,
                                autoHeight: true,
                            });
                        };
                        // 競賽作品
                        var work_cards = $("#work_cards");
                        if (work_cards.length > 0) {
                            work_cards.owlCarousel({
                                margin: 10,
                                loop: true,
                                dots: false,
                                nav: true,
                                navText: ["<img src='img/left-arrow.svg' alt='向左滑動'>", "<img src='img/right-arrow.svg' alt='向右滑動'>"],
                                lazyLoad: true,
                                stagePadding: 12,
                                responsive: {
                                    0: {
                                        items: 1
                                    },
                                    480: {
                                        items: 2
                                    },
                                    768: {
                                        items: 3
                                    },
                                    992: {
                                        items: 4
                                    },
                                },
                            });
                        };
                        // 實例分享
                        var case_cards = $("#case_cards");
                        if (case_cards.length > 0) {
                            case_cards.owlCarousel({
                                margin: 10,
                                loop: true,
                                dots: false,
                                nav: true,
                                navText: ["<img src='img/left-arrow.svg' alt='向左滑動'>", "<img src='img/right-arrow.svg' alt='向右滑動'>"],
                                lazyLoad: true,
                                stagePadding: 12,
                                responsive: {
                                    0: {
                                        items: 1
                                    },
                                    480: {
                                        items: 2
                                    },
                                    768: {
                                        items: 3
                                    },
                                    992: {
                                        items: 4
                                    },
                                },
                            });
                        };
                        // 友站連結
                        var related_links = $("#related_links");
                        if (related_links.length > 0) {
                            related_links.owlCarousel({
                                margin: 10,
                                loop: true,
                                dots: true,
                                nav: true,
                                navText: ["<img src='img/left-arrow.svg' alt='向左滑動'>", "<img src='img/right-arrow.svg' alt='向右滑動'>"],
                                lazyLoad: true,
                                responsive: {
                                    0: {
                                        items: 2
                                    },
                                    480: {
                                        items: 3
                                    },
                                    768: {
                                        items: 4
                                    },
                                    992: {
                                        items: 5
                                    },
                                },
                            });
                        };

                        // 日曆選單 區間
                        if ($('.input-daterange').length) {
                            var dateGroup = $('.input-daterange');
                            // Date Pciker 日期選單
                            $('.input-daterange').datepicker({
                                format: "twy/mm/dd",
                                language: "zh-TW",
                                keyboardNavigation: false,
                                autoclose: true,
                                todayHighlight: true,
                                disableTouchKeyboard: true,
                                orientation: "bottom auto",
                            });

                            dateGroup.find('[name="start"]').datepicker().on("changeDate", function() {
                                var _this = $(this);
                                var startDate = $(this).datepicker('getDate');
                                var oneDayFromStartDateAdd = moment(startDate).add(7, 'days').toDate();
                                console.log(oneDayFromStartDateAdd)

                                _this.parent().parent().next().next('div.range-box').find('[name="end"]')
                                    .datepicker('setDate', oneDayFromStartDateAdd).focus();
                            });

                            dateGroup.find('[name="end"]').datepicker().on("show", function() {
                                var startDate = $('#StartDate').datepicker('getDate');
                                $('.day.disabled').filter(function(index) {
                                    return $(this).text() === moment(startDate).format('D');
                                }).addClass('active');
                            });

                        };

                        // 生日選單
                        if ($('#FormPSN_MPBirth_AD_TW').length) {
                            $('#FormPSN_MPBirth_AD_TW').datepicker({
                                format: "twy/mm/dd",
                                language: "zh-TW",
                                keyboardNavigation: false,
                                autoclose: true,
                                todayHighlight: true,
                                disableTouchKeyboard: true,
                                orientation: "bottom auto",
                                showButtonPanel: true,
                            });
                        };

                        if ($('.js-datepicker').length) {
                            $('.js-datepicker').datepicker({
                                format: "twy/mm/dd",
                                language: "zh-TW",
                                keyboardNavigation: false,
                                autoclose: true,
                                todayHighlight: true,
                                disableTouchKeyboard: true,
                                orientation: "bottom auto",
                                showButtonPanel: true,
                            });
                        };



                        // 首頁 公告訊息 文字變換
                        $('#news_2_lab').on('click', function() {
                            var _this = $(this);
                            _this.parent().find('.more--btn').text('更多活動訊息 →')
                        });

                        $('#news_1_lab').on('click', function() {
                            var _this = $(this);
                            _this.parent().find('.more--btn').text('更多焦點快報 →')
                        });

                        $('button[type="reset"]').on('click', function() {
                            $.Main.components.toast('已清除資料！', 'success', 1500);
                        });
                        // 抽屜
                        $(".accordion--item").on('click', function() {
                            var $this = $(this);
                            $.Main.components.accordions(this);
                        });


                        if ($('#contact').length) {
                            var contactAni = bodymovin.loadAnimation({
                                container: document.getElementById('contact'),
                                renderer: 'svg',
                                loop: false,
                                autoplay: true,
                                path: "https://assets9.lottiefiles.com/packages/lf20_uvmjckef.json",
                            });

                            var contactBox = document.querySelector('.bodymovinanim');

                            var direction = 1;
                            contactBox.addEventListener('mouseenter', (e) => {
                                contactAni.setDirection(direction);
                                contactAni.play();
                            });

                            contactBox.addEventListener('mouseleave', (e) => {
                                contactAni.setDirection(-direction);
                                contactAni.play();
                            });


                        }

                    });

                    $(window).on('load', function(e) {

                        if ($('#loader').length) {
                            var animation = bodymovin.loadAnimation({
                                container: document.getElementById('lottie_load'),
                                renderer: 'svg',
                                loop: 1,
                                autoplay: true,
                                path: "https://assets6.lottiefiles.com/packages/lf20_em3kbgvq.json"
                            });

                            animation.onComplete = function() {
                                $('#loader').fadeOut('slow');
                            }
                        }



                    });

                },

                components: {
                    /**
                     * Toggle Accordions 折疊
                     */
                    accordions: function(element, time) {
                        $(element).toggleClass('click');
                        $(element).find('dt > i').toggleClass('tu-minus-circle tu-plus-circle');
                    },

                    /**
                     * Toast 吐司彈跳訊息
                     */
                    toast: function(txt, type, time) {
                        var time = isNaN(time) ? 3E3 : time;
                        var toast = document.createElement('div');
                        var oldToast = document.getElementsByClassName('toast');

                        if (oldToast.length != 0) {
                            document.querySelectorAll(".toast")[0].remove()
                        }

                        switch (type) {
                            case 'success':
                                toast.className = 'toast float-toast toast--success fadeIn';
                                toast.innerHTML = '<i class="tu-check-circle" aria-hidden="true"></i> <font>' + txt + '</font>';
                                break;
                            case 'error':
                                toast.className = 'toast float-toast toast--error fadeIn';
                                toast.innerHTML = '<i class="tu-x-circle" aria-hidden="true"></i> <font>' + txt + '</font>';
                                break;
                            case 'info':
                                toast.className = 'toast float-toast toast--info fadeIn';
                                toast.innerHTML = '<i class="tu-info" aria-hidden="true"></i> <font>' + txt + '</font>';
                                break;
                            case 'alerts':
                                toast.className = 'toast float-toast toast--alerts fadeIn';
                                toast.innerHTML = '<i class="tu-alert-circle" aria-hidden="true"></i> <font>' + txt + '</font>';
                                break;
                            case 'warning':
                                toast.className = 'toast float-toast toast--warning fadeIn';
                                toast.innerHTML = '<i class="tu-alert-triangle" aria-hidden="true"></i> <font>' + txt + '</font>';
                                break;
                            case 'help':
                                toast.className = 'toast float-toast toast--help fadeIn';
                                toast.innerHTML = '<i class="tu-help-circle" aria-hidden="true"></i> <font>' + txt + '</font>';
                                break;
                        };

                        document.body.appendChild(toast);

                        setTimeout(function() {
                            toast.classList.remove('fadeIn');
                            toast.classList.add('fadeOut');
                            toast.remove();
                        }, time, 1000);
                    },
                },

                helpers: {

                    Math: {

                    },
                    /**
                     *  網頁字體放大 ( 變更 Html FontSize(Rem) )
                     */
                    cFontSize: function(size) {
                        var min = 14;
                        var max = 22;
                        var html = document.getElementsByTagName('html');

                        switch (size) {
                            case 'bigger':
                                for (i = 0; i < html.length; i++) {
                                    var elem = html[0];
                                    var styles = window.getComputedStyle(elem, null).getPropertyValue('font-size');

                                    if (elem.style.fontSize) {
                                        var fontSize = parseFloat(styles);
                                    } else {
                                        var fontSize = 18;
                                    }

                                    if (fontSize != max) {
                                        fontSize += 1;
                                        elem.style.fontSize = fontSize + 'px';
                                        $.Main.components.toast('字級已經放大一個級距！', 'success', 1500);
                                    } else {
                                        $.Main.components.toast('字級已經放到最大！', 'warning', 1500);
                                    }
                                };
                                break;
                            case 'smaller':
                                for (i = 0; i < html.length; i++) {
                                    var elem = html[0];
                                    var styles = window.getComputedStyle(elem, null).getPropertyValue('font-size');

                                    if (elem.style.fontSize) {
                                        var fontSize = parseFloat(styles);
                                    } else {
                                        var fontSize = 18;
                                    }

                                    if (fontSize != min) {
                                        fontSize -= 1;
                                        elem.style.fontSize = fontSize + 'px';
                                        $.Main.components.toast('字級已經縮小一個級距！', 'success', 1500);
                                    } else {
                                        $.Main.components.toast('字級已經縮到最小！', 'warning', 1500);
                                    }
                                };
                                break;
                            case 'unset':
                                var elem = html[0];
                                var styles = window.getComputedStyle(elem, null).getPropertyValue('font-size');

                                if (parseFloat(styles) == 18) {
                                    $.Main.components.toast('目前字級已經是預設大小！', 'warning', 1500);
                                    return false;
                                } else {
                                    var fontSize = 18;
                                    elem.style.fontSize = fontSize + 'px';
                                    $.Main.components.toast('字級已恢復預設大小！', 'success', 1500);
                                }


                                break;
                        };

                    },
                    /**
                     * Sets background-image dynamically.
                     *
                     * @param jQuery collection
                     *
                     * @return jQuery|undefined
                     */
                    bgImage: function(collection) {

                        if (!collection || !collection.length) return;

                        return collection.each(function(i, el) {

                            var $el = $(el),
                                bgImageSrc = $el.data('bg-img-src');

                            if (bgImageSrc) $el.css('background-image', 'url(' + bgImageSrc + ')');

                        });

                    },


                    /**
                     * Extends basic jQuery functionality
                     *
                     * @return undefined
                     */
                    extendjQuery: function() {

                        $.fn.extend({

                            /**
                             * Runs specified function after loading of all images.
                             *
                             * @return Deferred
                             */
                            imagesLoaded: function() {

                                var $imgs = this.find('img[src!=""]');

                                if (!$imgs.length) {
                                    return $.Deferred().resolve().promise();
                                }

                                var dfds = [];

                                $imgs.each(function() {
                                    var dfd = $.Deferred();
                                    dfds.push(dfd);
                                    var img = new Image();
                                    img.onload = function() {
                                        dfd.resolve();
                                    };
                                    img.onerror = function() {
                                        dfd.resolve();
                                    };
                                    img.src = this.src;
                                });

                                return $.when.apply($, dfds);

                            }

                        });

                    },

                    /**
                     *  判斷 瀏覽器 是否為ＩＥ以及其版本 
                     */
                    detectIE: function() {

                        var ua = window.navigator.userAgent;
                        var msie = ua.indexOf('MSIE ');

                        if (msie > 0) {
                            // IE 10
                            var ieV = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
                            document.querySelector('body').className += 'ie ie' + ieV + ' ';

                            if (ieV < 9) {
                                // IE 9 以下建議使用者升級瀏覽器
                                confirm("您的 IE 版本過低，點選【確定】升級，如不升級您將不能正常瀏覽網頁！")
                                location.href = "https://support.microsoft.com/zh-tw/help/17621/internet-explorer-downloads";
                            }

                        }

                        var trident = ua.indexOf('Trident/');
                        if (trident > 0) {
                            // IE 11
                            var rv = ua.indexOf('rv:');
                            var ieV = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
                            document.querySelector('body').className += 'ie ie' + ieV + ' ';
                        }

                        var edge = ua.indexOf('Edge/');
                        if (edge > 0) {
                            // IE 12
                            var edgeV = parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
                            document.querySelector('body').className += 'edge edge' + edgeV + ' ';
                        }

                        // other browser
                        return false;

                    },

                },

                settings: {
                    rtl: false
                }

            };

            $.Main.init();

        })(jQuery);


        // $('.form-set').tooltip('show')