///////////// THIS IS THE INDEXPAGE CONTROLLER///////
///// THIS CONTROLS EVERY ACTIVITY ON THE INDEX PAGE
/////////////////////////

module.controller("headerController", [
  "$scope",
  "$sce",
  "$http",
  "infogathering",
  "$routeParams",
  "$localStorage",
  "$sessionStorage",
  function (
    $scope,
    $sce,
    $http,
    datagrab,
    $routeParams,
    $localStorage,
    $sessionStorage
  ) {
    //$('.loader').show();
    var url = window.location.href;
    // if(url.indexOf('home')>1){
    //   $scope.menu_active = '1';
    // }
    // else if((url.indexOf('profile')>1)||(url.indexOf('staff')>1)){
    // $scope.menu_active = '2';
    // }
    // else if(url.indexOf('meetings')>1){
    //   $scope.menu_active = '3';
    // }
    // else if(url.indexOf('daily_state')>1){
    //   $scope.menu_active = '4';
    // }
    // else if(url.indexOf('admins')>1){
    //   $scope.menu_active = '5';
    // }
    // else if(url.indexOf('qualification')>1){
    //   $scope.menu_active = '6';
    // }
    // else if(url.indexOf('complaints')>1){
    //   $scope.menu_active = '7';
    // }

    // else{
    //   $scope.menu_active = '1';
    // }

    $scope.dirlocation = datagrab.completeUrlLocation;
    $scope.currentPage = 1;
    $scope.pageSize = 30;
    $scope.user_data = datagrab.user_data;
    $scope.user_token = datagrab.user_token;
    // $scope.admin_token = user_token;

    //! more data into modal window
    $scope.append_modal_info = function (value) {
      $scope.info = value;
      // console.log(JSON.stringify($scope.info));
      //$scope.get_all_users();
    };
    $scope.toggle_form = function (id, index) {
      $(".form_inverse_" + id).toggle(500);
      $(".form_" + id).toggle(500);
    };
    $scope.toggle_password_form = function () {
      $(".password_form_inverse").toggle(500);
      $(".password_form").toggle(500);
    };

    //* start
    $scope.change_admin_password = function () {
      $(".header_loader").show();

      var formData = new FormData($("#change_password")[0]);
      $.ajax({
        url: $scope.dirlocation + "adminauth/change_admin_password",
        type: "POST",
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        headers: { "gnice-authenticate": $scope.user_token },
        processData: false,
        success: function (answer) {
          console.log(result);
          
         
          var response = JSON.stringify(answer);
          var parsed = JSON.parse(response);
          var msg = angular.fromJson(parsed);
          $(".header_loader").hide(500);
          if (msg.status == "1") {
            $(".result").html(msg.message);
            $(".result").addClass("alert alert-info text-center");
            // $scope.$apply();
            $(".result").show(500);
            setTimeout(() => {
              $(".result").hide("500");
              $("#create_new_admin_form")[0].reset();
            }, 4000);
            $scope.toggle_password_form();
           
            $scope.$apply();
          } else {
           
            $(".result").addClass("alert alert-info text-center");
            $(".result").html(msg.message);
            $scope.$apply();
            $(".result").show(500);
            setTimeout(() => {
              $(".result").hide("500");
              $(".result").removeClass("alert alert-info text-center");
            }, 3000);
          }
        },
      });
    };
// just added
    $scope.isMobileDevice = function() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
      };
  
  
      $scope.hide_sidebar = function(){
        var check = $scope.isMobileDevice();
        if(check){
          // $('.sidebar-toggler').click();
          $('.sidebar-offcanvas').toggleClass('active')
        }
        
      }

//end just added
    //* end
  },
]);
