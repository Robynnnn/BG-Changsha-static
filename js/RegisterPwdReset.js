/*
 * @Author: Robyn 
 * @Date: 2018-02-02 11:51:13 
 * @Last Modified by: Robyn
 * @Last Modified time: 2018-02-02 15:23:46
 */

 function resetPwd(resetNewPwdID,resetCfmPwdID) {
   var reset_new_pwd = $(resetNewPwdID).val(),
      reset_cfm_pwd = $(resetCfmPwdID).val();
      if (reset_new_pwd == "" || reset_cfm_pwd == "") {
        $(".alertBox").html("please enter password");return;
      }
      
      if (reset_new_pwd != reset_cfm_pwd) {
        $(".alertBox").html("Confirm Password not match new Password!");return;
      }

      // var data = "";
      // $.ajax({
      //   type:"post",
      //   dataType:"json",
      //   data:data,
      //   url:"",
      //   beforeSend:function () {
      //     $(".alertBox").html("Processing...");
      //     },
      //   success:function (res) {
      //     $(".alertBox").html("Reset Successfully");
      //     }
      //     if (res.status == true) {
      //       $("#ResetPwd").val("");
      //       $("#ResetConfirmPwd").val("");
      //     }
      // })
   }

   $(function () {
     $(".sub").click(function () {
      resetPwd("#ResetPwd","ResetConfirmPwd");
       });
     });