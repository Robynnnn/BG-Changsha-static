/*
 * @Author: Robyn 
 * @Date: 2018-01-20 16:19:47 
 * @Last Modified by: Robyn
 * @Last Modified time: 2018-01-24 09:28:36
 */


// //  函数封装
;
(function ($) {

  // Birthday-----时间函数
  $.fn.timer = function () {
    var date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      CurrentTime, timer, timerVal;
    month = month < 10 ? month = "0" + month : month;
    CurrentTime = year + "-" + month + "-" + day;
    timer = document.getElementById("timer");
    timerVal = $("#timer").val();
    timer.value = CurrentTime;
  };


})(jQuery);
// 函数封装结束


// 入口函数
$(function () {

  // 左侧点击展示对应右边区域
  $(".infoSelect").on("click", "li", function () {
    var index = $(this).index();
    $(this).addClass("selected").siblings().removeClass("selected");
    $(".exhibition>li").eq(index).addClass("current").siblings().removeClass("current");
  });

  // 分页按钮效果
  $(".num").click(function () {
    $(this).addClass("currentPage").siblings().removeClass("currentPage");
  });

  // my product 判断是否有注册产品，如果没有，展示没有产品的区域
  if ($(".pub").length == 1 || $(".pub").length == 0) {
    $(".pub").hide();
    $(".pagination").hide();
    $(".noPro").show();
  }

  // my Wishlist 
  // 删除wishlist列表里面的商品
  $(".wishlistDetail").on("click", ".del", function () {
    $(this).parents(".wishDel").remove();
  });
  // my Wishlist end

  // my profile && changePwd start

  // my profile && changePwd turn 
  $(".tit").on("click", "li", function () {

    var index = $(this).index();

    $(this).find("span").addClass("colorD533").parent().siblings().find("span").removeClass("colorD533");

    $(".content li").eq(index).addClass("current").siblings().removeClass("current");

  });

  // Birthday timer
  $("#timer").timer();

  // 国家选择
  $('.countrySel').searchableSelect();

  // preference 选择
  $(".category").on("click", ".cateBtn", function () {
    $(this).toggleClass("categorySel");
  });
  // my profile && changePwd end


  // message

  //全选/全不选 按钮的点击效果
  $('#checkAll').click(function () {
    //获取当前的选中状态
    var current = $(this).prop('checked');
    //把前面的状态也设置到下面三个复选框里
    $('.check').prop('checked', current);
  });


  $('.check').click(function () {
    var flag = true;
    //全部都选中的时候，上面的按钮才被选中
    for (var i = 0; i < $('.check').length; i++) {
      //遍历的时候，如果其中一个没选中，那么就flag就为假,上面的就不选中，通过break退出循环
      if ($('.check').eq(i).prop('checked') == false) {
        flag = false;
        break;
      }
    }
    $('#checkAll').prop('checked', flag);
  });

  // 删除按钮
  $(".click-for-del").on("click", "tr i", function () {

    // 删除全部的按钮
    if ($(this).hasClass("delAll")) {
      // 弹出遮罩
      $(".popAlert").show();

      var count = 0;
      // 循环累计,通过累计判断是否有选中任何一个选项
      for (var i = 0; i < $('.check').length; i++) {
        if ($('.check').eq(i).prop('checked') == true) {
          count++;
        }
      }

      if (count == 0) {
        // 当count为0,代表全部没有选中,取消和yes按钮隐藏,文字变动
        $(".popAlert p").html("Sorry,You haven't checked any options yet.");
        $(".noRequest").hide();
        $(".yesRequest").hide();
        $(".confirmBtn").show();

        $(".confirmBtn").click(function () {
          $(".popAlert").hide();
          // 文字复原,按钮复原,隐藏确认按钮
          $(".popAlert p").html("Are you want to delete?");
          $(".confirmBtn").hide();
          $(".noRequest").show();
          $(".yesRequest").show();
        });
      } else {
        // 点击确定按钮的时候删除所选项
        $(".yesRequest").click(function () {
          $(".popAlert").hide();
          $('input[name="del"]:checked').each(function () {
            _index = $(this).parents("tr").index(); //获取checkbox所在行的顺序
            $("table.click-for-del").find("tr:eq(" + _index + ")").remove();
          });



        });
      }
      // 移出选择全部的状态
      $('#checkAll').removeAttr("checked");
    } else {
      // 点击单个删除btn操作
      $(".popAlert").show();
      _this = $(this);
      // 点击确定按钮
      $(".yesRequest").click(function () {
        $(".popAlert").hide();
        $(_this).parents("tr").remove();
      });
    }
  });

  // 点击取消按钮操作返回
  $(".noRequest").click(function () {
    $(".popAlert").hide();
  });

  // 弹出框之后点击灰色区域隐藏
  $(".popgray").click(function () {
    $(".popAlert").hide();
  });


  // message end


  // User Center 

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

  // User Center end



  // 入口函数结束
});