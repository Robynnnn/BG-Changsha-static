/*
 * @Author: Robyn 
 * @Date: 2017-12-19 11:32:28 
 * @Last Modified by: Robyn
 * @Last Modified time: 2018-01-24 10:55:03
 */

// 函数封装
;(function ($) {
  // 跟随banner轮播替换导航字体颜色
  $.fn.turnColorDark = function () {
    const window_width = $(window).width();
    // 判断是否是移动端，如果是pc端，更改一级导航的字体颜色，如果是M端，改变面包条的颜色
    window_width > 768 ? $(".index_header .nav_bar .nLi > a").css({"color": "#333"}) :  $(".navbar_toggle span").css({"background-color":"#000"});

    $(".index_header .nav_user a").css({
      "color": "#333"
    });
    $(".index_header .nav_user .search").css({
      "background-position": "-30px 0"
    });
        // 静态时候
    $(".logo img").attr("src", $('.logo').attr('data-path')+"logo.png");
    };

  // 跟随banner轮播替换导航字体颜色
  $.fn.turnColorWhite = function () {
    const window_width = $(window).width();

    // 判断是否是移动端，如果是pc端，更改一级导航的字体颜色，如果是M端，改变面包条的颜色
    window_width > 768 ? $(".index_header .nav_bar .nLi > a").css({"color": "#fff"}) : $(".navbar_toggle span").css({"background-color":"#fff"});
    
    $(".index_header .nav_user a").css({
      "color": "#fff"
    });
    $(".index_header .nav_user .search").css({
      "background-position": "0 0"
    });
    // 静态时候
    $(".logo img").attr("src", $('.logo').attr('data-path')+"logo_01.png");
    };

    // 轮播图插件
  $.fn.slider = function () {
    var currentNum,Be_currentLi,currentIndex,currentLi;
    $(".flexslider").flexslider({
      animation: "slide",
      slideshowSpeed: 5000,
      prevText:"",
      nextText:"",
      start: function (slider) {
        if (!$(".slides li").eq(1).hasClass("dark")) {
          $(".index_header").turnColorDark();
        }
      },
      before : function (slider) {
         currentNum = slider.currentSlide + 2;
         Be_currentLi = $(".slides li").eq(currentNum);
        if (Be_currentLi.hasClass("dark")) {
          $(".index_header").turnColorWhite();
        } else {
          $(".index_header").turnColorDark();
        }   
        },
      after:function (slider) {
         currentIndex = slider.currentSlide + 1;
         currentLi = $(".slides li").eq(currentIndex);
        if (currentLi.hasClass("dark")) {
          $(".index_header").turnColorWhite();
        } else {
          $(".index_header").turnColorDark();
        }
        
        $(window).scroll(function () {
          const _height = $(this).scrollTop();
          if (_height >= 300) {
            if (currentLi.hasClass("white")) {
              $(".header_box").css('backgroundColor', 'rgba(255, 255, 255, .8)');
            }
          }
          });
        
        },
    });
    };
  
  })(jQuery);

$(function () {

  // 轮播图展示
  $(".flexslider").slider();


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

  // // 加载更多
  // start
  (function () {
    var showMoreNChildren = function ($children, n) {
      //显示某jquery元素下的前n个隐藏的子元素
      var $hiddenChildren = $children.filter(":hidden");
      var cnt = $hiddenChildren.length;
      for (var i = 0; i < n && i < cnt; i++) {
        $hiddenChildren.eq(i).show();
      }
      return cnt - n; //返回还剩余的隐藏子元素的数量
    }

    //对页中现有的class=showMorehandle的元素，在之后添加显示更多条，并绑定点击行为
    $(".showMoreNChildren").each(function () {
      var pagesize = $(this).attr("pagesize") || 10;
      var $children = $(this).children();
      if ($children.length > pagesize) {
        for (var i = pagesize; i < $children.length; i++) {
          $children.eq(i).hide();
        }

        $("<div class='loadMore df-jcai-center'><span class='loadMoreC'>Load More +</span></div>").insertAfter($(this)).click(function () {
          if (showMoreNChildren($children, 2*pagesize) <= 0) {
            //如果目标元素已经没有隐藏的子元素了，就隐藏“点击更多的按钮条”
            $(this).hide();
          };
        });
      }
    });
  })();

  // end
})