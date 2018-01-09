/*
 * @Author: Robyn 
 * @Date: 2017-12-19 11:32:28 
 * @Last Modified by: Robyn
 * @Last Modified time: 2018-01-09 21:58:14
 */

// 函数封装
;(function ($) {
  // 加载更多的特效
  $.fn.loadMore = function () {
    var addHeight = 2*($(".productsShow li").height()+50),
        proUlSumHeight = $(".productsShow").height(),
        currentUlHeight = addHeight;

    if (proUlSumHeight > addHeight) {
      $(".productsShow").css({"height":currentUlHeight});
    }
  
    $(".loadMore").click(function () {
  
      currentUlHeight += addHeight;
  
      $(".productsShow").css({"height":currentUlHeight});
  
      if (currentUlHeight >= proUlSumHeight ) {
        
        $(".productsShow").css({"height":proUlSumHeight});
        $(".loadMore").css({"display":"none"});
      } else {
        $(".loadMore").css({"display":"block"});
      }
      });
    };
  // end
  })(jQuery);


$(function () {

  // 轮播图插件内容
    $(".flexslider").flexslider({
      animation: "slide"
    });

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

  // 加载更多
  $(".productsShow").loadMore();
})