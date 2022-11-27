///////////// THIS IS THE LISTING CONTROLLER///////
///// THIS CONTROLS EVERY ACTIVITY ON THE LISTING PAGE
/////////////////////////

module.controller("listingController", [
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
    $scope.pageSize = 10;
    $scope.admin_data = $localStorage.user_data;
    $scope.admin_token = $localStorage.user_token;
    setTimeout(function () {
      $scope.$apply();
    }, 0);

    //! Starts

    // $scope.loader_control = function(e){
    //   $(e).hide(500);
    // };

    $scope.get_all_products = function () {
      $(".result").hide();
      $('#listing_loader').show(500);
      $.ajax({
        url: $scope.dirlocation + "adminapi/get_all_products",
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

          var response = JSON.stringify(result);
          var parsed = JSON.parse(response);
          var msg = angular.fromJson(parsed);

          $('#listing_loader').hide(500);
          // console.table(JSON.stringify(msg));
          if (msg.status == "1") {
            // $scope.loader_control('#listing_loader');
            $scope.all_listings = msg.data;
            $scope.notification = msg.msg;
            $scope.status == msg.status;
            $scope.$apply();
            $(".result").show();
          } else {
            // $scope.loader_control('#' + listing.id);
            $(".result").html(msg.message);
            $(".result").show();
          }
        },
      });
    };

    $scope.enable_or_disable_listing = function (code, listing, index) {
      alert('got here');
      var formData = new FormData();

      formData.append("status", code);
      formData.append("product_code", listing.product_code);
      $('.loader_listing_'+listing.id).show();
      $('.icon_listing_'+listing.id).hide();
      $.ajax({
        url: $scope.dirlocation + "adminapi/disable_enable_ads",
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

          $('.loader_listing_'+listing.id).hide(500);
          $('.icon_listing_'+listing.id).show();
          if (msg.status == "1") {
            
            listing.status = code;
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

    $scope.append_modal_value = function (value) {
      $scope.listingValue = value;
    };
    $scope.get_product_reviews = function(product_id){
      //alert(product_id);
      $.ajax({
        url: $scope.dirlocation + "api/get_product_reviews?id="+product_id,
        type: "GET",
        async: true,
        cache: false,
        contentType: "application/json",
        headers: { "gnice-authenticate": "gnice-web" },
        processData: false,
        success: function (result) {
          var response = JSON.stringify(result);
          var parsed = JSON.parse(response);
          var msg = angular.fromJson(parsed);
          if(msg.status=='1'){
            $scope.product_reviews= msg.data;
            $scope.calculate_average_reviews(msg.data);
            $scope.$apply();
          }
          //alert($localStorage.fb_data);return
        },
      });
    }
  },
]);
