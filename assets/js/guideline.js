//  滾動監聽
$(function() {

    var link = $('#guideMenu li a');

    if (link.attr('href') == 'javascript:;') {
        link.on('click', function(e) {
            // var target = $($(this).attr('href'));
            var target = $(this).data('scroll');
            $('html, body').animate({
                scrollTop: $('#' + target).offset().top
            }, 250);
            $(this).addClass('active');
            e.preventDefault();
        });
    }

    function scrNav() {
        var sTop = $(window).scrollTop();
        $('section').each(function() {
            var id = $(this).attr('id'),
                offset = $(this).offset().top - 1,
                height = $(this).height();
            if (sTop >= offset && sTop < offset + height) {
                link.removeClass('active');
                $('#guideMenu').find('[data-scroll="' + id + '"]').addClass('active');
            }
        });
    }

    $(window).on('scroll', function() {
        scrNav();
    });

    scrNav();


    //  Animation Select
    function testAnim(x) {
        $('#animationSandbox').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
    };

    $('.js--triggerAnimation').click(function(e) {
        e.preventDefault();
        var anim = $('.js--animations').val();
        testAnim(anim);
    });

    $('.js--animations').change(function() {
        var anim = $(this).val();
        testAnim(anim);
    });

    //  Burger Menu Toggle 
    $("#guiMenu").click(function() {
        var menu = $('.gui-side-bar')
        $(this).toggleClass('active');
        menu.toggleClass('close').next('#guiMain').toggleClass('active');;
    });
    $('body').on('click', '.dropdown-menu--animations > li > a', function(e) {
        var animationName = $(this).text();
        var tabPane = $(this).attr('href');

        e.preventDefault();

        $('.dropdown-menu--animations > li').removeClass('active');
        $(this).parent().addClass('active');
        $('.btn--animation').find('span').html(animationName);
        $('.tab-pane--animation-names').removeClass('active');
        $(tabPane).addClass('active');
    });


    $('body').on('click', '.tab-pane--animation-names > button', function() {
        var animation = $(this).text();
        var animateImg = $('.img-animation').find('img');
        if (animation === "hinge") {
            animationDuration = 2100;
        } else {
            animationDuration = 1200;
        }

        animateImg.removeAttr('class');
        animateImg.addClass('animated ' + animation);

        setTimeout(function() {
            animateImg.removeClass(animation);
        }, animationDuration);
    });
    // $('#guiAside').mCustomScrollbar({
    //     axis: "y"
    // });

    // 轉換色碼
    // Color Rgb to Hex
    // function rgb2hex(rgb) {

    //     rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    //     function hex(x) {
    //         return ("0" + parseInt(x).toString(16)).slice(-2);
    //     }
    //     return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    // };

    // 將色碼帶入設計規範卡片 ( assets/scss/helpers/_variables.scss )
    // Color Palete bulid
    // $(".gui-cnt-row ul.list-palete > li").each(function() {
    //     var _this = $(this);

    //     var lighten = _this.find('div.palete-color').find('div.palete-color__lighten').css('backgroundColor');
    //     var lightenHex = rgb2hex(lighten);
    //     var darken = _this.find('div.palete-color').find('div.palete-color__darken').css('backgroundColor');
    //     var darkenHex = rgb2hex(darken);

    //     _this.find('div.palete-color__content').find('span.palete-color__lighten__code').html(lightenHex);
    //     _this.find('div.palete-color__content').find('span.palete-color__darken__code').html(darkenHex);
    // });


    // iCon Build 
    // $.ajax({
    //     url: "vendor/icon-recruit/selection.json",
    //     dataType: "json",
    //     success: function(data) {
    //         var icons = data.icons;
    //         //console.log(icons);

    //         $.each(icons, function(key, icon) {

    //             $('[data-toggle="tooltip"]').tooltip();

    //             //console.log(icon)
    //             if (icon.setId == 0) {
    //                 $('#ic_actions').append(
    //                     "<li class='gui-icon-blk'>\
    //                         <div class='gui-icon-cnt'>\
    //                             <a class='link--grey' href='javascript:;' data-toggle=tooltip title=nre-" + icon.properties.name + ">\
    //                                 <i class='nre-" + icon.properties.name + "'></i>\
    //                             </a>\
    //                             <p>nre-" + icon.properties.name + "</p>\
    //                         </div>\
    //                     </li>")
    //             } 
    //             else if (icon.setId == 1) {
    //                 $('#ic_alerts').append(
    //                     "<li class='gui-icon-blk'>\
    //                         <div class='gui-icon-cnt'>\
    //                                 <a class='link--grey' href='javascript:;' data-toggle='tooltip' title='nre-" + icon.properties.name + "'>\
    //                                     <i class='nre-" + icon.properties.name + "'></i>\
    //                                 </a>\
    //                             <p>nre-" + icon.properties.name + "</p>\
    //                         </div>\
    //                     </li>")
    //             }
    //             else if (icon.setId == 2) {
    //                 $('#ic_arrows').append(
    //                     "<li class='gui-icon-blk'>\
    //                         <div class='gui-icon-cnt'>\
    //                                 <a class='link--grey' href='javascript:;' data-toggle='tooltip' title='re-g-" + icon.properties.name + "'>\
    //                                     <i class='nre-" + icon.properties.name + "'></i>\
    //                                 </a>\
    //                             <p>re-g-" + icon.properties.name + "</p>\
    //                         </div>\
    //                     </li>")
    //             }
    //             else if (icon.setId == 3) {
    //                 $('#ic_audiovisual').append(
    //                     "<li class='gui-icon-blk'>\
    //                         <div class='gui-icon-cnt'>\
    //                                 <a class='link--grey' href='javascript:;' data-toggle='tooltip' title='nre-" + icon.properties.name + "'>\
    //                                     <i class='nre-" + icon.properties.name + "'></i>\
    //                                 </a>\
    //                             <p>nre-" + icon.properties.name + "</p>\
    //                         </div>\
    //                     </li>")
    //             }
    //             else if (icon.setId == 4) {
    //                 $('#ic_communication').append(
    //                     "<li class='gui-icon-blk'>\
    //                         <div class='gui-icon-cnt'>\
    //                                 <a class='link--grey' href='javascript:;' data-toggle='tooltip' title='nre-" + icon.properties.name + "'>\
    //                                     <i class='nre-" + icon.properties.name + "'></i>\
    //                                 </a>\
    //                             <p>nre-" + icon.properties.name + "</p>\
    //                         </div>\
    //                     </li>")
    //             }
    //             else if (icon.setId == 5) {
    //                 $('#ic_devices').append(
    //                     "<li class='gui-icon-blk'>\
    //                         <div class='gui-icon-cnt'>\
    //                                 <a class='link--grey' href='javascript:;' data-toggle='tooltip' title='nre-" + icon.properties.name + "'>\
    //                                     <i class='nre-" + icon.properties.name + "'></i>\
    //                                 </a>\
    //                             <p>nre-" + icon.properties.name + "</p>\
    //                         </div>\
    //                     </li>")
    //             }
    //             else if (icon.setId == 6) {
    //                 $('#ic_files').append(
    //                     "<li class='gui-icon-blk'>\
    //                         <div class='gui-icon-cnt'>\
    //                                 <a class='link--grey' href='javascript:;' data-toggle='tooltip' title='nre-" + icon.properties.name + "'>\
    //                                     <i class='nre-" + icon.properties.name + "'></i>\
    //                                 </a>\
    //                             <p>nre-" + icon.properties.name + "</p>\
    //                         </div>\
    //                     </li>")
    //             }
    //             else if (icon.setId == 7) {
    //                 $('#ic_fooddrinks').append(
    //                     "<li class='gui-icon-blk'>\
    //                         <div class='gui-icon-cnt'>\
    //                                 <a class='link--grey' href='javascript:;' data-toggle='tooltip' title='nre-" + icon.properties.name + "'>\
    //                                     <i class='nre-" + icon.properties.name + "'></i>\
    //                                 </a>\
    //                             <p>nre-" + icon.properties.name + "</p>\
    //                         </div>\
    //                     </li>")
    //             }
    //             else if (icon.setId == 8) {
    //                 $('#ic_gesturesemotions').append(
    //                     "<li class='gui-icon-blk'>\
    //                         <div class='gui-icon-cnt'>\
    //                                 <a class='link--grey' href='javascript:;' data-toggle='tooltip' title='nre-" + icon.properties.name + "'>\
    //                                     <i class='nre-" + icon.properties.name + "'></i>\
    //                                 </a>\
    //                             <p>nre-" + icon.properties.name + "</p>\
    //                         </div>\
    //                     </li>")
    //             }
    //             else if (icon.setId == 9) {
    //                 $('#ic_keyboard').append(
    //                     "<li class='gui-icon-blk'>\
    //                         <div class='gui-icon-cnt'>\
    //                                 <a class='link--grey' href='javascript:;' data-toggle='tooltip' title='nre-" + icon.properties.name + "'>\
    //                                     <i class='nre-" + icon.properties.name + "'></i>\
    //                                 </a>\
    //                             <p>nre-" + icon.properties.name + "</p>\
    //                         </div>\
    //                     </li>")
    //             }
    //             else if (icon.setId == 10) {
    //                 $('#ic_mapplaces').append(
    //                     "<li class='gui-icon-blk'>\
    //                         <div class='gui-icon-cnt'>\
    //                                 <a class='link--grey' href='javascript:;' data-toggle='tooltip' title='nre-" + icon.properties.name + "'>\
    //                                     <i class='nre-" + icon.properties.name + "'></i>\
    //                                 </a>\
    //                             <p>nre-" + icon.properties.name + "</p>\
    //                         </div>\
    //                     </li>")
    //             }
    //             else if (icon.setId == 11) {
    //                 $('#ic_mediaediting').append(
    //                     "<li class='gui-icon-blk'>\
    //                         <div class='gui-icon-cnt'>\
    //                                 <a class='link--grey' href='javascript:;' data-toggle='tooltip' title='nre-" + icon.properties.name + "'>\
    //                                     <i class='nre-" + icon.properties.name + "'></i>\
    //                                 </a>\
    //                             <p>nre-" + icon.properties.name + "</p>\
    //                         </div>\
    //                     </li>")
    //             }
    //             else if (icon.setId == 12) {
    //                 $('#ic_other').append(
    //                     "<li class='gui-icon-blk'>\
    //                         <div class='gui-icon-cnt'>\
    //                                 <a class='link--grey' href='javascript:;' data-toggle='tooltip' title='nre-" + icon.properties.name + "'>\
    //                                     <i class='nre-" + icon.properties.name + "'></i>\
    //                                 </a>\
    //                             <p>nre-" + icon.properties.name + "</p>\
    //                         </div>\
    //                     </li>")
    //             }
    //             else if (icon.setId == 13) {
    //                 $('#ic_payment').append(
    //                     "<li class='gui-icon-blk'>\
    //                         <div class='gui-icon-cnt'>\
    //                                 <a class='link--grey' href='javascript:;' data-toggle='tooltip' title='nre-" + icon.properties.name + "'>\
    //                                     <i class='nre-" + icon.properties.name + "'></i>\
    //                                 </a>\
    //                             <p>nre-" + icon.properties.name + "</p>\
    //                         </div>\
    //                     </li>")
    //             }
    //             else if (icon.setId == 14) {
    //                 $('#ic_peopleactivity').append(
    //                     "<li class='gui-icon-blk'>\
    //                         <div class='gui-icon-cnt'>\
    //                                 <a class='link--grey' href='javascript:;' data-toggle='tooltip' title='nre-" + icon.properties.name + "'>\
    //                                     <i class='nre-" + icon.properties.name + "'></i>\
    //                                 </a>\
    //                             <p>nre-" + icon.properties.name + "</p>\
    //                         </div>\
    //                     </li>")
    //             }
    //             else if (icon.setId == 15) {
    //                 $('#ic_premium').append(
    //                     "<li class='gui-icon-blk'>\
    //                         <div class='gui-icon-cnt'>\
    //                                 <a class='link--grey' href='javascript:;' data-toggle='tooltip' title='nre-" + icon.properties.name + "'>\
    //                                     <i class='nre-" + icon.properties.name + "'></i>\
    //                                 </a>\
    //                             <p>nre-" + icon.properties.name + "</p>\
    //                         </div>\
    //                     </li>")
    //             }
    //             else if (icon.setId == 16) {
    //                 $('#ic_socialmediatools').append(
    //                     "<li class='gui-icon-blk'>\
    //                         <div class='gui-icon-cnt'>\
    //                                 <a class='link--grey' href='javascript:;' data-toggle='tooltip' title='nre-" + icon.properties.name + "'>\
    //                                     <i class='nre-" + icon.properties.name + "'></i>\
    //                                 </a>\
    //                             <p>nre-" + icon.properties.name + "</p>\
    //                         </div>\
    //                     </li>")
    //             }
    //             else if (icon.setId == 17) {
    //                 $('#ic_technologydata').append(
    //                     "<li class='gui-icon-blk'>\
    //                         <div class='gui-icon-cnt'>\
    //                                 <a class='link--grey' href='javascript:;' data-toggle='tooltip' title='nre-" + icon.properties.name + "'>\
    //                                     <i class='nre-" + icon.properties.name + "'></i>\
    //                                 </a>\
    //                             <p>nre-" + icon.properties.name + "</p>\
    //                         </div>\
    //                     </li>")
    //             }
    //             else if (icon.setId == 18) {
    //                 $('#ic_transport').append(
    //                     "<li class='gui-icon-blk'>\
    //                         <div class='gui-icon-cnt'>\
    //                                 <a class='link--grey' href='javascript:;' data-toggle='tooltip' title='nre-" + icon.properties.name + "'>\
    //                                     <i class='nre-" + icon.properties.name + "'></i>\
    //                                 </a>\
    //                             <p>nre-" + icon.properties.name + "</p>\
    //                         </div>\
    //                     </li>")
    //             }
    //             else if (icon.setId == 19) {
    //                 $('#ic_ui').append(
    //                     "<li class='gui-icon-blk'>\
    //                         <div class='gui-icon-cnt'>\
    //                                 <a class='link--grey' href='javascript:;' data-toggle='tooltip' title='nre-" + icon.properties.name + "'>\
    //                                     <i class='nre-" + icon.properties.name + "'></i>\
    //                                 </a>\
    //                             <p>nre-" + icon.properties.name + "</p>\
    //                         </div>\
    //                     </li>")
    //             }

    //             else if (icon.setId == 20) {
    //                 $('#ic_user').append(
    //                     "<li class='gui-icon-blk'>\
    //                         <div class='gui-icon-cnt'>\
    //                                 <a class='link--grey' href='javascript:;' data-toggle='tooltip' title='nre-" + icon.properties.name + "'>\
    //                                     <i class='nre-" + icon.properties.name + "'></i>\
    //                                 </a>\
    //                             <p>nre-" + icon.properties.name + "</p>\
    //                         </div>\
    //                     </li>")
    //             }

    //             else if (icon.setId == 21) {
    //                 $('#ic_educationmaterial').append(
    //                     "<li class='gui-icon-blk'>\
    //                         <div class='gui-icon-cnt'>\
    //                                 <a class='link--grey' href='javascript:;' data-toggle='tooltip' title='nre-" + icon.properties.name + "'>\
    //                                     <i class='nre-" + icon.properties.name + "'></i>\
    //                                 </a>\
    //                             <p>nre-" + icon.properties.name + "</p>\
    //                         </div>\
    //                     </li>")
    //             }
    //             else if (icon.setId == 22) {
    //                 $('#ic_humanresource').append(
    //                     "<li class='gui-icon-blk'>\
    //                         <div class='gui-icon-cnt'>\
    //                                 <a class='link--grey' href='javascript:;' data-toggle='tooltip' title='nre-" + icon.properties.name + "'>\
    //                                     <i class='nre-" + icon.properties.name + "'></i>\
    //                                 </a>\
    //                             <p>nre-" + icon.properties.name + "</p>\
    //                         </div>\
    //                     </li>")
    //             }
    //             else if (icon.setId == 23) {
    //                 $('#ic_humanresource1').append(
    //                     "<li class='gui-icon-blk'>\
    //                         <div class='gui-icon-cnt'>\
    //                                 <a class='link--grey' href='javascript:;' data-toggle='tooltip' title='nre-" + icon.properties.name + "'>\
    //                                     <i class='nre-" + icon.properties.name + "'></i>\
    //                                 </a>\
    //                             <p>nre-" + icon.properties.name + "</p>\
    //                         </div>\
    //                     </li>")
    //             }

    //         })

    //     },
    //     error: function(jqXHR, textStatus, errorThrown) {
    //         console.log('ERROR', textStatus, errorThrown);
    //     }
    // });

    // Turbo iCon Build 
    // $.ajax({
    //     url: "vendor/icon-turbotech/selection.json",
    //     dataType: "json",
    //     success: function(data) {
    //         var icons = data.icons;
    //         console.log(icons);

    //         $.each(icons, function(key, icon) {
    //             var iconHtml =
    //                 "<li class='gui-icon-blk'>\
    //                     <div class='gui-icon-cnt'>\
    //                         <a class='link--grey' href='javascript:;' data-toggle=tooltip title=tu-" + icon.properties.name + ">\
    //                             <i class='tu-" + icon.properties.name + "'></i>\
    //                         </a>\
    //                         <p>tu-" + icon.properties.name + "</p>\
    //                     </div>\
    //                 </li>"
    //             switch (icon.setId) {
    //                 case 12:
    //                     $('#ic_ui').append(iconHtml);
    //                     break
    //                 case 11:
    //                     $('#ic_travel').append(iconHtml);
    //                     break
    //                 case 10:
    //                     $('#ic_Sport').append(iconHtml);
    //                     break
    //                 case 9:
    //                     $('#ic_Medical').append(iconHtml);
    //                     break
    //                 case 8:
    //                     $('#ic_Multimedia').append(iconHtml);
    //                     break
    //                 case 7:
    //                     $('#ic_SEO').append(iconHtml);
    //                     break
    //                 case 6:
    //                     $('#ic_Social_Media').append(iconHtml);
    //                     break
    //                 case 5:
    //                     $('#ic_Food_Beverage').append(iconHtml);
    //                     break
    //                 case 4:
    //                     $('#ic_Business').append(iconHtml);
    //                     break
    //                 case 3:
    //                     $('#ic_Communication').append(iconHtml);
    //                     break
    //                 case 2:
    //                     $('#ic_Feather').append(iconHtml);
    //                     break
    //             }

    //         })

    //     },
    //     error: function(jqXHR, textStatus, errorThrown) {
    //         console.log('ERROR', textStatus, errorThrown);
    //     }
    // });
});