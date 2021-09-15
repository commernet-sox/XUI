/* ========================================================================
 * Bootstrap: alert.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#alerts
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * ZUI: The file has been changed in ZUI. It will not keep update with the
 * Bootsrap version in the future.
 * http://openzui.com
 * ======================================================================== */


+ function($) {
    'use strict';

    // ALERT CLASS DEFINITION
    // ======================

    var dismiss = '[data-dismiss="alert"]'
    var zuiname = 'zui.alert';

    var Alert = function(el) {
        $(el).on('click', dismiss, this.close)
    }

    Alert.prototype.close = function(e) {
        var $this = $(this)
        var selector = $this.attr('data-target')

        if(!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        var $parent = $(selector)

        if(e) e.preventDefault()

        if(!$parent.length) {
            $parent = $this.hasClass('alert') ? $this : $this.parent()
        }

        $parent.trigger(e = $.Event('close.' + zuiname))

        if(e.isDefaultPrevented()) return

        $parent.removeClass('in')

        function removeElement() {
            $parent.trigger('closed.' + zuiname).remove()
        }

        $.support.transition && $parent.hasClass('fade') ?
            $parent
            .one($.support.transition.end, removeElement)
            .emulateTransitionEnd(150) :
            removeElement()
    }


    // ALERT PLUGIN DEFINITION
    // =======================

    var old = $.fn.alert

    $.fn.alert = function(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data(zuiname)

            if(!data) $this.data(zuiname, (data = new Alert(this)))
            if(typeof option == 'string') data[option].call($this)
        })
    }

    $.fn.alert.Constructor = Alert


    // ALERT NO CONFLICT
    // =================

    $.fn.alert.noConflict = function() {
        $.fn.alert = old
        return this
    }


    // ALERT DATA-API
    // ==============

    $(document).on('click.' + zuiname + '.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);

// 匿名函数
// $ 形参 是为了不与其他库冲突
// 实参用jQuery
// 其实就等于
// var fn = function($){....};
// fn(jQuery);
/* ========================================================================
 * ZUI: button.js
 * http://openzui.com
 * ========================================================================
 * Copyright (c) 2014-2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */
+ function ($) {
    'use strict';
    // BUTTON PUBLIC CLASS DEFINITION
    var Button = function (element, options) {
        this.$element = $(element)
        this.options = $.extend({}, Button.DEFAULTS, options)//向目标对象合并新对象
        this.isLoading = false
    }

    Button.DEFAULTS={
        loadingText:'loading...'
    }
    //给对象设置属性或方法
    //按钮状态设置加载中...
    Button.prototype.setState=function(state){
        var d='disabled'
        var $el=this.$element
        var val=$el.is('input')?'val':'html'//判断当前元素的值
        var data=$el.data()//存取当前节点的数据

        state=state+'Text'

        if(!data.resetText) $el.data('resetText',$el[val]())//获取当前节点的显示值

        $el[val](data[state] || this.options[state])

        setTimeout((function(){
            if(state=='loadingText'){
                this.isLoading=true
                $el.addClass(d).attr(d,d)
            }else if(this.isLoading){
                this.isLoading=false
                $el.removeClass(d).removeAttr(d)
            }
        }).bind(this), 0)
    }
    //按钮活动状态切换
    Button.prototype.toggle=function(){
        var changed=true
        var $parent=this.$element.closest('[data-toggle="buttons"]')
        if($parent.length){
            var $input=this.$element.find('input')
            if($input.prop('type')=='radio'){
                if($input.prop('checked') && this.$element.hasClass('active')) changed=false
                else $parent.find('.active').removeClass('active')
            }
            if(changed) $input.prop('checked',!this.$element.hasClass('active')).trigger('change')
        }
        if(changed) this.$element.toggleClass('active')
    }
    // BUTTON PLUGIN DEFINITION
    var old=$.fn.Button
    //调用内部方法入口，传参数option
    $.fn.button=function(option){
        return this.each(function(){
            var $this=$(this)
            var data=$this.data('zui.button')
            var options=typeof option=='object' && option
            if(!data) $this.data('zui.button',(data=new Button(this,options)))
            if(option=='toggle') data.toggle()
            else if(option) data.setState(option)
        })
    }

    $.fn.button.Constructor=Button
    // BUTTON NO CONFLICT
    //调用原始按钮
    $.fn.button.noConflict=function(){
        $.fn.button=old
        return this
    }
    // BUTTON DATA-API
    $(document).on('click.zui.button.data-api','[data-toggle^=button]',function(e){
        var $btn=$(e.target)
        if(!$btn.hasClass('btn')) $btn=$btn.closest('.btn')
        $btn.button('toggle')
        e.preventDefault()
    })
}(jQuery);
/*!
 * XUI: Generated from less code - v1.9.2 - 2021-07-28
 * http://openzui.com
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2021 cnezsoft.com; Licensed MIT
 */

// (function($) {
//     'use strict';
//     var nextColorIndex = 0;
//     var presetColors = ['primary', 'red', 'yellow', 'green', 'blue', 'purple', 'brown', 'dark'];

//     var colorset = {
//         primary: '#3280fc',
//         secondary: '#145ccd',
//         pale: '#ebf2f9',
//         fore: '#353535',
//         back: '#fff',
//         grayDarker: '#222222',
//         grayDark: '#333333',
//         gray: '#808080',
//         grayLight: '#dddddd',
//         grayLighter: '#e5e5e5',
//         grayPale: '#f1f1f1',
//         white: '#fff',
//         black: '#000',
//         red: '#ea644a',
//         yellow: '#f1a325',
//         green: '#38b03f',
//         blue: '#03b8cf',
//         purple: '#8666b8',
//         brown: '#bd7b46',
//         greenPale: '#ddf4df',
//         yellowPale: '#fff0d5',
//         redPale: '#ffe5e0',
//         bluePale: '#ddf3f5',
//         brownPale: '#f7ebe1',
//         purplePale: '#f5eeff',
//         light: '#fff',
//         dark: '#353535',
//         success: '#38b03f',
//         warning: '#f1a325',
//         danger: '#ea644a',
//         info: '#03b8cf',
//         important: '#bd7b46',
//         special: '#8666b8',
//         successPale: '#ddf4df',
//         warningPale: '#fff0d5',
//         dangerPale: '#ffe5e0',
//         infoPale: '#ddf3f5',
//         importantPale: '#f7ebe1',
//         specialPale: '#f5eeff'
//     };

//     colorset.get = function(colorName) {
//         if(typeof colorName === 'undefined' || colorName === 'random') {
//             colorName = presetColors[(nextColorIndex++) % presetColors.length];
//         }
//         var color = colorset[colorName] ? colorset[colorName] : colorName;
//         return $.zui.Color ? new $.zui.Color(color) : color;
//     }

//     $.zui({colorset: colorset});
//     if($.zui.Color) $.extend($.zui.Color, colorset);
// }(jQuery));

/* ========================================================================
 * ZUI: jquery.extensions.js
 * http://openzui.com
 * ========================================================================
 * Copyright (c) 2014-2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($, window, undefined) {
    'use strict';

    /* Check jquery */
    if(typeof($) === 'undefined') throw new Error('ZUI requires jQuery');

    /* ZUI shared object */
    if(!$.zui) $.zui = function(obj) {
        if($.isPlainObject(obj)) {
            $.extend($.zui, obj);
        }
    };

    var MOUSE_BUTTON_CODES = {
        all: -1,
        left: 0,
        middle: 1,
        right: 2
    };

    var lastUuidAmend = 0;
    $.zui({
        uuid: function(asNumber) {
            var uuidNumber = (Date.now() - 1580890015292) * 10e4 + Math.floor(Math.random() * 10e3) * 10 + (lastUuidAmend++) % 10;
            return asNumber ? uuidNumber : uuidNumber.toString(36);
        },

        callEvent: function(func, event, proxy) {
            if(typeof func === 'function') {
                if(proxy !== undefined) {
                    func = func.bind(proxy);
                }
                var result = func(event);
                if(event) event.result = result;
                return !(result !== undefined && (!result));
            }
            return 1;
        },

        strCode: function(str) {
            var code = 0;
            if (typeof str !== 'string') str = String(str);
            if(str && str.length) {
                for(var i = 0; i < str.length; ++i) {
                    code += i * str.charCodeAt(i);
                }
            }
            return code;
        },

        getMouseButtonCode: function(mouseButton) {
            if(typeof mouseButton !== 'number') {
                mouseButton = MOUSE_BUTTON_CODES[mouseButton];
            }
            if(mouseButton === undefined || mouseButton === null) mouseButton = -1;
            return mouseButton;
        },

        /**
         * default language name
         * @type {string}
         */
        defaultLang: 'en',

        /**
         * Get client language name
         * @return {string}
         */
        clientLang: function() {
            var lang;
            var config = window.config;
            if(typeof(config) != 'undefined' && config.clientLang) {
                lang = config.clientLang;
            }
            if(!lang) {
                var hl = $('html').attr('lang');
                lang = hl ? hl : (navigator.userLanguage || navigator.userLanguage || $.zui.defaultLang);
            }
            return lang.replace('-', '_').toLowerCase();
        },

        /**
         * @type {object}
         * @example
         * {
         *      'zui.pager': {
         *          'zh-cn': {
         *              prev: '上一页',
         *          }
         *      }
         * }
         */
        langDataMap: {},

        /**
         * Add lang data for components
         * @param {string} [langName]
         * @param {string} [componentName]
         * @param {object} data
         * @example
         * // Add lang data to specify language and specify component
         * $.zui.addLangData('zh-cn', 'zui.pager', {
         *      prev: '上一页',
         *      next: '下一页',
         * });
         *
         * // Add lang data to specify language and multiple components
         * $.zui.addLangData('zh-cn', {
         *      'zui.pager': {
         *          prev: '上一页',
         *          next: '下一页',
         *      },
         *      'chosen': {
         *      }
         * });
         *
         * // Add lang data to multiple languages and multiple components
         * $.zui.addLangData({
         *      'zh-cn': {
         *          'zui.pager': {
         *              prev: '上一页',
         *              next: '下一页',
         *          },
         *          'chosen': {
         *          }
         *      },
         *      'zh-tw': {
         *          'zui.pager': {
         *              prev: '上一页',
         *              next: '下一页',
         *          }
         *      }
         * });
         */
        addLangData: function(langName, componentName, data) {
            var langData = {};
            if (data && componentName && langName) {
                langData[componentName] = {};
                langData[componentName][langName] = data;
            } else if (langName && componentName && !data) {
                data = componentName;
                $.each(data, function(comName) {
                    langData[comName] = {};
                    langData[comName][langName] = data[comName];
                });
            } else if (langName && !componentName && !data) {
                $.each(data, function(theLangName) {
                    var comsData = data[theLangName];
                    $.each(comsData, function(comName) {
                        if (!langData[comName]) {
                            langData[comName] = {};
                        }
                        langData[comName][theLangName] = comsData[comName];
                    });
                });
            }
            $.extend(true, $.zui.langDataMap, langData);
        },

        /**
         * Get lang data
         * @example
         * $.zui.getLangData('zui.pager');
         *
         * $.zui.getLangData('zui.pager', 'zh-cn');
         *
         * $.zui.getLangData('zui.pager', 'zh-cn', {
         *      prev: '上一页',
         *      next: '下一页',
         * });
         */
        getLangData: function(componentName, langName, initialData) {
            if (!arguments.length) {
                return $.extend({}, $.zui.langDataMap);
            }
            if (arguments.length === 1) {
                return $.extend({}, $.zui.langDataMap[componentName]);
            }
            if (arguments.length === 2) {
                var comData = $.zui.langDataMap[componentName];
                if (comData) {
                    return langName ? comData[langName] : comData;
                }
                return {};
            }
            if (arguments.length === 3) {
                langName = langName || $.zui.clientLang();
                var comData = $.zui.langDataMap[componentName];
                var langData = comData ? comData[langName] : {};
                return $.extend(true, {}, initialData[langName] || initialData.en || initialData.zh_cn, langData);
            }
            return null;
        },

        lang: function() {
            if (arguments.length && $.isPlainObject(arguments[arguments.length - 1])) {
                return $.zui.addLangData.apply(null, arguments);
            }
            return $.zui.getLangData.apply(null, arguments);
        },

        _scrollbarWidth: 0,
        checkBodyScrollbar: function() {
            if(document.body.clientWidth >= window.innerWidth) return 0;
            if(!$.zui._scrollbarWidth) {
                var scrollDiv = document.createElement('div');
                scrollDiv.className = 'scrollbar-measure';
                document.body.appendChild(scrollDiv);
                $.zui._scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                document.body.removeChild(scrollDiv);
            }
            return $.zui._scrollbarWidth;
        },
        fixBodyScrollbar: function() {
            if($.zui.checkBodyScrollbar()) {
                var $body = $('body');
                var bodyPad = parseInt(($body.css('padding-right') || 0), 10);
                if($.zui._scrollbarWidth) {
                    $body.css({paddingRight: bodyPad + $.zui._scrollbarWidth, overflowY: 'hidden'});
                }
                return true;
            }
        },
        resetBodyScrollbar: function() {
            $('body').css({paddingRight: '', overflowY: ''});
        },
    });

    $.fn.callEvent = function(name, event, model) {
        var $this = $(this);
        var dotIndex = name.indexOf('.zui.');
        var shortName = dotIndex < 0 ? name : name.substring(0, dotIndex);
        var e = $.Event(shortName, event);

        if((model === undefined) && dotIndex > 0) {
            model = $this.data(name.substring(dotIndex + 1));
        }

        if(model && model.options) {
            var func = model.options[shortName];
            if(typeof func === 'function') {
                e.result = $.zui.callEvent(func, e, model);
            }
        }
        $this.trigger(e);
        return e;
    };

    $.fn.callComEvent = function(component, eventName, params) {
        if (params !== undefined && !Array.isArray(params)) {
            params = [params];
        }
        var $this = this;
        var result;
        $this.trigger(eventName, params);

        var eventCallback = component.options[eventName];
        if (eventCallback) {
            result = eventCallback.apply(component, params);
        }
        return result;
    };
}(jQuery, window, undefined));

/* ========================================================================
 * ZUI: pager.js
 * http://openzui.com
 * ========================================================================
 * Copyright (c) 2017-2019 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($, undefined) {
    'use strict';

    var NAME = 'zui.pager'; // model name

    var DEFAULT_PAGER = {
        page: 1,        // current page index
        recTotal: 0,    // records total count
        recPerPage: 10, // records count per page
    };

    var LANG = {
        zh_cn: {
            pageOfText: '第 {0} 页',
            prev: '上一页',
            next: '下一页',
            first: '第一页',
            last: '最后一页',
            goto: '跳转',
            pageOf: '第 <strong>{page}</strong> 页',
            totalPage: '共 <strong>{totalPage}</strong> 页',
            totalCount: '共 <strong>{recTotal}</strong> 项',
            pageSize: '每页 <strong>{recPerPage}</strong> 项',
            itemsRange: '第 <strong>{start}</strong> ~ <strong>{end}</strong> 项',
            pageOfTotal: '第 <strong>{page}</strong>/<strong>{totalPage}</strong> 页'
        },
        zh_tw: {
            pageOfText: '第 {0} 頁',
            prev: '上一頁',
            next: '下一頁',
            first: '第一頁',
            last: '最後一頁',
            goto: '跳轉',
            pageOf: '第 <strong>{page}</strong> 頁',
            totalPage: '共 <strong>{totalPage}</strong> 頁',
            totalCount: '共 <strong>{recTotal}</strong> 項',
            pageSize: '每頁 <strong>{recPerPage}</strong> 項',
            itemsRange: '第 <strong>{start}</strong> ~ <strong>{end}</strong> 項',
            pageOfTotal: '第 <strong>{page}</strong>/<strong>{totalPage}</strong> 頁'
        },
        en: {
            pageOfText: 'Page {0}',
            prev: 'Prev',
            next: 'Next',
            first: 'First',
            last: 'Last',
            goto: 'Goto',
            pageOf: 'Page <strong>{page}</strong>',
            totalPage: '<strong>{totalPage}</strong> pages',
            totalCount: 'Total: <strong>{recTotal}</strong> items',
            pageSize: '<strong>{recPerPage}</strong> per page',
            itemsRange: 'From <strong>{start}</strong> to <strong>{end}</strong>',
            pageOfTotal: 'Page <strong>{page}</strong> of <strong>{totalPage}</strong>'
        }
    };

    // The pager model class
    var Pager = function(element, options) {
        var that = this;
        that.name = NAME;
        that.$ = $(element);

        options = that.options = $.extend({}, Pager.DEFAULTS, this.$.data(), options);

        that.langName = options.lang || $.zui.clientLang();
        that.lang     = $.zui.getLangData(NAME, that.langName, LANG);

        that.state = {};

        that.set(options.page, options.recTotal, options.recPerPage, true);

        that.$.on('click', '.pager-goto-btn', function() {
            var $goto = $(this).closest('.pager-goto');
            var page = parseInt($goto.find('.pager-goto-input').val());
            if (page !== NaN) {
                that.set(page);
            }
        }).on('click', '.pager-item', function() {
            var page = $(this).data('page');
            if (typeof page === 'number' && page > 0) {
                that.set(page);
            }
        }).on('click', '.pager-size-menu [data-size]', function() {
            var size = $(this).data('size');
            if (typeof size === 'number' && size > 0) {
                that.set(-1, -1, size);
            }
        });
    };

    Pager.prototype.set = function(page, recTotal, recPerPage, notTiggerChange) {
        var that = this;
        if (typeof page === 'object' && page !== null) {
            recPerPage = page.recPerPage;
            recTotal = page.recTotal;
            page = page.page;
        }
        var state = that.state;
        if (!state) {
            state = $.extend({}, DEFAULT_PAGER);
        }
        var oldState = $.extend({}, state);
        if (typeof recPerPage === 'number' && recPerPage > 0) {
            state.recPerPage = recPerPage;
        }
        if (typeof recTotal === 'number' && recTotal >= 0) {
            state.recTotal = recTotal;
        }
        if (typeof page === 'number' && page >= 0) {
            state.page = page;
        }
        state.totalPage = (state.recTotal && state.recPerPage) ? (Math.ceil(state.recTotal / state.recPerPage)) : 1;
        state.page = Math.max(0, Math.min(state.page, state.totalPage));
        // stateRecCount is items count in current page
        state.pageRecCount = state.recTotal;
        if (state.page && state.recTotal) {
            if (state.page < state.totalPage) {
                state.pageRecCount = state.recPerPage;
            } else if (state.page > 1) {
                state.pageRecCount = state.recTotal - (state.recPerPage * (state.page - 1));
            }
        }
        state.skip  = state.page > 1 ? ((state.page - 1) * state.recPerPage) : 0;
        state.start = state.skip + 1;
        state.end   = state.skip + state.pageRecCount;
        state.prev  = state.page > 1 ? (state.page - 1) : 0;
        state.next  = state.page < state.totalPage ? (state.page + 1) : 0;
        that.state  = state;
        if (!notTiggerChange && (oldState.page !== state.page || oldState.recTotal !== state.recTotal || oldState.recPerPage !== state.recPerPage)) {
            that.$.callComEvent(that, 'onPageChange', [state, oldState]);
        }
        return that.render();
    };

    Pager.prototype.createLinkItem = function(page, text, asAElement) {
        var that = this;
        if (text === undefined) {
            text = page;
        }
        var $ele = $('<a title="' + that.lang.pageOfText.format(page) + '" class="pager-item" data-page="' + page + '"/>').attr('href', page ? that.createLink(page, that.state) : '###').html(text);
        if (!asAElement) {
            $ele = $('<li />').append($ele).toggleClass('active', page === that.state.page).toggleClass('disabled', !page || page === that.state.page);
        }
        return $ele;
    };

    Pager.prototype.createNavItems = function(maxCount) {
        var that = this;
        var $nav = that.$;
        var pager = that.state;
        var totalPage = pager.totalPage;
        var page = pager.page;
        var appendItem = function(p, to) {
            if(p === false) {
                $nav.append(that.createLinkItem(0, to || that.options.navEllipsisItem));
                return;
            }
            if(to === undefined) to = p;
            for(var i = p; i <= to; ++i) {
                $nav.append(that.createLinkItem(i));
            }
        };
        if (maxCount === undefined) {
            maxCount = that.options.maxNavCount || 10;
        }
        appendItem(1);
        if(totalPage > 1) {
            if(totalPage <= maxCount) {
                appendItem(2, totalPage);
            }
            else if(page < (maxCount - 2)) {
                appendItem(2, maxCount - 2);
                appendItem(false);
                appendItem(totalPage);
            }
            else if(page > (totalPage - maxCount + 2)) {
                appendItem(false);
                appendItem((totalPage - maxCount + 2), totalPage);
            }
            else {
                appendItem(false);
                appendItem(page - Math.ceil((maxCount-4)/2), page + Math.floor((maxCount-4)/2));
                appendItem(false);
                appendItem(totalPage);
            }
        }
    };

    Pager.prototype.createGoto = function() {
        var that = this;
        var pager = this.state;
        var $goto = $('<div class="input-group pager-goto" style="width: ' + (35 + (pager.page + '').length * 9 + 25 + that.lang.goto.length*12) + 'px"><input value="' + pager.page + '" type="number" min="1" max="' + pager.totalPage + '" placeholder="' + pager.page + '" class="form-control pager-goto-input"><span class="input-group-btn"><button class="btn pager-goto-btn" type="button">' + that.lang.goto + '</button></span></div>');
        return $goto;
    };

    Pager.prototype.createSizeMenu = function() {
        var that = this;
        var pager = this.state;
        var $menu = $('<ul class="dropdown-menu"></ul>');
        var options = that.options.pageSizeOptions;
        if (typeof options === 'string') {
            options = options.split(',');
        }
        for (var i = 0; i < options.length; ++i) {
            var size = options[i];
            if (typeof size === 'string') {
                size = parseInt(size);
            }
            var $li = $('<li><a href="###" data-size="' + size + '">' + size + '</a></li>').toggleClass('active', size === pager.recPerPage);
            $menu.append($li);
        }
        return $('<div class="btn-group pager-size-menu"><button type="button" class="btn dropdown-toggle" data-toggle="dropdown">' + that.lang.pageSize.format(pager) + ' <span class="caret"></span></button></div>').addClass(that.options.menuDirection).append($menu);
    };

    Pager.prototype.createElement = function(element, $pager, pager) {
        var that = this;
        var createLinkItem= that.createLinkItem.bind(that);
        var lang = that.lang;
        switch (element) {
            case 'prev':
                return createLinkItem(pager.prev, lang.prev);
            case 'prev_icon':
                return createLinkItem(pager.prev, '<i class="icon ' + that.options.prevIcon + '"></i>');
            case 'next':
                return createLinkItem(pager.next, lang.next);
            case 'next_icon':
                return createLinkItem(pager.next, '<i class="icon ' + that.options.nextIcon + '"></i>');
            case 'first':
                return createLinkItem(1, lang.first);
            case 'first_icon':
                return createLinkItem(1, '<i class="icon ' + that.options.firstIcon + '"></i>');
            case 'last':
                return createLinkItem(pager.totalPage, lang.last);
            case 'last_icon':
                return createLinkItem(pager.totalPage, '<i class="icon ' + that.options.lastIcon + '"></i>');
            case 'space':
            case '|':
                return $('<li class="space" />');
            case 'nav':
            case 'pages':
                that.createNavItems();
                return;
            case 'total_text':
                return $(('<div class="pager-label">' + lang.totalCount + '</div>').format(pager));
            case 'page_text':
                return $(('<div class="pager-label">' + lang.pageOf + '</div>').format(pager));
            case 'total_page_text':
                return $(('<div class="pager-label">' + lang.totalPage + '</div>').format(pager));
            case 'page_of_total_text':
                return $(('<div class="pager-label">' + lang.pageOfTotal + '</div>').format(pager));
            case 'page_size_text':
                return $(('<div class="pager-label">' + lang.pageSize + '</div>').format(pager));
            case 'items_range_text':
                return $(('<div class="pager-label">' + lang.itemsRange + '</div>').format(pager));
            case 'goto':
                return that.createGoto();
            case 'size_menu':
                return that.createSizeMenu();
            default:
                return $('<li/>').html(element.format(pager));
        }
    };

    Pager.prototype.createLink = function(page, pager) {
        if (page === undefined) {
            page = this.state.page;
        }
        if (pager === undefined) {
            pager = this.state;
        }
        var linkCreator = this.options.linkCreator;
        if (typeof linkCreator === 'string') {
            return linkCreator.format($.extend({}, pager, {page: page}));
        } else if (typeof linkCreator === 'function') {
            return linkCreator(page, pager);
        }
        return '#page=' + page;
    };

    Pager.prototype.render = function(elements) {
        var that = this;
        var state = that.state;
        var createElement = that.options.elementCreator || that.createElement;
        var isMapperCreator = $.isPlainObject(createElement);

        elements = elements || that.elements || that.options.elements;
        if (typeof elements == 'string') {
            elements = elements.split(',');
        }
        that.elements = elements;

        that.$.empty();

        for(var i = 0; i < elements.length; ++i) {
            var element  = $.trim(elements[i]);
            var creator = isMapperCreator ? (createElement[element] || createElement) : createElement;
            var $element = creator.call(that, element, that.$, state);
            if ($element === false) {
                $element = that.createElement(element, that.$, state);
            }
            if ($element instanceof $) {
                if ($element[0].tagName !== 'LI') {
                    $element = $('<li/>').append($element);
                }
                that.$.append($element);
            }
        }

        // Fix page item border
        var $lastItem = null;
        that.$.children('li').each(function() {
            var $li = $(this);
            var isItem = !!$li.children('.pager-item').length;
            if ($lastItem) {
                $lastItem.toggleClass('pager-item-right', !isItem);
            } else {
                if (isItem) {
                    $li.addClass('pager-item-left');
                }
            }
            $lastItem = isItem ? $li : null;
        });
        if ($lastItem) {
            $lastItem.addClass('pager-item-right');
        }

        that.$.callComEvent(that, 'onRender', [state]);
        return that;
    };

    // default options
    Pager.DEFAULTS = $.extend({
        elements: ['first_icon', 'prev_icon', 'pages', 'next_icon', 'last_icon', 'page_of_total_text', 'items_range_text', 'total_text'],
        prevIcon: 'icon-double-angle-left',
        nextIcon: 'icon-double-angle-right',
        firstIcon: 'icon-step-backward',
        lastIcon: 'icon-step-forward',
        navEllipsisItem: '<i class="icon icon-ellipsis-h"></i>',
        maxNavCount: 10,
        menuDirection: 'dropdown', // or dropup
        pageSizeOptions: [10, 20, 30, 50, 100],
        // onPageChange: null
    }, DEFAULT_PAGER);

    // Extense jquery element
    $.fn.pager = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data(NAME);
            var options = typeof option == 'object' && option;

            if(!data) $this.data(NAME, (data = new Pager(this, options)));

            if(typeof option == 'string') data[option]();
        });
    };

    Pager.NAME = NAME;
    Pager.LANG = LANG;

    $.fn.pager.Constructor = Pager;

    // Auto call pager after document load complete
    $(function() {
        $('[data-ride="pager"]').pager();
    });
}(jQuery, undefined));

/* ========================================================================
 * ZUI: zui.migrate.1.2.js
 * This file inclues some helper methods to help upgrad version 1.2 or
 * lower to version 1.3
 * If you are using 1.3+, then ignore this.
 * http://openzui.com
 * ========================================================================
 * Copyright 2014-2020 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($, window) {
    var zui = $.zui;
    if(zui) {
        function extendTo(name, target) {
            if(Array.isArray(name)) {
                $.each(name, function(i, n) {
                    extendTo(n, target);
                });
                return;
            }

            var config = {};
            config[name] = zui[name];

            if(target) {
                $.extend(target, config);
            } else {
                $.extend(config);
            }
        }

        extendTo(['uuid', 'callEvent', 'clientLang', 'browser', 'messager', 'Messager', 'showMessager', 'closeModal', 'ajustModalPosition', 'ModalTrigger', 'modalTrigger', 'store']);
        extendTo(['Color', 'imgReady', 'messager', 'Messager', 'showMessager', 'closeModal', 'ajustModalPosition', 'ModalTrigger', 'modalTrigger', 'store'], window);
    }
}(jQuery, window));
