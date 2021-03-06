/*
 * @Author: Robyn 
 * @Date: 2018-01-20 16:19:47 
 * @Last Modified by: Robyn
 * @Last Modified time: 2018-02-01 11:35:40
 */


// //  函数封装
;
(function ($) {

  // Birthday-----时间函数
  $.fn.timer = function () {
    var date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      CurrentTime, timer, timerVal;
    month = month < 10 ? month = "0" + month : month;
    CurrentTime = year + "-" + month + "-" + day;
    timer = document.getElementById("timer");
    timerVal = $("#timer").val();
    timer.value = CurrentTime;
  };


})(jQuery);
// 函数封装结束


// 入口函数
$(function () {

  // 左侧点击展示对应右边区域
  $(".infoSelect").on("click", "li", function () {
    var index = $(this).index();
    $(this).addClass("selected").siblings().removeClass("selected");
    $(".exhibition>li").eq(index).addClass("current").siblings().removeClass("current");
  });

  // 分页按钮效果
  $(".num").click(function () {
    $(this).addClass("currentPage").siblings().removeClass("currentPage");
  });

  // my product 判断是否有注册产品，如果没有，展示没有产品的区域
  if ($(".pub").length == 1 || $(".pub").length == 0) {
    $(".pub").hide();
    $(".pagination").hide();
    $(".noPro").show();
  }

  // my Wishlist 
  // 删除wishlist列表里面的商品
  $(".wishlistDetail").on("click", ".del", function () {
    $(this).parents(".wishDel").remove();
  });
  // my Wishlist end

  // my profile && changePwd start

  // my profile && changePwd turn 
  $(".tit").on("click", "li", function () {

    var index = $(this).index();

    $(this).find("span").addClass("colorD533").parent().siblings().find("span").removeClass("colorD533");

    $(".content li").eq(index).addClass("current").siblings().removeClass("current");

  });

// upload hover
$("#file1").hover(function () {
  $(".grayUpload").show();
  },function () {
    $(".grayUpload").hide();
    });
  // upload Img
  // $(".btn_1 :button").click(function () {
  //   ajaxFileUpload();
  //   $('.btn_1 .fileBtn').hide();
  //   $(".btn_1 .fileerrorTip").hide();
  // });

  // function ajaxFileUpload() {
  //   $.ajaxFileUpload({
  //     url: '/index.php?com=account&t=setCustomers_avatars', //用于文件上传的服务器端请求地址
  //     secureuri: false, //一般设置为false
  //     fileElementId: 'file1', //文件上传空间的id属性
  //     dataType: 'json', //返回值类型 一般设置为json
  //     success: function (data) { //服务器成功响应处理函数
  //       console.log(data, 999);
  //       if (data.error == 0) {
  //         $(".reviews_right .My_Profile .Avatar .img img").attr("src", data.customers_avatars);
  //         $('#avatarsPath').val(data.avatars_path);
  //         $('#avatarsPath-error').hide();
  //       }
  //     }
  //   })
  //   return false;
  // }

  //显示文件名
  $(".btn_1").on("change", "input[type='file']", function () {
    var filePath = $(this).val();
    if (filePath.indexOf("jpg") != -1 || filePath.indexOf("png") != -1 || filePath.indexOf("gif") != -1) {
      $('.btn_1 .fileBtn').show();
      $(".fileerrorTip").html("").hide();
      var arr = filePath.split('\\');
      var fileName = arr[arr.length - 1];
      $(".showFileName").html(fileName).css({
        "display": "block"
      });
    } else {
      $(".showFileName").html("");
      $(".fileerrorTip").html("You did not upload the file or provided an invalid file, please try again！").show().css({
        "display": "block"
      });
      return false
    }
  })
  // upload end



  // 国家选择
  $('.countrySel').searchableSelect();

  // preference 选择
  $(".category").on("click", ".cateBtn", function () {
    $(this).toggleClass("categorySel");
  });
  // my profile && changePwd end


  // message

  //全选/全不选 按钮的点击效果
  $('#checkAll').click(function () {
    //获取当前的选中状态
    var current = $(this).prop('checked');
    //把前面的状态也设置到下面三个复选框里
    $('.check').prop('checked', current);
  });


  $('.check').click(function () {
    var flag = true;
    //全部都选中的时候，上面的按钮才被选中
    for (var i = 0; i < $('.check').length; i++) {
      //遍历的时候，如果其中一个没选中，那么就flag就为假,上面的就不选中，通过break退出循环
      if ($('.check').eq(i).prop('checked') == false) {
        flag = false;
        break;
      }
    }
    $('#checkAll').prop('checked', flag);
  });

  // 删除按钮
  $(".click-for-del").on("click", "tr i", function () {

    // 删除全部的按钮
    if ($(this).hasClass("delAll")) {
      // 弹出遮罩
      $(".popAlert").show();

      var count = 0;
      // 循环累计,通过累计判断是否有选中任何一个选项
      for (var i = 0; i < $('.check').length; i++) {
        if ($('.check').eq(i).prop('checked') == true) {
          count++;
        }
      }

      if (count == 0) {
        // 当count为0,代表全部没有选中,取消和yes按钮隐藏,文字变动
        $(".popAlert p").html("Sorry,You haven't checked any options yet.");
        $(".noRequest").hide();
        $(".yesRequest").hide();
        $(".confirmBtn").show();

        $(".confirmBtn").click(function () {
          $(".popAlert").hide();
          // 文字复原,按钮复原,隐藏确认按钮
          $(".popAlert p").html("Are you want to delete?");
          $(".confirmBtn").hide();
          $(".noRequest").show();
          $(".yesRequest").show();
        });
      } else {
        // 点击确定按钮的时候删除所选项
        $(".yesRequest").click(function () {
          $(".popAlert").hide();
          $('input[name="del"]:checked').each(function () {
            _index = $(this).parents("tr").index(); //获取checkbox所在行的顺序
            $("table.click-for-del").find("tr:eq(" + _index + ")").remove();
          });



        });
      }
      // 移出选择全部的状态
      $('#checkAll').removeAttr("checked");
    } else {
      // 点击单个删除btn操作
      $(".popAlert").show();
      _this = $(this);
      // 点击确定按钮
      $(".yesRequest").click(function () {
        $(".popAlert").hide();
        $(_this).parents("tr").remove();
      });
    }
  });

  // 点击取消按钮操作返回
  $(".noRequest").click(function () {
    $(".popAlert").hide();
  });

  // 弹出框之后点击灰色区域隐藏
  $(".popgray").click(function () {
    $(".popAlert").hide();
  });


  // message end


  // User Center 

  // 模拟选择框功能

  $(".select-header").click(function () {
    $(this).parent().siblings(".select-box").find(".select-content").slideUp("fast");
    if ($(this).siblings(".select-content").is(":hidden")) {
      $(this).siblings(".select-content").slideDown("fast");
      var evt = new Object;
      if (typeof (window.event) == "undefined") { //如果是火狐浏览器  
        evt = arguments.callee.caller.arguments[0];
      } else {
        evt = event || window.event;
      }
      evt.cancelBubble = true;
    } else {
      $(this).siblings(".select-content").slideUp("fast");
      //去除事件冒泡  
      var evt = new Object;
      if (typeof (window.event) == "undefined") { //如果是火狐浏览器  
        evt = arguments.callee.caller.arguments[0];
      } else {
        evt = event || window.event;
      }
      evt.cancelBubble = true;
    }
  });
  $(document).click(function () {
    $(".select-content").slideUp("fast");
  });
  $(".select-content li").on("click", function () {
    $(this).parent().siblings(".select-header").text($(this).text()).end().slideUp("fast");
  });

  // 模拟选择框功能结束

  // User Center end



  // 入口函数结束
});

//重置密码
$(function () {
  //验证新密码不能和旧密码一样
  jQuery.validator.addMethod("isPassword", function (value, element) {
    var isTrue = false;
    var oldpasswordVal = $('#oldPassword').val();
    if (value !== oldpasswordVal) {
      isTrue = true;
    }
    return isTrue;
  }, "The new password cannot be consistent with the old password!");
  $('#Change_form').validate({
    debug: false,
    onkeyup: false,
    rules: {
      oldpassword: {
        required: true,
        remote: {
          url: "/index.php?com=account&t=checkUserPassword", //后台处理程序
          type: "post", //数据发送方式
          // dataType: "json",           //接受数据格式
          data: {
            oldpassword: function () {
              return $("#oldPassword").val();
            },
            customers_id: function () {
              return $('#customers_id').val();
            },
            email: function () {
              return $('#email').val();
            },
          }
        }
      },
      newpassword: {
        required: true,
        rangelength: [6, 20],
        isPassword: true
      },
      ConfirmNewPassword: {
        required: true,
        equalTo: '#newPassword'
      }
    },
    messages: {
      oldpassword: {
        required: 'The history password cannot be empty!',
        remote: "History password error!!"
      },
      newpassword: {
        required: 'Password cannot be empty!',
        rangelength: 'The number of bits is 6 to 20 bits!'
      },
      ConfirmNewPassword: {
        required: 'Verify that the password is not empty!',
        equalTo: 'The two input password does not match!'
      }
    },
    errorElement: 'span',
    submitHandler: function () { //采用异步提交表单
      //表单序列化
      var param = $('#Change_form').serialize();
      $.ajax({
        url: '/index.php?com=account&t=Edit_user_password',
        dataType: 'json',
        type: 'post',
        data: param,
        success: function (res) {
          prompt_mask(res.msg);
          $('#oldPassword').val('');
          $('#newPassword').val('');
          $('#ConfirmNewPassword').val('');
        },
        error: function (res) {
          console.log(res);
        }
      })
      // return false;//阻止表单提交
    },
    invalidHandler: function () {
      return false;
    }
  });
})