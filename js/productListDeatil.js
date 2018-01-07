/*
 * @Author: Robyn 
 * @Date: 2017-12-26 16:38:19 
 * @Last Modified by: Robyn
 * @Last Modified time: 2018-01-07 21:05:40
 */

// 函数封装
; (function ($) {
  // 小图换大图
  $.fn.turnBig = function (imgID, ulClass, aLink) {
    var img = document.getElementById(imgID);
    var ul = document.getElementById(ulClass);
    var links = ul.getElementsByTagName(aLink);
    for (var i = 0; i < links.length; i++) {
      links[i].onclick = turn; // 节省内存空间
    }
    function turn() {
      img.src = this.href;
      $(this).parent().addClass('selected').siblings().removeClass('selected');
      return false;
    }
  };

  // 实现li点击之后获取红色边框
  $.fn.borderRed = function (ulClass) {
    $(ulClass).on("click", "li", function () {
      $(this).addClass("borderSpec").siblings().removeClass('borderSpec');
    });
  };

  $.fn.readMoreBtn = function () {
    var pHeight = $(".down p").height();
    pHeight >= 48 ?  $(".readMore").css({"display":"block"}) : $(".readMore").css({"display":"none"});
  $(".readMore").click(function () {
    $(".down p").removeClass("mui-ellipsis-3");
    $(".hideBtn").css({"display":"block"});
    $(".readMore").css({"display":"none"});
    });
  
    $(".hideBtn").click(function () {
      $(".down p").addClass("mui-ellipsis-3");
      $(".hideBtn").css({"display":"none"});
      $(".readMore").css({"display":"block"});      
      });
    };
})(jQuery);


$(function () {

  // 小图切换大图的应用
  $('.leftSell').turnBig("img", "imageGallery", "a");
  $('.typeColor').turnBig("img", "typeColor", "a");

  // 实现li点击之后获取红色边框应用
  $(".typeList").borderRed(".typeList");
  $(".countryList").borderRed(".countryList");

  // 获得/失去 红心
  $(".likeIt").click(function () {
    $(".likeIt").toggleClass("wish_press");
  });

  // 鼠标点击切换到对应区域
  $('.middleShowTit').click(function () {
    $(this).addClass('currentShow').siblings().removeClass('currentShow');
    var index = $(this).index();
    $('.currentShowArea .mainContent').eq(index).addClass('currentSelected').siblings().removeClass('currentSelected');
  });

  $(".review").click(function () {
    $("html, body").animate({
      scrollTop: $("#review").offset().top
    }, { duration: 500, easing: "swing" });
    return false;
  });

  $(".related").click(function () {
    $("html, body").animate({
      scrollTop: $("#related").offset().top
    }, { duration: 500, easing: "swing" });
    return false;
  });

  // 点击加载全部文字
  $(".down p").readMoreBtn();

  // 评论区域点击小图变大图
  $("#revSmImg").on("click","li",function () {
    var index = $(this).index();
    // console.log(index);
    $(".revbigImgArea").css({"display":"block"});
    $(".revbigImg li").eq(index).show().siblings().hide();

    // 左右按钮
    $(".leftBtn").click(function () {
      var liLength = $(".revbigImg li").length;
      if (index == 0) {
        index = liLength;
      };
      console.log(index);
      $(".revbigImg li").eq(index - 1).show().siblings().hide();
      index--;
    });
    // end
    // 左右按钮
    $(".rightBtn").click(function () {
      var liLength = $(".revbigImg li").length;
      // console.log(ulList);
      console.log(index);
      if (index == liLength - 1) {
        index = -1;
      };
      $(".revbigImg li").eq(index + 1).show().siblings().hide();
      index++;
    });
    // end
  });
// 关闭窗口
$(".closeBtn").click(function () {
  $(".revbigImgArea").css({"display":"none"});
  });

});