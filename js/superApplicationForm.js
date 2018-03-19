/*
 * @Author: Robyn 
 * @Date: 2018-02-12 09:17:11 
 * @Last Modified by: Robyn
 * @Last Modified time: 2018-02-13 10:22:31
 */
$(function () {
  // -------- 验证表单 --------
  $("#super-app-form").validate({
    onkeyup : false,
    rules : {
      first_name : {required:true, minlength:1},
      last_name :  {required:true, minlength:1},
      Address : {required:true, minlength:1},
      City : {required:true, minlength:1},
      zip_code : {required:true, minlength:1},
    },
    messages : {
      first_name : {
        required : 'This is a required field !',
        rangelength : 'please enter first_name'
      },
      last_name :  {
        required : 'This is a required field !',
        rangelength : 'please enter last_name'
      },
      City : {
        required : 'This is a required field !',
        rangelength : 'please enter City'
      },
      zip_code : {
        required : 'This is a required field !',
        rangelength : 'please enter ZIP / Post Code'
      }
    },
    ignore: ":hidden",
    errorPlacement: function (error, element) {
      error.appendTo(element.parent());
    },
    errorElement: 'span',
    submitHandler:function () {
      var firstName = $('#super-app-form').find('input[name=first_name]').val();
      var lastName = $('#super-app-form').find('input[name=last_name]').val();
      var City = $('#super-app-form').find('input[name=City]').val();
      var zipCode = $('#super-app-form').find('input[name=zip_code]').val();
      // $.ajax({
      //   url: '/log_in.html',
      //   dataType: 'json',
      //   type: 'post',
      //   data: {
      //     'firstName': firstName,
      //     'lastName': lastName,
      //     'City': City,
      //     'zipCode': zipCode
      //   },
      // })
    }
  });
  // -------- 国家下拉搜索框 --------
  $('.super-form-country').searchableSelect();
  // -------- 省份下拉搜索框 --------
  $('.super-form-pro').searchableSelect();
  // -------- Im下拉搜索框 --------
  $('.super-form-Im').searchableSelect();
  // -------- My External Reviewer Profile add --------
  addNode();
  // -------- My External Reviewer Profile del --------
  removeIcon();
});

// -------- My External Reviewer Profile add --------
function addNode() {
  var num = 0;
  var ele = '';
  $('.right_sel').on('click', '.addMore', function () {
    num++;
    ele = '<div class="form-group clearfix spec-rev"><label for="Reviewer"  class="spec-rev"></label><div class="right_sel pr"><select class="selBox"><option>Please select</option><option>Youtube</option><option>Facebook</option><option>Twitter</option><option>Blog</option><option>Website</option><option>slickdeals and any other discount forums</option><option>BBS</option><option>Other</option></select><input class="right_sel_input" type="text" name="reviewer_profile_link[]" id="Link' + num + '" placeholder="http://"><span class="removeIcon"></span></div>';
    $('.Reviewer').after(ele);
  })
}

// -------- My External Reviewer Profile del --------
function removeIcon() {
  $(document).on('click', '.removeIcon', function () {
    $(this).parents('.spec-rev').remove();
  })
}