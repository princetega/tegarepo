///////////// THIS IS THE INDEXPAGE CONTROLLER///////
///// THIS CONTROLS EVERY ACTIVITY ON THE INDEX PAGE
/////////////////////////

module.controller("packagesController", [
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
    $scope.fieldcounter = 1;
    // $(".loader").show();
    $(".result").hide();
    var url = window.location.href;
    if (url.indexOf("#") > 1) {
      var page = window.location.href.split("#");
      var pager = page[1].split("=").pop();

      if (
        pager == "" ||
        pager == "undefined" ||
        pager == null ||
        pager == "0"
      ) {
        pager = "1";
      }
    } else {
      pager = "1";
    }

    $scope.dirlocation = datagrab.completeUrlLocation;
    $scope.currentPage = pager;
    $scope.pageSize = 5;
    $scope.admin_data = $localStorage.user_data;
    $scope.admin_token = $localStorage.user_token;
    setTimeout(function () {
      $scope.$apply();
    }, 0);

    $scope.show_textinput = function (id) {
      $(".form_" + id).toggle(500);
      $(".form_inverse_" + id).toggle(500);
    };
    // $scope.show_textinput = function (id) {
    //   $(".title_" + id).show();
    //   $(".content_" + id).show();
    //   $(".body_" + id).hide();
    //   $(".button_save_" + id).show();
    //   $(".button_edit_" + id).hide();
    // };
    $scope.toggle_form = function (id) {
      $(".price_" + id).toggle(500);
      $(".price_inverse_" + id).toggle(500);
    };

    $scope.get_all_account_packages = function () {
      $("#account_loader").show(500);
      $(".result").hide();
      $.ajax({
        url: $scope.dirlocation + "adminapi/get_account_packages",
        type: "GET",
        async: true,
        cache: false,
        contentType: false,
        headers: {
          "gnice-authenticate":
            $scope.admin_token + ":email:" + $scope.admin_data.email,
        },
        processData: false,
        success: function (result) {
          console.log(result);

          //alert(JSON.stringify(result));

          var response = JSON.stringify(result);
          var parsed = JSON.parse(response);
          var msg = angular.fromJson(parsed);
          $("#account_loader").hide(500);
          $(".result").show();
          if (msg.status == "1") {
            $scope.all_packages = msg.data;
            // $(".result").html(msg.message);
            $(".result").hide();
            $scope.$apply();
          } else {
            $(".result").html(msg.message);
            $(".result").show(500);
          }
        },
      });
    };

    $scope.edit_package_content = function (id, index) {
      $(".content_loader_"+ id).show(500);
      $(".icon_content_"+ id).hide(500);

      var formData = new FormData($("#edit_package_content_" + id)[0]);
      $.ajax({
        url: $scope.dirlocation + "adminapi/update_package_content",
        type: "POST",
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        headers: { "gnice-authenticate": $scope.admin_token },
        processData: false,
        success: function (answer) {
          console.log(answer);

          var response = JSON.stringify(answer);
          var parsed = JSON.parse(response);
          var msg = angular.fromJson(parsed);
          $(".content_loader_"+ id).hide(500);
          $(".icon_content_"+ id).show(500);
          if (msg.status == "1") {
          
            $(".result").html(msg.message);
            
            $(".result").addClass("alert alert-info");
            $(".result").show();
            
            
            setTimeout(() => {
              
              $(".result").hide("500");
              $scope.get_all_account_packages()
            }, 3000);
          } else {
            $(".result").addClass("alert-success");
            $(".result").html(msg.message);
            $(".result").show();
          }
        },
      });
    };

    $scope.edit_package = function (package, index) {
      $(".account_loader_"+ package.package_id).show();
      $(".icon_loader_"+ package.package_id).hide();
      var formData = new FormData($("#edit_package_" + package.package_id)[0]);
      // return;
      $.ajax({
        url: $scope.dirlocation + "adminapi/update_package",
        type: "POST",
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        headers: { "gnice-authenticate": $scope.admin_token },
        processData: false,
        success: function (answer) {
          console.log(answer);
          //alert(answer);
          var response = JSON.stringify(answer);
          var parsed = JSON.parse(response);
          var msg = angular.fromJson(parsed);
         
          $(".account_loader_"+ package.package_id).hide(500);
          $(".icon_loader_"+ package.package_id).show(500);

          if (msg.status == "1") {
            //alert(JSON.stringify(msg.data));
            
            $(".result").html(msg.message);
            $(".result").addClass("alert alert-info");
            $(".result").show(500);
            
            setTimeout(() => {
              $(".result").hide("500");
              $(".result").removeClass("alert alert-info");
              $scope.get_all_account_packages();
            }, 3000);

            // $("#edit_package_" + id)[0].reset();
          } else {
            $(".result").html(msg.message);
            $(".result").addClass("alert alert-info");
            $(".result").show(500);

            setTimeout(() => {
              $(".result").hide("500");
              $(".result").removeClass("alert alert-info");
            }, 3000);
          }
        },
      });
    };

    $scope.toggle_package_status = function (code, info) {
      $(".account_status_loader_"+ info.package_id).show();
      $(".icon_status_"+ info.package_id).hide();
      var formData = new FormData();

      formData.append("status", code);
      formData.append("id", info.package_id);
      // return;
      $.ajax({
        url: $scope.dirlocation + "adminapi/toggle_package_status",
        data: formData,
        type: "POST",
        async: true,
        cache: false,
        contentType: false,
        headers: { "gnice-authenticate": $scope.admin_token },
        processData: false,
        success: function (result) {
          console.log(result);
      
          var response = JSON.stringify(result);
          var parsed = JSON.parse(response);
          var msg = angular.fromJson(parsed);
          if (msg.status == "1") {

            $(".account_status_loader_"+ info.package_id).show();
            $(".icon_loader_"+ info.package_id).hide();
            info.status = code;
            $scope.$apply();
        
            $(".result").html(msg.message);
            $(".result").addClass("alert alert-info");
            $(".result").show(500);

            setTimeout(() => {
              $(".result").hide("500");
              $(".result").removeClass("alert alert-info");
            }, 3000);
          } else {
    
            $(".result").html(msg.message);
            $(".result").addClass("alert alert-info");
            $(".result").show(500);

            setTimeout(() => {
              $(".result").hide("500");
              $(".result").removeClass("alert alert-info");
            }, 3000);
          }
        },
      });
    };
    $scope.toggle_package_content_status = function (code, info) {
      $(".content_status_loader_"+ info.content_id).show();
      $(".icon_content_status_"+ info.content_id).hide();
      var formData = new FormData();
      formData.append("status", code);
      formData.append("id", info.content_id);

      console.table(code, info);
      $.ajax({
        url: $scope.dirlocation + "adminapi/toggle_package_content_status",
        data: formData,
        type: "POST",
        async: true,
        cache: false,
        contentType: false,
        headers: { "gnice-authenticate": $scope.admin_token },
        processData: false,
        success: function (result) {
          console.log(result);
         
          var response = JSON.stringify(result);
          var parsed = JSON.parse(response);
          var msg = angular.fromJson(parsed);
          $(".content_status_loader_"+ info.content_id).hide(500);
          $(".icon_content_status_"+ info.content_id).show(500);
          if (msg.status == "1") {
            info.status = code;
            $scope.$apply();
            $(".result").html(msg.message);
            $(".result").addClass("alert alert-info");
            $(".result").show(500);

            setTimeout(() => {
              $(".result").hide("500");
              $(".result").removeClass("alert alert-info");
            }, 3000);
          } else {
            $(".result").html(msg.message);
            $(".result").addClass("alert alert-info");
            $(".result").show(500);

            setTimeout(() => {
              $(".result").hide("500");
              $(".result").removeClass("alert alert-info");
            }, 3000);
          }
        },
      });
    };
  },
]);
