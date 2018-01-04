/*
 * @Author: Robyn 
 * @Date: 2017-12-19 11:32:28 
 * @Last Modified by: Robyn
 * @Last Modified time: 2018-01-03 18:53:19
 */


$(function () {

  // 轮播图插件内容
    $(".flexslider").flexslider({
      animation: "slide"
    });

  // 动态返回按钮
  // 1.获取产品展示的高度
  var productsShowTop = $('#productShow').offset().top;
  $(window).scroll(function () {
    // 获取滚动出去的垂直距离
    var winTop = $(window).scrollTop();
    // 如果滚动出一屏高度的时候，那么就显示按钮
    winTop >= $(window).height() ? $('#toTop').show() : $('#toTop').hide();

    //2.点击返回顶部按钮，实现返回顶部效果
    $('#toTop').click(function () {
      $('html,body').stop().animate({
        scrollTop: 0
      })
    })
  });
})