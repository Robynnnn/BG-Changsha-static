/*
 * @Author: Robyn 
 * @Date: 2018-02-02 16:29:08 
 * @Last Modified by: Robyn
 * @Last Modified time: 2018-02-02 16:29:32
 */

//  忘记密码
$(function() {
  $('.btn').click(function(){
      $('#post_tips').html('');
      var email=$('#email').val();
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.\-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
      if(!email || !myreg.test(email)){
          $("#post_tips").html("This email address has not been registered.!");
          $('#post_tips').attr('class','');
          return;
      }
      var data = "com=account&t=resetPwdEmail&email="+email;
      $.ajax({
          type:"post",
          dataType:"json",
          data: data,
          url:"index.php",
          beforeSend:function()
          {
              $('#post_tips').html('Processing...');
              $('#post_tips').attr('class','');
          },
          success:function(res)
          {
              $('#post_tips').html(res.content);
              $('#post_tips').attr('class','');
          }

      });
  });
});