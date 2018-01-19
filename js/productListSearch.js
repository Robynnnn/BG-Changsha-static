/*
 * @Author: Robyn 
 * @Date: 2018-01-16 11:37:51 
 * @Last Modified by: Robyn
 * @Last Modified time: 2018-01-16 17:58:11
 */
$(function () {

    // 获取当前屏幕的宽度
    const window_width = $(window).width();

    if (window_width >= 1280) {
        // 搜索框实时监测内容

    $("#userInput").keyup(function () {
      if ($("#userInput").val().length) {
        $(".closeSerach").css({"display":"inline-block"});
      } else {
        $(".closeSerach").css({"display":"none"});
      }
      $(".val").html($(this).val());
     
      });

      $(".closeSerach").click(function () {
        $(this).hide();
        $("#userInput").val("");
        $(".val").html("");
        });

  // end
    }

      // 返回顶部按钮区域
      $(window).scroll(function () {
        //获取滚动出去的垂直距离
        var winTop = $(window).scrollTop();
        winTop >= $(window).height() ? $('#to-Top').show() : $('#to-Top').hide();
      });
    
      //点击返回顶部按钮，实现返回顶部效果
      $('#to-Top').click(function () {
        $('html,body').stop().animate({
          scrollTop: 0
        });
      });
      // 返回顶部按钮区域结束
      
      // 模拟选择框功能

  $(".select-header").click(function () {
    $(this).parent().siblings(".select-box").find(".select-content").slideUp("fast");
    if ($(this).siblings(".select-content").is(":hidden")) {
      $(this).siblings(".select-content").slideDown("fast");
      var evt = new Object;
      if (typeof (window.event) == "undefined") { //如果是火狐浏览器  
        evt = arguments.callee.caller.arguments[0];
      } else {
        evt = event || window.event;
      }
      evt.cancelBubble = true;
    } else {
      $(this).siblings(".select-content").slideUp("fast");
      //去除事件冒泡  
      var evt = new Object;
      if (typeof (window.event) == "undefined") { //如果是火狐浏览器  
        evt = arguments.callee.caller.arguments[0];
      } else {
        evt = event || window.event;
      }
      evt.cancelBubble = true;
    }
  });
  $(document).click(function () {
    $(".select-content").slideUp("fast");
  });
  $(".select-content li").on("click", function () {
    $(this).parent().siblings(".select-header").text($(this).text()).end().slideUp("fast");
  });

  // 模拟选择框功能结束



    // 小图对应大图
    $('.imgTab li img').click(function(){
      $(this).parent('li').parent('ul').prev('a').children('img').attr('src', $(this).attr('src'));
      $(this).parent("li").addClass('selected').siblings().removeClass('selected');
  });

  // 入口函数结束
  });