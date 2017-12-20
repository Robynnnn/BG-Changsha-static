/*
 * @Author: Robyn 
 * @Date: 2017-12-19 11:32:28 
 * @Last Modified by: Robyn
 * @Last Modified time: 2017-12-19 21:57:35
 */


$(function () {

  //        tab栏效果
  $('.tab-item').mouseover(function () {
    //            上面选项卡的切换：其实就是排他思想
                $(this).addClass('active').siblings().removeClass('active');
    //            tab内容切换：其实也是排他，不过他需要和选项卡有对应关系
    //            通过获取当前的索引值，让上下内容对应起来
                var index = $(this).index();
                $('.main').eq(index).addClass('selected').siblings().removeClass('selected');
            });
  $('.nav-in').mouseout(function () {
    $('.main').removeClass('selected');
    })
  
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
      });
    });
  })

})