/*
 * @Author: Robyn 
 * @Date: 2017-12-25 19:10:33 
 * @Last Modified by: Robyn
 * @Last Modified time: 2017-12-26 12:26:25
 */
$(function () {

  //tab栏效果
  $('.tab-list').mouseover(function () {
    //选项卡的切换:排他思想
    $(this).addClass('active').siblings().removeClass('active');
    //tab内容切换：其实也是排他，不过他需要和选项卡有对应关系
    var index = $(this).index();
    $('.proT .productsShow').eq(index).addClass('selected').siblings().removeClass('selected');
  });


  //点击返回顶部按钮，实现返回顶部效果
  $('#to-Top').click(function () {
    $('html,body').stop().animate({
      scrollTop: 0
    });
  });


  // 模拟选择框功能

  $(".select-header").click(function(){  
    $(this).parent().siblings(".select-box").find(".select-content").slideUp("fast");  
    if($(this).siblings(".select-content").is(":hidden")){   
        $(this).siblings(".select-content").slideDown("fast");  
        var evt =  new Object;  
        if ( typeof(window.event) == "undefined" ){//如果是火狐浏览器  
            evt = arguments.callee.caller.arguments[0];  
        }else{  
            evt = event || window.event;  
        }  
        evt.cancelBubble = true;  
    }else{   
        $(this).siblings(".select-content").slideUp("fast");  
        //去除事件冒泡  
        var evt =  new Object;  
        if ( typeof(window.event) == "undefined" ){//如果是火狐浏览器  
            evt = arguments.callee.caller.arguments[0];  
        }else{  
            evt = event || window.event;  
        }  
        evt.cancelBubble = true;  
    }  
});  
$(document).click(function(){    
    $(".select-content").slideUp("fast");  
});  
$(".select-content li").on("click",function(){   
    $(this).parent().siblings(".select-header").text($(this).text()).end().slideUp("fast");  
});    

  // 模拟选择框功能


});