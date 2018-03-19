/*
 * @Author: Robyn 
 * @Date: 2018-01-21 13:27:26 
 * @Last Modified by: Robyn
 * @Last Modified time: 2018-02-06 13:45:23
 */

// -------- 验证策略 --------

$('#regForm').validate({
  debug: false,
  onkeyup: false,
  rules: {
    username: {
      required: true,
      rangelength: [2, 50],
      login: true
    },
    email: {
      required: true,
      email: true
    },
    password: {
      required: true,
      rangelength: [6, 20]
    },
    re_password: {
      required: true,
      rangelength: [6, 20],
      equalTo: "#password"
    }
  },
  messages: {
    username: {
      required: 'Mailbox cannot be empty!',
      rangelength: 'Please enter nickname between 2-50 characters !',
      login: 'Please enter the correct mailbox!'
    },
    password: {
      required: 'Password cannot be empty!',
      rangelength: 'Please enter password between 6-20 character'
    },
    re_password: {
      required: 'The password you entered is incorrect. Please try again.',
      rangelength: 'Please enter password between 6-20 character',
      equalTo: 'The password you entered is incorrect. Please try again.'
    },
    captcha: {
      required: 'The verification code cannot be null !'
    }
  },
  ignore: ":hidden",
  errorPlacement: function (error, element) {
    error.appendTo(element.parent());
  },
  errorElement: 'span',
  submitHandler: function () { //采用异步提交表单
    //表单序列化
    // var param = $('#frmLogin').serialize();
    var username = $('#regForm').find('input[name=username]').val();
    var password = $('#regForm').find('input[name=password]').val();
    var captcha = $('#regForm').find('input[name=captcha]').val();
    var is_remember = $('#regForm').find('input[name=is_remember]').val();
    $('.regForm .v_code').siblings('.tips_2').remove();
    $.ajax({
      url: '/log_in.html',
      dataType: 'json',
      type: 'post',
      data: {
        'username': username,
        'password': password,
        'captcha': captcha,
        'is_remember': is_remember
      },
      success: function (res) {
        if (res.status == 0) {
          if ($('.regForm .v_code').siblings('.tips_2').length <= 0) {
            $('.regForm .v_code').after('<span class="tips_2" style="color:#d53333;">' + res.msg + '</span>');
            $('.code_img').find('img').click();
          }
          if (res.login_token == 1) {
            $('#regForm').find('.v_code').show();
            $('.v_code').children('input').attr('required', '');
            $('.veriCode').find('img').click();
          }
        } else if (res.status == 1) {
          window.location = res.referer_url;
        }
      }
    })
    // return false;//阻止表单提交
  },
  invalidHandler: function () {
    return false;
  }
});


// -------- 验证策略 end --------
//  函数封装
// ;
// (function ($) {

//   $.fn.checkTxt = function () {

//     var reg;
//     // 密码栏失去焦点
//     $(".form-group #exampleInputPassword1").blur(function () {

//       // 6~12位的数字、字母或特殊字符！
//       reg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;

//       if (!reg.test($("#exampleInputPassword1").val())) {
//         $(this).next().html("Please enter password between 6-20 characters !");
//         $(this).next().css("display", "block");
//       } else {
//         $(this).next().empty();
//       }

//     });

//     // 确认密码失去焦点
//     $(".form-group #exampleInputConfirmPassword1").blur(function () {
//       var pwd1 = $("#exampleInputPassword1").val(),
//         pwd2 = $(this).val();

//       if (pwd1 != pwd2) {
//         $(this).next().html("The password you entered is incorrect. Please try again");
//         $(this).next().css("display", "block");
//       } else {
//         $(this).next().empty();
//       }


//     });
//   };


// })(jQuery);

// // 入口函数
// $(function () {


//   $(".registerModule").checkTxt();

//   // 验证start
//   $(document).on("focus", ".inputbox_1 input", function () {
//     $(this).siblings(".tips").remove();
//     $(this).siblings(".tips_1").remove();
//     return false;
//   });
//   $(document).on('click', '.register .label-Click', function () {
//     if ($(this).find('input[name=is_Subscribe]').is(':checked')) { //选择状态
//       $(this).find('input[name=is_Subscribe]').val('1');
//     } else {
//       $(this).find('input[name=is_Subscribe]').val('');
//     }
//   });
//   var zValidate = {};
//   zValidate.email = function (email) {
//     var myreg = /^[\w-']+([\.\+][\w-']+)*@([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*?\.[a-zA-Z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
//     return myreg.test(email.replace(/(^\s*)|(\s*$)/g, ""));
//   };

//   function ajaxRegister() {
//     var stastu = false;
//     $('.red').html('');
//     $('.log_form').find('.tips').remove();
//     var email = $(".register input[name=email]").val();
//     var username = $(".register input[name=username]").val();
//     var password = $(".register input[name=password]").val();
//     var re_password = $(".register input[name=re_password]").val();
//     var token = $(".register input[name=token]").val();
//     var captcha = $(".register input[name=captcha]").val();
//     var is_Subscribe = $(".register input[name=is_Subscribe]").val();
//     if (email == '') {
//       if ($(".register input[name=email]").siblings('.tips').length <= 0) {
//         $(".register input[name=email]").parent().append('<span class="tips">Please Input Your Email !</span>');
//       }
//       stastu = true;
//     } else {
//       if (!zValidate.email(email)) {
//         stastu = true;
//         if ($(".register input[name=email]").siblings('.tips').length <= 0) {
//           $(".register input[name=email]").parent().append('<span class="tips">Please check your email format !</span>');
//         }
//       }
//     }
//     var zValidate_username = /^\S{2,50}$/;
//     if (username == '') {
//       if ($(".register input[name=username]").siblings('.tips').length <= 0) {
//         $(".register input[name=username]").parent().append('<span class="tips">Please enter nickname between 2-50 characters !</span>');
//       }
//       stastu = true;
//     } else {
//       if (!zValidate_username.test(username)) {
//         stastu = true;
//         if ($(".register input[name=username]").siblings('.tips').length <= 0) {
//           $(".register input[name=username]").parent().append('<span class="tips">Please enter nickname between 2-50 characters !</span>');
//         }
//       }
//     }
//     var zValidate_password = /^\S{6,20}$/;
//     if (password == '') {
//       if ($(".register input[name=password]").siblings('.tips').length <= 0) {
//         $(".register input[name=password]").parent().append('<span class="tips">Please enter password between 6-20 characters !</span>');
//       }
//       stastu = true;
//     } else {
//       if (!zValidate_password.test(password)) {
//         stastu = true;
//         if ($(".register input[name=password]").siblings('.tips').length <= 0) {

//           $(".register input[name=password]").parent().append('<span class="tips">Please enter password between 6-20 characters !</span>');
//         }
//       }
//     }
//     if (re_password == '') {
//       if ($(".register input[name=re_password]").siblings('.tips').length <= 0) {
//         $(".register input[name=re_password]").parent().append('<span class="tips">Please enter confirm password !</span>');
//       }
//       stastu = true;
//     }
//     if (password != re_password) {
//       if ($(".register input[name=re_password]").siblings('.tips').length <= 0) {
//         $(".register input[name=re_password]").parent().append('<span class="tips">The password you entered is incorrect. Please try again !</span>');
//       }
//       stastu = true;
//     }
//     if (captcha == '') {
//       if ($(".register input[name=captcha]").siblings('.tips').length <= 0) {
//         $(".register input[name=captcha]").parent().append('<span class="tips">The characters you entered are incorrect !</span>');
//       }
//       stastu = true;
//     }
//     if (stastu) {
//       return false;
//     }

//     if ($('.tips_1').length > 0) {
//       return false;
//     }

//     $.post('index.php?com=account&t=register_process', {
//         'email': email,
//         'username': username,
//         'password': password,
//         're_password': re_password,
//         'captcha': captcha,
//         'is_Subscribe': is_Subscribe,
//       },
//       function (data) {
//         if (data.error == 5) { //邮箱已存在
//           if ($(".register input[name=email]").siblings('.tips_1').length <= 0) {
//             $(".register input[name=email]").parent().append('<span class="tips_1" style="color:red;">' + data.message + '</span>');
//           }
//           $('.code_img').find('img').click();
//           return false;
//         } else if (data.error == 7) { //验证码错误
//           if ($(".register input[name=captcha]").siblings('.tips_1').length <= 0) {
//             $(".register input[name=captcha]").parent().append('<span class="tips_1" style="color:red;">' + data.message + '</span>');
//           }
//           $('.code_img').find('img').click();
//           return false;
//         } else if (data.error == 6) { //用户名错误
//           if ($(".register input[name=username]").siblings('.tips_1').length <= 0) {
//             $(".register input[name=username]").parent().append('<span class="tips_1" style="color:red;">' + data.message + '</span>');
//           }
//           $('.code_img').find('img').click();
//           return false;
//         } else {
//           location.href = data.url;
//         }
//       }, 'json'
//     )
//   }

//   $(".sub").click(function () {
//     ajaxRegister();
//     });
//   // 验证end



//   // end
// });