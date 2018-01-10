/*
 * @Author: Robyn 
 * @Date: 2017-12-19 11:32:28 
 * @Last Modified by: Robyn
 * @Last Modified time: 2018-01-10 10:53:31
 */

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

      $("<div class='loadMoreBox df-jcai-center'><div class='loadMore'><span class='loadMoreC'>Load More +</span></div></div>").insertAfter($(this)).click(function () {
        if (showMoreNChildren($children, pagesize) <= 0) {
          //如果目标元素已经没有隐藏的子元素了，就隐藏“点击更多的按钮条”
          $(this).hide();
        };
      });
    }
  });
})();
  // end
})