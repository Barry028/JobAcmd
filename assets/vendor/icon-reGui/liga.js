/* A polyfill for browsers that don't support ligatures. */
/* The script tag referring to this file must be placed before the ending body tag. */

/* To provide support for elements dynamically added, this script adds
   method 'icomoonLiga' to the window object. You can pass element references to this method.
*/
(function () {
    'use strict';
    function supportsProperty(p) {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
            i,
            div = document.createElement('div'),
            ret = p in div.style;
        if (!ret) {
            p = p.charAt(0).toUpperCase() + p.substr(1);
            for (i = 0; i < prefixes.length; i += 1) {
                ret = prefixes[i] + p in div.style;
                if (ret) {
                    break;
                }
            }
        }
        return ret;
    }
    var icons;
    if (!supportsProperty('fontFeatureSettings')) {
        icons = {
            'undo': '&#xe860;',
            'ccw': '&#xe860;',
            'redo': '&#xe861;',
            'cw': '&#xe861;',
            'sync': '&#xe862;',
            'spinner': '&#xe862;',
            'history': '&#xe863;',
            'archive': '&#xe863;',
            'clock': '&#xe864;',
            'time': '&#xe864;',
            'funnel': '&#xe88f;',
            'filter': '&#xe88f;',
            'text-format-remove': '&#xe891;',
            'typography2': '&#xe891;',
            'underline': '&#xe895;',
            'typography6': '&#xe895;',
            'text-size': '&#xe892;',
            'typography3': '&#xe892;',
            'italic': '&#xe894;',
            'typography5': '&#xe894;',
            'text-format': '&#xe890;',
            'typography': '&#xe890;',
            'bold': '&#xe893;',
            'typography4': '&#xe893;',
            'trash': '&#xe811;',
            'bin': '&#xe811;',
            'printer': '&#xe81c;',
            'print': '&#xe81c;',
            'camera': '&#xe826;',
            'photo': '&#xe826;',
            'bubble': '&#xe83f;',
            'chat': '&#xe83f;',
            'calendar-full': '&#xe836;',
            'calendar': '&#xe836;',
            'keyboard': '&#xe837;',
            'type': '&#xe837;',
            'chart-bars': '&#xe843;',
            'chart2': '&#xe843;',
            'gift': '&#xe844;',
            'birthday': '&#xe844;',
            'diamond': '&#xe845;',
            'jewelry': '&#xe845;',
            'select': '&#xe852;',
            'cursor': '&#xe852;',
            'warning': '&#xe87c;',
            'alert': '&#xe87c;',
            'question-circle': '&#xe87d;',
            'help': '&#xe87d;',
            'checkmark-circle': '&#xe87f;',
            'checkmark': '&#xe87f;',
            'cross-circle': '&#xe880;',
            'cross2': '&#xe880;',
            'plus-circle': '&#xe881;',
            'plus': '&#xe881;',
            'circle-minus': '&#xe882;',
            'minus': '&#xe882;',
            'menu-circle': '&#xe884;',
            'menu2': '&#xe884;',
            'text-align-left': '&#xe898;',
            'typography8': '&#xe898;',
            'text-align-center': '&#xe899;',
            'typography9': '&#xe899;',
            'text-align-right': '&#xe89a;',
            'typography10': '&#xe89a;',
            'text-align-justify': '&#xe89b;',
            'typography11': '&#xe89b;',
          '0': 0
        };
        delete icons['0'];
        window.icomoonLiga = function (els) {
            var classes,
                el,
                i,
                innerHTML,
                key;
            els = els || document.getElementsByTagName('*');
            if (!els.length) {
                els = [els];
            }
            for (i = 0; ; i += 1) {
                el = els[i];
                if (!el) {
                    break;
                }
                classes = el.className;
                if (/bed-/.test(classes)) {
                    innerHTML = el.innerHTML;
                    if (innerHTML && innerHTML.length > 1) {
                        for (key in icons) {
                            if (icons.hasOwnProperty(key)) {
                                innerHTML = innerHTML.replace(new RegExp(key, 'g'), icons[key]);
                            }
                        }
                        el.innerHTML = innerHTML;
                    }
                }
            }
        };
        window.icomoonLiga();
    }
}());
