///////////// THIS IS THE BANNER CONTROLLER///////
///// THIS CONTROLS EVERY ACTIVITY ON THE INDEX PAGE
/////////////////////////

module.controller("bannerController", [
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
    //$('.loader').show();
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

    $scope.toggle_form = function (id) {
      $(".form_" + id).toggle(500);
      $(".btn_" + id).toggle(500);
    };

    //* Start

    $scope.onBannerValueChange = function (value) {
      //alert(JSON.stringify(value));
      let objectval = JSON.parse(value);
      $scope.selected_banner = objectval;
      //$scope.sub_categories = objectval.subcategory;
    }

    $scope.fetch_banner_types = function () {
      $(".loader").show();
      $(".result").hide();
      $.ajax({
        url: $scope.dirlocation + "adminapi/fetch_banner_types",
        type: "GET",
        async: true,
        cache: false,
        contentType: false,
        headers: {
          "gnice-authenticate": $scope.admin_token,
        },
        processData: false,
        success: function (result) {
          //alert(result);
          console.log(result);
          var response = JSON.stringify(result);
          var parsed = JSON.parse(response);
          var msg = angular.fromJson(parsed);
          $(".loader").hide();
          if (msg.status == "1") {
            $scope.banner_types = msg.data;
            $scope.$apply();
            $(".loader").hide();
            // $(".result").html(msg.message);
            // $(".result").show();
          } else {
            $(".loader").hide();
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

    $scope.fetch_all_banners = function () {
      $("#banner_loader").show(500);
      $(".result").hide();
      $.ajax({
        url: $scope.dirlocation + "adminapi/fetch_all_banners",
        type: "GET",
        async: true,
        cache: false,
        contentType: false,
        headers: {
          "gnice-authenticate": $scope.admin_token,
        },
        processData: false,
        success: function (result) {
          var response = JSON.stringify(result);
          var parsed = JSON.parse(response);
          var msg = angular.fromJson(parsed);
          $("#banner_loader").hide(500);
          if (msg.status == "1") {
            $scope.all_banners = msg.data;
            $scope.$apply();
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
    $scope.create_new_banner = function () {
      $(".loader").show();
      var formData = new FormData($("#create_new_banner")[0]);
      $.ajax({
        url: $scope.dirlocation + "adminapi/create_new_banner",
        type: "POST",
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        headers: { "gnice-authenticate": $scope.admin_token },
        processData: false,
        success: function (answer) {
          // console.log(answer);
          //alert(answer);
          var response = JSON.stringify(answer);
          var parsed = JSON.parse(response);
          var msg = angular.fromJson(parsed);
          $(".loader").hide();
          if (msg.status == "1") {
            $(".loader").hide();
            $(".result2").html(msg.message);
            $(".result2").addClass("alert alert-info");
            $(".result2").show(500);
            document.getElementById("create_new_banner").reset();
            $scope.fetch_all_banners();
            $scope.$apply();
            setTimeout(() => {
              $(".result2").hide("500");
              $(".result2").removeClass("alert alert-info");
            }, 4000);
            $("#addCategory")[0].reset();
          } else {
            $(".loader").hide();
            $(".result2").html(msg.message);
            $(".result2").addClass("alert alert-info");
            $(".result2").show(500);

            setTimeout(() => {
              $(".result2").hide("500");
              $(".result2").removeClass("alert alert-info");
            }, 3000);
          }
        },
      });
    };


    $scope.enable_or_disable_banner = function (code, banner, $index) {
      $(".banner_loader_"+ banner.banner_id).show(500);
      $(".icon_"+ banner.banner_id).hide(100);
      
      var formData = new FormData();

      formData.append("status", code);
      formData.append("banner_id", banner.banner_id);
      formData.append("banner_type", banner.type);
      $.ajax({
        url: $scope.dirlocation + "adminapi/disable_enable_banner",
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
          $(".banner_loader_"+ banner.id).hide(500);
          $(".icon_"+ banner.id).show();
          if (msg.status == "1") {
            banner.status = code;
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

    $scope.update_banner = function (id) {
      $(".banner_edit_loader_"+ id).show();
      $(".icon_edit_"+ id).hide();
      var formData = new FormData($("#update_banner")[0]);

      $.ajax({
        url: $scope.dirlocation + "adminapi/update_banner",
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
          $(".banner_edit_loader_"+ id).hide(500);
          $(".icon_edit_"+ id).show();
          if (msg.status == "1") {
            $(".result-edit").html(msg.message);
            $(".result-edit").addClass("alert alert-info");
            $(".result-edit").show(500);
            $scope.fetch_all_banners();
            $scope.$apply();

            setTimeout(() => {
              $(".result-edit").hide("500");
              $(".result-edit").removeClass("alert alert-info");
            }, 3000);
            $("#update_banner")[0].reset();
          } else {
            $(".result-edit").html(msg.message);
            $(".result-edit").addClass("alert alert-info");
            $(".result-edit").show(500);

            setTimeout(() => {
              $(".result-edit").hide("500");
              $(".result-edit").removeClass("alert alert-info");
            }, 3000);
          }
        },
      });
    };
  },
]);
