/*
 * @Author: Robyn 
 * @Date: 2017-12-26 16:38:19 
 * @Last Modified by: Robyn
 * @Last Modified time: 2018-01-03 08:50:42
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

    // 实现li点击之后获取红色边框
    $.fn.borderRed = function (ulClass) {
      $(ulClass).on("click", "li", function () {
        $(this).addClass("borderSpec").siblings().removeClass('borderSpec');
      });
    }
  }
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
  })

  // 中间内容的功能
  // Tab栏切换
  $('.middleShowTit').mouseover(function () {

    $(this).addClass('currentShow').siblings().removeClass('currentShow');

    var index = $(this).index();
    $('.currentShowArea .mainContent').eq(index).addClass('currentSelected').siblings().removeClass('currentSelected');
  });

})