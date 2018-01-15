/*
 * @Author: Robyn 
 * @Date: 2017-12-26 16:38:19 
 * @Last Modified by: Robyn
 * @Last Modified time: 2018-01-15 18:11:49
 */

// 函数封装
;(function ($) {
  // 小图换大图
  // $.fn.turnBig = function (imgID, ulClass, aLink) {
  //   var img = document.getElementById(imgID);
  //   var ul = document.getElementById(ulClass);
  //   var links = ul.getElementsByTagName(aLink);
  //   for (var i = 0; i < links.length; i++) {
  //     links[i].onclick = turn; // 节省内存空间
  //   }

  //   function turn() {
  //     img.src = this.href;
  //     $(this).parent().addClass('selected').siblings().removeClass('selected');
  //     return false;
  //   }
  // };

  // 实现li点击之后获取红色边框
  $.fn.borderRed = function (ulClass) {
    $(ulClass).on("click", "li", function () {
      $(this).addClass("borderSpec").siblings().removeClass('borderSpec');
      if ($(this).hasClass("fobidBuy")) {
        $(this).removeClass("borderSpec");
      }
    });
  };

  // 右侧color点击左侧展示对应大图
  $.fn.colorTurnBigImg = function (moveLength) {
    $(".typeColor").on("click","li",function () {
      // 获取右侧img中src的属性
      var imgSrc = $(this).find("img").attr("src");
      // 判断是否有图片，如果没有图片，就直接return 
      if (!imgSrc) {
        return ;
      }
      var li_node = $("#ban_num1 ul").find("li");
      $.each(li_node,function (idx,ele) {
        // 判断右侧的src和左侧小图哪个src相等，如果相等，就让当前li增加class on，其余移除on
        if (imgSrc == $(ele).find("img").attr("src")) {
          // pc端每次移动505px
          var moveDistance = -(idx*moveLength);
          $(this).addClass("on").siblings().removeClass("on");
          $("#ban_pic1 ul").css({"left":moveDistance});
        }
        });
        // end
      });

    // end
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
        });
      // testend

      // 右旋转
      $(".rightRotate").click(function () {
        degNum = (degNum + 90)%360;
        // console.log(degNum);
        par.find(".revbigImg li").eq(index).find("img").css({
          "transform" : "translate(-50%,-50%) rotate("+degNum+"deg)"
        });
        });
      //end
    });

    // end
  };
})(jQuery);

// 入口函数
$(function () {

  // 获取当前屏幕的宽度
  const window_width = $(window).width();

if (window_width >= 1280) {
  jq('#demo1').banqh({
    box:"#demo1",//总框架
    pic:"#ban_pic1",//大图框架
    pnum:"#ban_num1",//小图框架
    prev_btn:"#prev_btn1",//小图左箭头
    next_btn:"#next_btn1",//小图右箭头
    pop_prev:"#prev2",//弹出框左箭头
    pop_next:"#next2",//弹出框右箭头
    prev:"#prev1",//大图左箭头
    next:"#next1",//大图右箭头
    pop_div:"#demo2",//弹出框框架
    pop_pic:"#ban_pic2",//弹出框图片框架
    pop_xx:".pop_up_xx",//关闭弹出框按钮
    mhc:".mhc",//朦灰层
    autoplay:false,//是否自动播放
    interTime:5000,//图片自动切换间隔
    delayTime:400,//切换一张图片时间
    pop_delayTime:400,//弹出框切换一张图片时间
    order:0,//当前显示的图片（从0开始）
    picdire:true,//大图滚动方向（true为水平方向滚动）
    mindire:true,//小图滚动方向（true为水平方向滚动）
    min_picnum:5,//小图显示数量
    pop_up:true//大图是否有弹出框
  });

  $(".mhc").click(function () {
    $(".mhc").css({"display":"none"});
    $(".pop_up").css({"display":"none"});
    });

  $(".typeColor").colorTurnBigImg("505");

} else {
  jq('#demo1').banqh({
    box:"#demo1",//总框架
    pic:"#ban_pic1",//大图框架
    pnum:"#ban_num1",//小图框架
    prev_btn:"#prev_btn1",//小图左箭头
    next_btn:"#next_btn1",//小图右箭头
    pop_prev:"#prev2",//弹出框左箭头
    pop_next:"#next2",//弹出框右箭头
    prev:"#prev1",//大图左箭头
    next:"#next1",//大图右箭头
    pop_div:"#demo2",//弹出框框架
    pop_pic:"#ban_pic2",//弹出框图片框架
    pop_xx:".pop_up_xx",//关闭弹出框按钮
    mhc:".mhc",//朦灰层
    autoplay:false,//是否自动播放
    interTime:5000,//图片自动切换间隔
    delayTime:400,//切换一张图片时间
    pop_delayTime:400,//弹出框切换一张图片时间
    order:0,//当前显示的图片（从0开始）
    picdire:true,//大图滚动方向（true为水平方向滚动）
    mindire:true,//小图滚动方向（true为水平方向滚动）
    min_picnum:5,//小图显示数量
    pop_up:false//大图是否有弹出框
  });

  $(".typeColor").colorTurnBigImg("360");
  
}

 

  // 实现li点击之后获取红色边框应用
  $(".typeColor").borderRed(".typeColor");
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
    $(this).addClass("currentSel").siblings().removeClass("currentSel");
    });

  // 评论区函数
  $(".revImg").revFunction();

  // 关闭窗口
  $(".greyArea").click(function () {
    $(".revbigImgArea").fadeOut(400);
    $(".greyArea").fadeOut(400);
  });

// 缺货时候
if (!$(".proChoose").height()) {
  $(".buyArea").css({"display":"none"});
  $(".ComingSoon").css({"display":"block"});
} else {
  $(".ComingSoon").css({"display":"none"});
}

$(".ComWishlist span").click(function () {
  $(this).toggleClass('colD533');
  });

// 轮播图
  // 轮播图插件内容
  $('.flexslider').flexslider({
    animation: "slide",
    animationLoop: false,
    itemWidth: 210,
    itemMargin: 20,
    minItems: 2,
    maxItems: 5,
    slideshow:false,
    directionNav:true,
    nextText:"",
    prevText:"",
    start: function(slider){
      $('body').removeClass('loading');
    }
  });


  // test area


  
  // test end

// 入口函数end
});