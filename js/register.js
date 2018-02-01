/*
 * @Author: Robyn 
 * @Date: 2018-01-21 13:27:26 
 * @Last Modified by: Robyn
 * @Last Modified time: 2018-01-31 18:11:25
 */

//  函数封装
;
(function ($) {

  $.fn.checkTxt = function () {

    var reg;
    // 密码栏失去焦点
    $(".form-group #pwd").blur(function () {

      // 6~12位的数字、字母或特殊字符！
      reg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;

      if (!reg.test($("#pwd").val())) {
        $(this).next().html("格式错误，请输入6-12位的数字，字母或特殊字符！");
        $(this).next().css("display", "block");
      } else {
        $(this).next().empty();
      }

    });

    // 确认密码失去焦点
    $(".form-group #confirmPwd").blur(function () {
      var pwd1 = $("#pwd").val(),
        pwd2 = $(this).val();

      if (pwd1 != pwd2) {
        $(this).next().html("两次密码输入不一致");
        $(this).next().css("display", "block");
      } else {
        $(this).next().empty();
      }


    });
  };


})(jQuery);

// 入口函数
$(function () {


  $(".registerModule").checkTxt();



  // end
});