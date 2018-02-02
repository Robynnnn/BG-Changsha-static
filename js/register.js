/*
 * @Author: Robyn 
 * @Date: 2018-01-21 13:27:26 
 * @Last Modified by: Robyn
 * @Last Modified time: 2018-02-02 17:46:58
 */

//  函数封装
;
(function ($) {

  $.fn.checkTxt = function () {

    var reg;
    // 密码栏失去焦点
    $(".form-group #exampleInputPassword1").blur(function () {

      // 6~12位的数字、字母或特殊字符！
      reg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;

      if (!reg.test($("#exampleInputPassword1").val())) {
        $(this).next().html("Please enter password between 6-20 characters !");
        $(this).next().css("display", "block");
      } else {
        $(this).next().empty();
      }

    });

    // 确认密码失去焦点
    $(".form-group #exampleInputConfirmPassword1").blur(function () {
      var pwd1 = $("#exampleInputPassword1").val(),
        pwd2 = $(this).val();

      if (pwd1 != pwd2) {
        $(this).next().html("The password you entered is incorrect. Please try again");
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

  // 验证start
  $(document).on("focus", ".inputbox_1 input", function () {
    $(this).siblings(".tips").remove();
    $(this).siblings(".tips_1").remove();
    return false;
  });
  $(document).on('click', '.register .label-Click', function () {
    if ($(this).find('input[name=is_Subscribe]').is(':checked')) { //选择状态
      $(this).find('input[name=is_Subscribe]').val('1');
    } else {
      $(this).find('input[name=is_Subscribe]').val('');
    }
  });
  var zValidate = {};
  zValidate.email = function (email) {
    var myreg = /^[\w-']+([\.\+][\w-']+)*@([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*?\.[a-zA-Z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
    return myreg.test(email.replace(/(^\s*)|(\s*$)/g, ""));
  };

  function ajaxRegister() {
    var stastu = false;
    $('.red').html('');
    $('.log_form').find('.tips').remove();
    var email = $(".register input[name=email]").val();
    var username = $(".register input[name=username]").val();
    var password = $(".register input[name=password]").val();
    var re_password = $(".register input[name=re_password]").val();
    var token = $(".register input[name=token]").val();
    var captcha = $(".register input[name=captcha]").val();
    var is_Subscribe = $(".register input[name=is_Subscribe]").val();
    if (email == '') {
      if ($(".register input[name=email]").siblings('.tips').length <= 0) {
        $(".register input[name=email]").parent().append('<span class="tips">Please Input Your Email !</span>');
      }
      stastu = true;
    } else {
      if (!zValidate.email(email)) {
        stastu = true;
        if ($(".register input[name=email]").siblings('.tips').length <= 0) {
          $(".register input[name=email]").parent().append('<span class="tips">Please check your email format !</span>');
        }
      }
    }
    var zValidate_username = /^\S{2,50}$/;
    if (username == '') {
      if ($(".register input[name=username]").siblings('.tips').length <= 0) {
        $(".register input[name=username]").parent().append('<span class="tips">Please enter nickname between 2-50 characters !</span>');
      }
      stastu = true;
    } else {
      if (!zValidate_username.test(username)) {
        stastu = true;
        if ($(".register input[name=username]").siblings('.tips').length <= 0) {
          $(".register input[name=username]").parent().append('<span class="tips">Please enter nickname between 2-50 characters !</span>');
        }
      }
    }
    var zValidate_password = /^\S{6,20}$/;
    if (password == '') {
      if ($(".register input[name=password]").siblings('.tips').length <= 0) {
        $(".register input[name=password]").parent().append('<span class="tips">Please enter password between 6-20 characters !</span>');
      }
      stastu = true;
    } else {
      if (!zValidate_password.test(password)) {
        stastu = true;
        if ($(".register input[name=password]").siblings('.tips').length <= 0) {

          $(".register input[name=password]").parent().append('<span class="tips">Please enter password between 6-20 characters !</span>');
        }
      }
    }
    if (re_password == '') {
      if ($(".register input[name=re_password]").siblings('.tips').length <= 0) {
        $(".register input[name=re_password]").parent().append('<span class="tips">Please enter confirm password !</span>');
      }
      stastu = true;
    }
    if (password != re_password) {
      if ($(".register input[name=re_password]").siblings('.tips').length <= 0) {
        $(".register input[name=re_password]").parent().append('<span class="tips">The password you entered is incorrect. Please try again !</span>');
      }
      stastu = true;
    }
    if (captcha == '') {
      if ($(".register input[name=captcha]").siblings('.tips').length <= 0) {
        $(".register input[name=captcha]").parent().append('<span class="tips">The characters you entered are incorrect !</span>');
      }
      stastu = true;
    }
    if (stastu) {
      return false;
    }

    if ($('.tips_1').length > 0) {
      return false;
    }
    
    $.post('index.php?com=account&t=register_process', {
        'email': email,
        'username': username,
        'password': password,
        're_password': re_password,
        'captcha': captcha,
        'is_Subscribe': is_Subscribe,
      },
      function (data) {
        if (data.error == 5) { //邮箱已存在
          if ($(".register input[name=email]").siblings('.tips_1').length <= 0) {
            $(".register input[name=email]").parent().append('<span class="tips_1" style="color:red;">' + data.message + '</span>');
          }
          $('.code_img').find('img').click();
          return false;
        } else if (data.error == 7) { //验证码错误
          if ($(".register input[name=captcha]").siblings('.tips_1').length <= 0) {
            $(".register input[name=captcha]").parent().append('<span class="tips_1" style="color:red;">' + data.message + '</span>');
          }
          $('.code_img').find('img').click();
          return false;
        } else if (data.error == 6) { //用户名错误
          if ($(".register input[name=username]").siblings('.tips_1').length <= 0) {
            $(".register input[name=username]").parent().append('<span class="tips_1" style="color:red;">' + data.message + '</span>');
          }
          $('.code_img').find('img').click();
          return false;
        } else {
          location.href = data.url;
        }
      }, 'json'
    )
  }

  $(".sub").click(function () {
    ajaxRegister();
    });
  // 验证end



  // end
});