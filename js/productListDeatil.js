/*
 * @Author: Robyn 
 * @Date: 2017-12-26 16:38:19 
 * @Last Modified by: Robyn
 * @Last Modified time: 2018-01-11 14:03:54
 */

// 函数封装
;(function ($) {
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

  // 加载更多文字
  $.fn.readMore = function () {
    
    var desBoxLength = $('.desBox').length;
    for (var i = 0; i < desBoxLength; i++) {
      // 判断文字高度
      if ( $('.desBox').eq(i).height() >= 48) {
        $('.readMore').eq(i).css({"display":"block"});
      } else {
        $('.readMore').eq(i).css({"display":"none"});
        $('.hideBtn').eq(i).css({"display": "none"});
      }
    }
    // readMore按钮操作
    $('.readMore').click(function () {
      $(this).css({"display":"none"});
      $(this).siblings().removeClass('block-with-text').find('.hideBtn').css({"display":"inline-block"});
      });
  // hide按钮操作
    $(".hideBtn").click(function () {
      // console.log(11);
      $(this).css({"display":"none"});
      $(this).parent().addClass('block-with-text').siblings().css({"display":"block"});
      });

    // end
    };

  // 评论区图片功能
  $.fn.revFunction = function () {
    // start
    // 评论区域点击小图变大图
    $(".revImg").on("click", "li", function () {
      // 获取当前 li 的 eq
      var index = $(this).index(),
      // 获取对应大图区域
            par = $(this).parent().parent(),
      // 获取大图li的长度
       liLength = par.find(".revbigImg li").length,
      // 初始化旋转度数为0
         degNum = 0;
      // 相应的大图区域展示
      par.find(".greyArea").fadeIn(400);
      par.find(".revbigImgArea").fadeIn(400);
      par.find(".revbigImg li").eq(index).show().siblings().hide();
      // end
      // 左按钮
      $(".leftBtn").click(function () {

        if (index == 0) {
          index = liLength;
        }

        par.find(".revbigImg li").eq(index - 1).show().siblings().hide();

        index--;

      });
      // end

      // 右按钮
      $(".rightBtn").click(function () {


        if (index == liLength - 1) {
          index = -1;
        }

        par.find(".revbigImg li").eq(index + 1).show().siblings().hide();

        index++;

      });
      // end

      // 左旋转
      $(".leftRotate").click(function () {
        degNum = (degNum + 90)%360;
        // console.log(degNum);
        par.find(".revbigImg li").eq(index).find("img").css({
          "transform" : "translate(-50%,-50%) rotate("+(-degNum)+"deg)"
        });
        // if (degNum == 90 || degNum == 270) {
        //   par.find(".revbigImg li").eq(index).find("img").css({
        //     "width" : "568px",
        //     "height" : "496px"
        //   }) 

        // } else {
        //   par.find(".revbigImg li").eq(index).find("img").css({
        //     "width" : "468px",
        //     "height" : "670px"
        //   }) 
        // }
        });
      // testend

      // 右旋转
      $(".rightRotate").click(function () {
        degNum = (degNum + 90)%360;
        // console.log(degNum);
        par.find(".revbigImg li").eq(index).find("img").css({
          "transform" : "translate(-50%,-50%) rotate("+degNum+"deg)"
        });
        // if (degNum == 90 || degNum == 270) {
        //   par.find(".revbigImg li").eq(index).find("img").css({
        //     "width" : "568px",
        //     "height" : "396px"
        //   }) 

        // } else {
        //   par.find(".revbigImg li").eq(index).find("img").css({
        //     "width" : "468px",
        //     "height" : "670px"
        //   }) 
        // }
        });
      //end
    });

    // end
  };
})(jQuery);

// 入口函数
$(function () {

  // 小图左右按钮
    $(".smallImg .jCarouselLite").jCarouselLite({
      btnNext : ".smallImg .arrow-left",
      btnPrev : ".smallImg .arrow-right",
      visible : 5
    });
      
  // 小图切换大图的应用
  $('.leftSell').turnBig("img", "imageGallery", "a");
  $('.typeColor').turnBig("img", "typeColor", "a");

  // 用jq1.5版本的插件实现放大镜功能
  $15('.jqzoom').jqzoom({
    zoomType: 'innerzoom',
    preloadImages: false,
    alwaysOn: false
  });
 // end



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
    }, {
      duration: 500,
      easing: "swing"
    });
    return false;
  });

  $(".related").click(function () {
    $("html, body").animate({
      scrollTop: $("#related").offset().top
    }, {
      duration: 500,
      easing: "swing"
    });
    return false;
  });

  // 加载更多
  $('.revConright').readMore();

  // 评论区分页特效
  $(".num").click(function () {
    $(this).addClass("current").siblings().removeClass("current");
    });

  // 评论区函数
  $(".revImg").revFunction();

  // 关闭窗口
  $(".greyArea").click(function () {
    $(".revbigImgArea").fadeOut(400);
    $(".greyArea").fadeOut(400);
  });


});