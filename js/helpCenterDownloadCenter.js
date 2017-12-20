/*
 * @Author: Robyn 
 * @Date: 2017-12-20 15:34:19 
 * @Last Modified by:   Robyn 
 * @Last Modified time: 2017-12-20 15:34:19 
 */
$(function () {

  //        tab栏效果
          $('.tab-item').mouseover(function () {
  //            上面选项卡的切换：其实就是排他思想
              $(this).addClass('active').siblings().removeClass('active');
  //            tab内容切换：其实也是排他，不过他需要和选项卡有对应关系》
              var index = $(this).index();
              $('.products .main').eq(index).addClass('selected').siblings().removeClass('selected');
          });
         
      });
  