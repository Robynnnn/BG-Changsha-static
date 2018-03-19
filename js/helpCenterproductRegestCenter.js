/*
 * @Author: Robyn 
 * @Date: 2018-02-12 17:34:05 
 * @Last Modified by: Robyn
 * @Last Modified time: 2018-02-13 15:07:51
 */
$(function () {
  $(document).on('click', '.sel', function () {
    if ($(this).prop('checked')) {
      $(this).parent().prev().find('.spec').hide();
      $('#hcrcForm').find('input[name=order]').removeAttr('required');
    } else {
      $(this).parent().prev().find('.spec').show();
      $('#hcrcForm').find('input[name=order]').attr('required','true')
    }
  })

  // -------- 表单验证插件 --------
  $('#hcrcForm').validate({
    rules : {
      order : {minlength:1},
    },
    messages : {
      required : 'This is a required field !',
      rangelength : 'please enter order'
    },
    ignore: ":hidden",
    errorPlacement: function (error, element) {
      error.appendTo(element.parent());
    },
    errorElement: 'span',
    submitHandler : function () {
      var order = $('#hcrcForm').find('input[name=order]').val();
      // $.ajax({
      //   url : '',
      //   dataType : 'json',
      //   type : 'post',
      //   data : {
      //     'order':order
      //   }
      // })
      }

  })

  // -------- 点击提示信息 --------
  $('.ask').on('click',function () {
    $('.hint').toggleClass('show');
    })

    $('.ask1').on('click',function () {
      $('.hint1').toggleClass('show');
      })

    // -------- 弹窗关闭跳转 --------
    $('.popGray').on('click',function () {
      $('.rc-popAlert').fadeOut();
      window.location.href = 'registerLogin.html';
      })
    $('.confirmBtn').on('click',function () {
      $('.rc-popAlert').fadeOut();
      window.location.href = 'registerLogin.html';
      })
});