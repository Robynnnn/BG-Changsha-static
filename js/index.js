/*
 * @Author: Robyn 
 * @Date: 2017-12-19 11:32:28 
 * @Last Modified by: Robyn
 * @Last Modified time: 2018-01-05 15:47:14
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

})