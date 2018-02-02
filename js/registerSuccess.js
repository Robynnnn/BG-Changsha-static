/*
 * @Author: Robyn 
 * @Date: 2018-02-02 17:58:11 
 * @Last Modified by: Robyn
 * @Last Modified time: 2018-02-02 18:05:31
 */

$(function () {
  $(document).on("click", ".click .sub", function () {
    $.ajax({
      type: "GET",
      url: "",
      dataType: "json",
      success: function (res) {
        if (res.error == 0) {
          $(".pro").html("Resend successfully.");
          setTimeout(() => {
            $(".pro").html("");
          }, 10000);
        }
      }
    });
  })
});