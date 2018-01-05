$(function(){
    document.body.addEventListener('touchstart', function () {});

    //滚动改变导航颜色
    $(window).scroll(function(){
        var $header = $('.header_box');
        const _height = $(this).scrollTop();
        const headerType = HeaderType($header);

        if(_height >= 300){
            headerType === 'index'? $header.css('backgroundColor', 'rgba(0, 0, 0, .8)'): $header.css('backgroundColor', 'rgba(255, 255, 255, .8)');
            return false
        }

        headerType === 'index'? $header.css('backgroundColor', 'rgba(0, 0, 0, 1)'): $header.css('backgroundColor', 'rgba(255, 255, 255, 1)');
    });


    const window_width = $(window).width();

    if(window_width > 768) {
        //PC端

        //下拉菜单栏
        $(".header_box").slide({
            type:"menu",// 效果类型，针对菜单/导航而引入的参数（默认slide）
            titCell:".nLi", //鼠标触发对象
            targetCell:".menu_bg", //titCell里面包含的要显示/消失的对象
            effect:"slideDown", //targetCell下拉效果
            easing:"easeOutCirc",
            delayTime:300 , //效果时间
            // animationDuration:300,
            triggerTime:0, //鼠标延迟触发时间（默认150）
            defaultPlay:false,
            returnDefault:false //鼠标移走后返回默认状态，例如默认频道是“预告片”，鼠标移走后会返回“预告片”（默认false）
        });

        //判断是否需要加入arrow
        $('.nLi').hover(function(){
            const len = $(this).find('.menu_bg').length;
            len? $(this).addClass('arrow'): '';
            $(this).siblings().removeClass('arrow');
        },function(){
            $(this).removeClass('arrow');
        })
    }else {

        //m端
        $('.navbar_toggle').click(function () {
            $('.nav_bar').slideToggle();
        });

        //菜单栏点击
        $('.nLi  a').click(function(){
            //判断是否存在子菜单
            if($(this).parent().hasClass('menu_child')){
                //判断菜单层级
                if($(this).siblings('.menu_bg').length) {
                    //一级菜单
                    $(this).siblings('.menu_bg').slideToggle();
                }else{
                    $(this).parent().siblings('dd').slideToggle();
                }
                return false;
            }
            const url = $(this).attr('url');
            url? window.location.href = url : '';
        });

    }

    
});

function HeaderType(element) {
    if(element.hasClass('index_header')) {
        return 'index';
    }
    return 'other';
}