/*
 * @Author: Robyn 
 * @Date: 2018-02-02 15:38:19 
 * @Last Modified by: Robyn
 * @Last Modified time: 2018-02-02 15:43:50
 */
$('#frmLogin').validate({
  debug: false,
  onkeyup: false,
  rules: {
    username: {
      required: true,
      rangelength: [2, 50],
      login: true
    },
    password: {
      required: true,
      rangelength: [6, 20]
    },
    captcha: {
      required: true
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
    var username = $('#frmLogin').find('input[name=email]').val();
    var password = $('#frmLogin').find('input[name=password]').val();
    var captcha = $('#frmLogin').find('input[name=captcha]').val();
    var is_remember = $('#frmLogin').find('input[name=is_remember]').val();
    $('.login .v_code').siblings('.tips_2').remove();
    $.ajax({
      url: '/index.php?com=account&t=ajax_login',
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
          if ($('.login .v_code').siblings('.tips_2').length <= 0) {
            $('.login .v_code').after('<span class="tips_2" style="color:red;">' + res.msg + '</span>');
            $('.code_img').find('img').click();
          }
          if (res.login_token == 1) {
            $('#frmLogin').find('.v_code').show();
            $('.code_img').find('img').click();
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