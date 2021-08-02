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