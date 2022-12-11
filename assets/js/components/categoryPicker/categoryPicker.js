function CategoryPicker(Config) {
    var el = eval(Config.el);
    var data = Config.data;
    var sl = Config.selectedNum;
    var id = Config.id;
    var title = Config.title;
    var unit = Config.unit;

    var lv_0 = '';
    var lv_1_parent = '';
    var lv_2_parent = '';


    for (var k in data) {

        // 第 1 層 台北市全區、新北市全區等等...
        lv_1_parent += '<ul class="list-level-one" data-parent="' + data[k].id + '"></ul>';

        // 第 2 層 內容
        for (var i in data[k].children) {
            lv_2_parent += '<ul class="list-level-two" data-parent="' + data[k].children[i].id + '">';
            lv_2_parent += '    <h2 class="category-item--title">' + data[k].children[i].name + '</h2>';
            lv_2_parent += '</ul>';
        }
    }

    var html = '';

    html += '<div class="category-picker" id="' + id + '" tabindex="-1">';
    html += '   <div class="category-mask"></div>';
    html += '   <div class="category-modal" >';
    html += '       <div class="category-modal-cnt">';
    html += '           <div class="category-modal-header">';
    html += '               ' + title + '';
    html += '               <button type="button" class="category-close" tabindex="0"></button>';
    html += '           </div>';
    html += '           <div class="category-modal-selected">';
    html += '               <span>已選擇 ( <span class="selectedNum">0</span> )</span>';
    html += '               <a class="category-del-all" tabindex="0">清空全部</a>';
    html += '           </div>';
    html += '           <div class="category-picker-selectedbox"></div>';
    html += '           <div class="category-modal-body">';
    html += '               ' + lv_1_parent + ' ';
    html += '               ' + lv_2_parent + ' ';
    html += '           </div>';
    html += '           <div class="category-modal-footer">';
    html += '               <button class="btn btn--border--primary category-close-btn" >關閉</button>';
    html += '               <button class="btn btn--primary category-confirm-btn" tabindex="0">確定</button>';
    html += '           </div>';
    html += '       </div>';
    html += '   </div>';
    html += '</div>';

    // 新增 ’地區選擇器‘ 至頁面中
    $('body').append(html);

    // 宣告
    var picker = $('#' + id);
    // 代入 [date.js] 資料 並且產生 HTML
    var n = 0;

    for (var k in data) {
        var lv_1_son = '';

        for (var i in data[k].children) {
            n++;

            lv_1_son += '<li class="lv1 category-item" data-id="' + data[k].children[i].id + '" tabindex="0">' + data[k].children[i].name + '</li>';

            var lv_2_son = '';

            for (var j in data[k].children[i].children) {

                var value = data[k].children[i].children[j].id;
                var name = data[k].children[i].children[j].name;
                var uid = data[k].children[i].children[j].uid;
                var pid = data[k].children[i].children[j].pid;

                lv_2_son += '<li class="category-item" tabindex="0">';
                lv_2_son += '   <input type="checkbox" class="lv2 chk-inp" value="' + value + '" data-pid="' + pid + '" data-uid="' + uid + '" data-name="' + name + '" id="' + uid + '">';
                lv_2_son += '   <label  class="chk-lab" for="' + uid + '">';
                lv_2_son += '       <i class="box"></i>';
                lv_2_son += '       <font>' + name + '</font>';
                lv_2_son += '   </label>';
                lv_2_son += '</li>';
            }
            picker.find('.list-level-two').eq(n - 1).append(lv_2_son);
        }
        picker.find('.list-level-one').eq(k).append(lv_1_son);

    }

    var width = $(window).width();
    // 選單預設選取第一個分類
    picker.find('.list-level-one').eq(0).addClass('list-tree-show');

    // 螢幕寬度大於 576 的時候，選單預設
    if (width >= 576) {
        picker.find('.list-level-two').eq(0).addClass('list-tree-show');
        picker.find('.lv1').eq(0).addClass('active');
    }

    // 顯示第 3 層分類標題能夠移動到 上一層
    picker.find('.category-item--title').on('click', function() {
        var _this = $(this);
        if (_this.parent().hasClass('list-tree-show')) {
            _this.parent().removeClass('list-tree-show');
        }
    });

    // 選單第一層分類被點擊時
    picker.find('.lv1').on('click', function() {
        var _this = $(this);
        var value = _this.data('id');

        picker.find('.list-level-two').each(function(index) {
            if ($(this).data('parent') == value) {
                picker.find('.list-level-two').removeClass('list-tree-show');
                picker.find('.list-level-two').eq(index).addClass('list-tree-show')
            }
        });

        picker.find('.lv1').removeClass('active');
        _this.addClass('active');

    });

    // 如果是地區選單，lv2 第一個是全選
    // 第一個地區全選全選項目，如果沒有全區的話這段要記得刪掉，目前是抓每個第二層分類的第一個為全選
    if (picker.prop('id') == 'areaPicker') {

        picker.find('ul.list-level-two').each(function() {
            var _this = $(this);
            _this.find('.category-item').first().find('.lv2').click(function() {
                var __this = $(this);
                if (this.checked) {
                    __this.parent('.category-item').nextAll()
                        .find('.lv2:checked')
                        .click();
                    __this.parent('.category-item').nextAll()
                        .find('.lv2')
                        .prop("checked", true)
                        .prop("disabled", true);
                } else {
                    __this.parent('.category-item').nextAll()
                        .find('.lv2')
                        .prop("checked", false);
                }
            });
        });
    }


    // 第二層選項發生變化的時候
    var max = sl - 1;
    picker.find('.lv2').on('change', function() {
        var _this = $(this);
        var value = _this.val();
        var name = _this.data('name');
        var uid = _this.data('uid');
        var pid = _this.data('pid');
        var lum = picker.find('.category-picker-selectedbox-item').length;

        _this.parent('.category-item').toggleClass("active");
        // 
        if (_this.prop('checked')) {
            var item = '<label class="category-picker-selectedbox-item" data-id="' + value + '" data-pid="' + pid + '" data-uid="' + uid + '" data-name="' + name + '" tabindex="0" >\
                            <span>' + name + '</span>\
                            <a class="category-picker-selectedbox-item-del-this"></a>\
                        </label>';
            // 第二層選項 被 Ckecked 的時候 產生標籤在上方
            picker.find('.category-picker-selectedbox').append(item);

            // 數量超過的時候，所有 CheckBox 變成 disabled
            if (lum == max) {
                picker.find('.lv2:not(:checked)').prop('disabled', true);
            }
            // 如果第二層分類裡面有被 Checked 則第一層的文字變色提示裡面有選取
            if (picker.find('.lv2:checked').length > 0) {
                picker.find('.list-level-one.list-tree-show').find('.lv1.category-item.active').css('color', '#D10310');
            }
            // 已選取的數字增加
            picker.find('.selectedNum').text(lum + 1);

        } else {
            // 已選取的數字增加
            picker.find('.category-picker-selectedbox-item').each(function(index) {
                if ($(this).data('id') == value) {
                    picker.find('.category-picker-selectedbox-item').eq(index).remove()
                }
            });
            // 當第二層的選項 Checked == 0 得時候 父層選單文字顏色移除
            for (var i in data[k].children) {
                if (picker.find('[data-parent="' + data[k].children[i].id + '"]').find('.lv2:checked').length == 0) {
                    $('[data-id="' + data[k].children[i].id + '"]').css('color', '');
                }
            }

            picker.find('.lv2:not(:checked)').prop('disabled', false);
            // 已選取的數字減少
            picker.find('.selectedNum').text(lum - 1);
        }

    });


    // 清除全部按鈕 點擊事件
    picker.find('.category-del-all').on('click', function() {

        picker.find('.lv2').prop('checked', false);
        picker.find('.lv2').parent('.category-item').removeClass('active');
        picker.find('.lv2:not(:checked)').prop('disabled', false);
        picker.find('.category-picker-selectedbox .category-picker-selectedbox-item').hide(200, function() {
            $(this).remove();
        })
        picker.find('.list-level-one').find('.lv1.category-item').css('color', '');
        picker.find('.selectedNum').text(0);
    });


    // 單個標籤 清除 點擊事件
    picker.on('click', '.category-picker-selectedbox-item-del-this', function() {
        var _this = $(this);
        var se_value = _this.parent().data('id');
        var se_lum = picker.find('.category-picker-selectedbox-item').length;
        var se_pid = _this.parent().data('pid');
        var se_uid = _this.parent().data('uid');


        picker.find('.lv2').each(function() {
            var __this = $(this);
            if (__this.val() == se_value) {

                __this.parent('.category-item').removeClass('active');
                __this.prop('checked', false);

                var chk_pid = __this.data('pid');

                if (chk_pid == se_pid) {
                    var parents = __this.parent().parent().data('parent');
                    var inp_pid = $('input[data-pid="' + chk_pid + '"]').parent('.active').length;

                    if (inp_pid == 0) {
                        $('[data-id="' + parents + '').css('color', '');
                    }
                }

                if (__this.parent().parent().first('.category-item').find('.lv2')) {
                    __this.parent('.category-item').nextAll()
                        .find('.lv2')
                        .prop("checked", false);
                }
            }
        });

        _this.parent().hide(200, function() {
            $(this).remove();
        });

        picker.find('.lv2:not(:checked)').prop('disabled', false);
        picker.find('.selectedNum').text(se_lum - 1);

    });


    // 點擊 / 輸入時 Input 顯示選單
    var off = true;
    // for 台灣就業通
    var FocusableElements = $('#form1 a , #form1 input , #form1 button , #form1 select')
    if (el.is('input')) {
        el.on('click keypress', function() {
            picker.removeClass('close');

            setTimeout(function() {
                // 彈窗顯示
                picker.addClass('show');
                // 預設第一層 focus
                picker.find('.lv1.category-item.active').focus();
            }, 100);

            FocusableElements.attr('tabindex', '-1');

        });

        el.focus(function(){
            
            document.activeElement.blur();

        });
    } else {
        el.on('click', function() {
            if (off) {
                picker.removeClass('close')
                off = false
            } else {
                picker.removeClass('show')
                off = true
            }
        })
    }



    // 點選 關閉 按鈕
    picker.find('.category-close,.category-close-btn').on('click', function() {

        picker.addClass('close');

        setTimeout(function() {
            // 彈窗隱藏
            picker.removeClass('show');
            // 輸入框焦點
            el.focus();
        }, 100);
        FocusableElements.attr('tabindex', '');

        picker.find('.lv2').prop('checked', false);
        picker.find('.lv2:not(:checked)').prop('disabled', false);
        picker.find('.selectedNum').text(0);
        picker.find('.category-picker-selectedbox').empty();

        off = true;
    });
    var selected = [];
    var strSelected = '';

    // 點擊 確認 按鈕
    picker.find('.category-confirm-btn').on('click', function() {
        var selected = [];
        var strSelected = '';
        var lum = picker.find('.category-picker-selectedbox-item').length;
        picker.find('.category-picker-selectedbox-item').each(function() {
            var name = $(this).data('name');
            var id = $(this).data('id');
            var uid = $(this).data('uid');

            selected.push({
                name: name,
                value: id,
                uid: uid
            });
            strSelected += name + '、';
        });

        strSelected = strSelected.substring(0, strSelected.length - 1);

        if (el.is('input')) {
            if (lum >= 5) {
                console.log(strSelected.length)
                el.val('已經選擇 ' + lum + ' 個' + unit);
            } else {
                el.val(strSelected);
            }
        } else {
            if (strSelected == '') {
                el.text('');
            } else {
                el.text(strSelected);
            }
        }

        Config.confirm(selected);
        off = true;

        setTimeout(function() {
            el.focus();
            picker.removeClass('show')
            FocusableElements.attr('tabindex', '');
        }, 100);

        picker.addClass('close')
    });


    // 鍵盤 ESC 鍵關閉彈窗
    picker.on('keydown', function(e) {
        var code = e.keyCode || e.which;
        if (e.keyCode === 27) {

            picker.addClass('close');

            setTimeout(function() {
                // 彈窗隱藏
                picker.removeClass('show');
                // 輸入框焦點
                el.focus();
            }, 100);
            FocusableElements.attr('tabindex', '');

            picker.find('.lv2').prop('checked', false);
            picker.find('.lv2:not(:checked)').prop('disabled', false);
            picker.find('.selectedNum').text(0);
            picker.find('.category-picker-selectedbox').empty();

            off = true;
        }
    });

    // 鍵盤清除標籤事件
    picker.on('keypress', '.category-picker-selectedbox-item', function(event) {
        var code = event.keyCode || event.which;
        var _this = $(this);
        if (code == 13) {

            event.preventDefault();
            _this.find('.category-picker-selectedbox-item-del-this').click();

        }
    });


    // 鍵盤輸入事件 
    picker.find('.category-item').bind('keypress', function(event) {
        var code = event.keyCode || event.which;
        var _this = $(this);
        if (code == 13) {
            if (_this.parent('.list-level-two').length) {
                _this.find('input').click();
            } else if (_this.parent('.list-level-one').length) {
                _this.click();
            }

        }
    });

    // 清除全部的鍵盤事件
    picker.find('.category-del-all').bind('keypress', function(event) {
        var code = event.keyCode || event.which;
        if (code == 13) {
            event.preventDefault();
            $(this).click();
            picker.find('.list-level-one.list-tree-show').find('.lv1.category-item.active').css('color', '');
        }
    });

}