///////////// THIS IS THE INDEXPAGE CONTROLLER///////
///// THIS CONTROLS EVERY ACTIVITY ON THE INDEX PAGE
/////////////////////////

module.controller("productController", [
  "$scope",
  "$filter",
  "$sce",
  "$http",
  "infogathering",
  "$routeParams",
  "$localStorage",
  "$sessionStorage",
  function (
    $scope,
    $filter,
    $sce,
    $http,
    datagrab,
    $routeParams,
    $localStorage,
    $sessionStorage
  ) {
    $scope.dirlocation = datagrab.completeUrlLocation;
    $scope.currentPage = 1;
    $scope.pageSize = 30;
    $scope.user_data = $localStorage.user_data;
    $scope.user_token = $localStorage.user_token;

    // $('#butn').click(function(event) {
    // event.preventDefault();
    // var up_id = $('#up_courseid').val();
    //    var sub = $('#cat').val();
    //    //alert(sub);
    //    if (sub != '') {
    //      $localStorage.valueToShares = sub;
    //  window.location.assign(
    //                 'CategoryList');
    //    }

    //  })

    $scope.update_google_data = function () {
      alert("googodd");
    };

    $scope.add_product = function () {
      if($scope.input_files_values.length==0){
        alert("Please select an image file");
        return;
      }

      $(".loader").show();
      var formData = new FormData($("#add_product")[0]);
      for(a=0;a<$scope.input_files_values.length;a++){
        formData.append('files['+a+']', $scope.input_files_values[a]);
      }
      $.ajax({
        url: $scope.dirlocation + "api/add_product",
        type: "POST",
        headers: { "gnice-authenticate": $scope.user_token },
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        enctype: "multipart/form-data",
        crossDomain: true,
        processData: false,
        success: function (answer) {
          alert(JSON.stringify(answer));
          var response = JSON.stringify(answer);
          var parsed = JSON.parse(response);
          var msg = angular.fromJson(parsed);
          $(".loader").hide();
          if (msg.status == "1") {
            $(".loader").hide();
            $(".result").html(msg.message);
            $(".result").show();
            //alert(msg.message);
            //window.location.assign('Advert');
          } else {
            $(".loader").hide();
            $(".result").html(msg.message);
            $(".result").show();
            //alert(msg.message);
          }
        },
      });
    };

    $scope.update_product = function () {
      //alert($scope.product_images.length);return;
      {$scope.product_images.length==0 && $scope.input_array_values.length==0 ? (
      alert("Please attach an image") 
      ):
      formData = new FormData($("#update_product")[0]);
      for(a=0;a<$scope.input_files_values.length;a++){
        formData.append('files['+a+']', $scope.input_files_values[a]);
      }
      $(".loader").show();
      $.ajax({
        url: $scope.dirlocation + "api/update_product",
        type: "POST",
        headers: { "gnice-authenticate": $scope.user_token},
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        enctype: "multipart/form-data",
        crossDomain: true,
        processData: false,
        success: function (answer) {
          ///alert(JSON.stringify(answer));
          var response = JSON.stringify(answer);
          var parsed = JSON.parse(response);
          var msg = angular.fromJson(parsed);
          $(".loader").hide();
          if (msg.status == "1") {
            $(".loader").hide();
            $(".result").html(msg.message);
            $(".result").show();
            //alert(msg.message);
            setTimeout(function () {
              window.location.assign('my_products');
            }, 1500);

            
          } else {
            $(".loader").hide();
            $(".result").html(msg.message);
            $(".result").show();
            //alert(msg.message);
          }
        },
      });
      }
      
      
    };

    // FIXME: delete a profile

    $scope.delete_product = function (product, index) {
      var conf = confirm(
        "DO YOU WANT TO DELETE THIS AD '" + product.name + "'?"
      );
      if (conf) {
        //$(".loader2_" + product.id).show();
        $.ajax({
          url:
            $scope.dirlocation +
            "api/deleteProductImage?product_id=" +
            product.id +
            "&&seller_id=" +
            $scope.user_data.seller_id,
          async: true,
          cache: false,
          contentType: false,
          headers: { "gnice-authenticate": $scope.user_token },
          processData: false,
          success: function (result) {
            alert(result);
            var response = JSON.stringify(result);
            var parsed = JSON.parse(response);
            var msg = angular.fromJson(parsed);
            $(".loader2_" + product.id).hide();
            if (msg.status == "1") {
              alert(msg.message);
              $scope.products.splice(index, 1);
              $scope.$apply();
            }
          },
        });
      }
    };

    $scope.delete_uploaded_product_image = function (product_id, $index) {
      
      var conf = confirm(
        "DO YOU WANT TO DELETE THIS ALREADY UPLOADED IMAGE ?"
      );
      if (conf) {
        $(".loader2_" + $index).show();
        $.ajax({
          url:
            $scope.dirlocation +
            "api/deleteProductImage?product_id=" +
            product_id +
            "&index=" +$index,
          async: true,
          cache: false,
          contentType: false,
          headers: { "gnice-authenticate": $scope.user_token},
          processData: false,
          success: function (result) {
            //alert(result);
            var response = JSON.stringify(result);
            var parsed = JSON.parse(response);
            var msg = angular.fromJson(parsed);
            $(".loader2_" + $index).hide();
            if (msg.status == "1") {
              alert(msg.message);
              $scope.product_images.splice($index, 1);
              $scope.$apply();
            }
          },
        });
      }
    };

    
    $scope.fetch_all_product_of_seller = function () {
      $.ajax({
        url:
          $scope.dirlocation +
          "api/fetch_all_product_of_seller?seller_id=" +
          $scope.user_data.seller_id,
        type: "GET",
        //data: JSON.stringify({'user_email':'mike98989@gmail.com'}),
        async: true,
        cache: false,
        contentType: "application/json",
        headers: { "gnice-authenticate": $scope.user_token },
        processData: false,
        success: function (result1) {
          //alert(result1);
          var response1 = JSON.stringify(result1);
          var parsed1 = JSON.parse(response1);
          var msg1 = angular.fromJson(parsed1);
          $(".loader").hide();
          //if(msg1.status=='1'){
          $scope.products = msg1.data;
          $scope.products_count = msg1.data.length;
          $scope.$apply();
          $scope.get_user_account_package_usage_breakdown();
          //alert(JSON.stringify($scope.products));
          //}
        },
      });
    };

    $scope.get_user_account_package_usage_breakdown = function () {
      $scope.user_remaining_product_slot =
        $scope.user_data.seller_account_details.product_count * 1 -
        $scope.products_count * 1;
      //alert($scope.user_remaining_product_slot);
      var date1 = new Date($scope.user_data.account_type_activation_date);
      var date2 = new Date();
      var Difference_In_Time = date2.getTime() - date1.getTime();
      // To calculate the no. of days between two dates
      var Difference_In_Days = Math.round(
        Difference_In_Time / (1000 * 3600 * 24)
      );
      $scope.slot_remaining_duration =
        $scope.user_data.seller_account_details.duration_in_days * 1 -
        Difference_In_Days;
      //alert(Difference_In_Days);
      $scope.$apply();
    };

    $scope.message_product_seller = function () {
      $(".loader").show();
      var formData = new FormData($("#message_product_seller")[0]);
      $.ajax({
        url: $scope.dirlocation + "api/message_product_seller",
        type: "POST",
        headers: { "gnice-authenticate": $scope },
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        enctype: "multipart/form-data",
        crossDomain: true,
        processData: false,
        success: function (answer) {
          //alert(answer);
          var response = JSON.stringify(answer);
          var parsed = JSON.parse(response);
          var msg = angular.fromJson(parsed);
          $(".loader").hide();
          if (msg.status == "1") {
            $(".loader").hide();
            $(".result").html(msg.message);
            $(".result").show();
          } else {
            $(".loader").hide();
            $(".result").html(msg.message);
            $(".result").show();
            alert(msg.message);
          }
        },
      });
    };

    $scope.add_profileDetails = function () {
      $(".loader").show();

      //alert($('#category').val());
      //alert(sub);
      var formData = new FormData($("#add_profileDetails")[0]);
      $.ajax({
        url: $scope.dirlocation + "api/add_profileDetails",
        type: "POST",
        transformRequest: angular.identity,
        //data: JSON.stringify({'user_email':'mike98989@gmail.com'}),
        headers: { "gnice-authenticate": "gnice-web" },
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        transformRequest: angular.identity,
        enctype: "multipart/form-data",

        crossDomain: true,
        processData: false,
        success: function (answer) {
          alert(answer);
          var response = JSON.stringify(answer);
          var parsed = JSON.parse(response);
          var msg = angular.fromJson(response);
          $(".loader").hide();
          if (msg.status == "1") {
            $(".loader").hide();
            $(".result").html(msg.message);
            $(".result").show();
            alert(msg.message);
          } else {
            $(".loader").hide();
            $(".result").html(msg.message);
            $(".result").show();
            alert(msg.message);
          }
        },
      });
    };

    $scope.add_profileImg = function () {
      $(".loader").show();

      var sub = $("#sub_category").val();
      //alert($('#category').val());
      //alert(sub);

      var formData = new FormData($("#add_profileImg")[0]);
      $.ajax({
        url: $scope.dirlocation + "api/add_profileImg",
        type: "POST",
        transformRequest: angular.identity,
        //data: JSON.stringify({'user_email':'mike98989@gmail.com'}),
        headers: { "gnice-authenticate": "gnice-web" },
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        transformRequest: angular.identity,
        enctype: "multipart/form-data",

        crossDomain: true,
        processData: false,
        success: function (answer) {
          alert(answer);
          var response = JSON.stringify(answer);
          var parsed = JSON.parse(response);
          var msg = angular.fromJson(response);
          $(".loader").hide();
          if (msg.status == "1") {
            $(".loader").hide();
            $(".result").html(msg.message);
            $(".result").show();
            alert(msg.message);
          } else {
            $(".loader").hide();
            $(".result").html(msg.message);
            $(".result").show();
            alert(msg.message);
          }
        },
      });
    };


    $scope.attach_image = function (input) {
      for(var a=0;a<input.files.length;a++){
        $scope.input_files_values.push(input.files[a]);
        $scope.appendDataUrl(input.files[a],a);
      }
      //console.log($scope.input_files_values);
    };

    
    $scope.delete_product_image = function(index){
      $scope.input_array_values.splice(index,1);
      $scope.input_files_values.splice(index,1);
      console.log($scope.input_files_values);
    }

    $scope.appendDataUrl = function (filename,loopid){

      let reader = new FileReader();
      reader.readAsDataURL(filename);
        reader.onload = function (e) {
          $scope.input_array_values.push(e.target.result);
          $scope.$apply();
        };
        
    }

    $scope.onCategoryValueChange = function (value) {
      let objectval = JSON.parse(value);
      $scope.selected_category = objectval;
      $scope.sub_categories = objectval.subcategory;
    }

    $scope.onSubCategoryValueChange = function(value){
      let objectval = JSON.parse(value);   
      $scope.selected_subcategory = objectval;
      //$scope.sub_category = objectval.subcategory;
    }

    $scope.fetch_all_categories_and_sub_categories = function () {
      $.ajax({
        url: $scope.dirlocation + "api/fetch_all_categories_and_sub_categories",
        type: "GET",
        //data: JSON.stringify({'user_email':'mike98989@gmail.com'}),
        async: true,
        cache: false,
        contentType: "application/json",
        headers: { "gnice-authenticate": "gnice-web" },
        processData: false,
        success: function (result) {
        //alert(JSON.stringify(result));
       var response=JSON.stringify(result);
       var parsed = JSON.parse(response);
       var msg=angular.fromJson(parsed);
       
       console.log(msg);
       //alert(msg.data[0].title);
   //alert(msg.data[0].subcategory[6].parent_id);
       $('.loader').hide(); 
       if(msg.status=='1'){  
       $scope.categories_and_sub =msg.data;
    
       $scope.$apply();
       //alert(JSON.stringify($scope.categories));
       }
       
        }
      });
    }

    

     $scope.searchCat = function () {
      var cad = $('#cat').val();
      if (cad == "" ) {
      
     } else {
      var splits = cad.split(",");
      $localStorage.valueToShare4 = splits[0];
      $localStorage.valueToShare5 = splits[1];

       window.location.assign(
                    'Category');
     }
      
     }

     
      $scope.fetch_product_by_term = function(){
      var formData = new FormData($('#fetch_product_by_term')[0]);
      $.ajax({
        url: $scope.dirlocation+'api/fetch_product_by_term',
           type: 'GET',
              method : "post",
             transformRequest: angular.identity,
               //data: JSON.stringify({'user_email':'mike98989@gmail.com'}),
               headers:{'gnice-authenticate':'gnice-web'}, 
               data: formData,
               async: true,
               cache: false,
               contentType: false,
                transformRequest: angular.identity,
               enctype: 'multipart/form-data',
              
               crossDomain: true,
               processData: false,
        success: function (result3) {
        alert(result3);
       var response3=JSON.stringify(result3);
       var parsed3 = JSON.parse(response3);
       var msg3=angular.fromJson(response3);
       console.log(msg3);
       $('.loader').hide(); 
       if(msg3.status=='1'){  
        alert(msg3);
        console.log(msg3.data.image);
       $scope.singleUser = msg3.data;
      
       $scope.$apply();
       //alert(JSON.stringify($scope.categories));
       }
        }
      });
    };

    $scope.searchCat = function () {
      var cad = $("#cat").val();
      if (cad == "") {
      } else {
        var splits = cad.split(",");
        $localStorage.valueToShare4 = splits[0];
        $localStorage.valueToShare5 = splits[1];

        window.location.assign("Category");
      }
    };

    $scope.fetch_product_by_term = function () {
      var formData = new FormData($("#fetch_product_by_term")[0]);
      $.ajax({
        url: $scope.dirlocation + "api/fetch_product_by_term",
        type: "GET",
        method: "post",
        transformRequest: angular.identity,
        //data: JSON.stringify({'user_email':'mike98989@gmail.com'}),
        headers: { "gnice-authenticate": "gnice-web" },
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        transformRequest: angular.identity,
        enctype: "multipart/form-data",

        crossDomain: true,
        processData: false,
        success: function (result3) {
          //alert(result3);
          var response3 = JSON.stringify(result3);
          var parsed3 = JSON.parse(response3);
          var msg3 = angular.fromJson(parsed3);

          $(".loader").hide();
          if (msg3.status == "1") {
            $scope.product = msg3.data;
            $scope.product_image = $scope.split_image($scope.product.image);
            $scope.fetch_related_products();
            $scope.$apply();
          }
        },
      });
    };

    $scope.fetch_single_product = function () {
      var url = window.location.href;
      var split_url = url.split("/").pop();
      if (split_url) {
        $.ajax({
          url: $scope.dirlocation + "api/fetch_single_product?id=" + split_url,
          type: "GET",
          async: true,
          cache: false,
          contentType: false,
          headers: { "gnice-authenticate": "gnice-web" },
          processData: false,
          success: function (result3) {
            //alert(result3);
            var response3 = JSON.stringify(result3);
            var parsed3 = JSON.parse(response3);
            var msg3 = angular.fromJson(parsed3);

            $(".loader").hide();
            if (msg3.status == "1") {
              $scope.product = msg3.data;
              $scope.product_image = $scope.split_image($scope.product.image);
              $scope.fetch_related_products();
              $scope.$apply();
            }
          },
        });
      }
    };

    $scope.fetch_related_products = function () {
      $.ajax({
        url:
          $scope.dirlocation +
          "api/fetch_related_products?sub_cat_id=" +
          $scope.product.sub_category +
          "&brand=" +
          $scope.product.brand +
          "&product_code=" +
          $scope.product.product_code,
        type: "GET",
        cache: false,
        contentType: false,
        headers: { "gnice-authenticate": "gnice-web" },
        processData: false,
        success: function (result7) {
          var response7 = JSON.stringify(result7);
          var parsed7 = JSON.parse(response7);
          var msg7 = angular.fromJson(parsed7);
          $(".loader").hide();
          if (msg7.status == "1") {
            $scope.relatedProducts = msg7.data;
            $scope.$apply();
            //alert(JSON.stringify($scope.categories));
          }
        },
      });
    };

    $scope.localStorage_get = function(key){
      $scope[key] = $localStorage[key];
      $scope.$apply();
    };

    $scope.localStorage_save = function (key, value, url) {
      $localStorage[key] = value;
      //$scope[key] = $localStorage[key];
      //alert(JSON.stringify(value));
      if (url != "") {
        $scope.go_to_url(url);
      }
    };

    $scope.go_to_url = function (url) {
      //alert($scope.dirlocation+'admindashboard/'+url);
      window.location.href = $scope.dirlocation + "dashboard/" + url;
    };

    $scope.fetch_all_product_brand = function () {
      $.ajax({
        url:
          $scope.dirlocation +
          "api/fetch_all_product_brand?id=" +
          $localStorage.valueToShare4,
        type: "GET",

        //data: JSON.stringify({'user_email':'mike98989@gmail.com'}),

        cache: false,
        contentType: false,
        headers: { "gnice-authenticate": "gnice-web" },
        processData: false,
        success: function (response8) {
          //alert(response8);
          var responses8 = JSON.stringify(response8);
          var parsed8 = JSON.parse(responses8);
          var data8 = angular.fromJson(responses8);
          //console.log(data7);
          $(".loader").hide();
          if (data8.status == "1") {
            $scope.allBrands = data8.data;
            $scope.$apply();
            //alert(JSON.stringify($scope.categories));
          }
        },
      });
    };
    $scope.fetch_all_product_color = function () {
      $.ajax({
        url:
          $scope.dirlocation +
          "api/fetch_all_product_color?id=" +
          $localStorage.valueToShare4,
        type: "GET",

        //data: JSON.stringify({'user_email':'mike98989@gmail.com'}),

        cache: false,
        contentType: false,
        headers: { "gnice-authenticate": "gnice-web" },
        processData: false,
        success: function (response9) {
          //alert(response9);
          var responses9 = JSON.stringify(response9);
          var parsed9 = JSON.parse(responses9);
          var data9 = angular.fromJson(responses9);
          //console.log(data7);
          $(".loader").hide();
          if (data9.status == "1") {
            $scope.allColors = data9.data;
            $scope.$apply();
            //alert(JSON.stringify($scope.categories));
          }
        },
      });
    };

    $scope.fetch_selected_sub_category = function () {
      $.ajax({
        url:
          $scope.dirlocation +
          "api/fetch_selected_sub_category?id=" +
          $localStorage.valueToShare5,
        type: "GET",

        //data: JSON.stringify({'user_email':'mike98989@gmail.com'}),

        cache: false,
        contentType: false,
        headers: { "gnice-authenticate": "gnice-web" },
        processData: false,
        success: function (result8) {
          //alert(result8);
          var response8 = JSON.stringify(result8);
          var parsed8 = JSON.parse(response8);
          var msg8 = angular.fromJson(response8);
          console.log(msg8);
          $(".loader").hide();
          if (msg8.status == "1") {
            $scope.relSubCats = msg8.data;
            $scope.$apply();
            //alert(JSON.stringify($scope.categories));
          }
        },
      });
    };

    $scope.fetch_single_sub_category = function () {
      $.ajax({
        url:
          $scope.dirlocation +
          "api/fetch_single_sub_category?id=" +
          $localStorage.valueToShare4,
        type: "GET",

        //data: JSON.stringify({'user_email':'mike98989@gmail.com'}),

        cache: false,
        contentType: false,
        headers: { "gnice-authenticate": "gnice-web" },
        processData: false,
        success: function (result8) {
          //alert(result8);
          var response8 = JSON.stringify(result8);
          var parsed8 = JSON.parse(response8);
          var msg8 = angular.fromJson(response8);
          console.log(msg8);
          $(".loader").hide();
          if (msg8.status == "1") {
            $scope.singleSubCats = msg8.data;
            $scope.$apply();
            //alert(JSON.stringify($scope.categories));
          }
        },
      });
    };

    $scope.fetch_selected_product = function () {
      var pid = $localStorage.valueToShare;
      $.ajax({
        url: $scope.dirlocation + "api/fetch_selected_product",
        type: "GET",
        method: "post",
        //data: JSON.stringify({'user_email':'mike98989@gmail.com'}),
        data: $localStorage.valueToShare1,
        async: true,
        cache: false,
        contentType: false,
        headers: { "gnice-authenticate": "gnice-web" },
        processData: false,
        success: function (result4) {
          //alert(result4);
          var response4 = JSON.stringify(result4);
          var parsed4 = JSON.parse(response4);
          var msg4 = angular.fromJson(response4);
          $(".loader").hide();
          if (msg4.status == "1") {
            $scope.selectedProducts = msg4.data;
            $scope.$apply();
            //alert(JSON.stringify($scope.categories));
          }
        },
      });
    };

    $scope.search = function (item) {
      if ($scope.searchText == undefined) {
        return true;
      } else {
        if (
          item.name.toLowerCase().indexOf($scope.searchText.toLowerCase()) !=
            -1 ||
          item.brand.toLowerCase().indexOf($scope.searchText.toLowerCase()) !=
            -1 ||
          item.color.toLowerCase().indexOf($scope.searchText.toLowerCase()) !=
            -1 ||
          item.price.toLowerCase().indexOf($scope.searchText.toLowerCase()) !=
            -1 ||
          item.productCategory
            .toLowerCase()
            .indexOf($scope.searchText.toLowerCase()) != -1 ||
          item.productSubCategory
            .toLowerCase()
            .indexOf($scope.searchText.toLowerCase()) != -1
        ) {
          return true;
        }
      }
      return false;
    };

    $scope.brand = function () {
      $("body").delegate(".brands", "click", function (event) {
        event.preventDefault();
        var b = $(this).attr("data-brand");
        $scope.searchBrand = b;
      });
    };

    $scope.fetch_required_table = function () {
      $.ajax({
        url: $scope.dirlocation + "api/fetch_required_table",
        type: "GET",
        //data: JSON.stringify({'user_email':'mike98989@gmail.com'}),
        async: true,
        cache: false,
        contentType: false,
        enctype: "multipart/form-data",
        headers: { "gnice-authenticate": "gnice-web" },
        crossDomain: true,
        processData: false,
        success: function (answer) {
          //alert(answer);
          var response = JSON.stringify(answer);
          var parsed = JSON.parse(response);
          var msg = angular.fromJson(parsed);

          if (msg.status == "1") {
            console.log(msg.data);
            $scope.requiredState = msg.data.states;
            $scope.requiredPhone = msg.data.phone_makes;
            $scope.requiredCar = msg.data.car_makes;
            $scope.requiredProperty = msg.data.property_types;
            $scope.requiredCondition = msg.data.conditions;

            $scope.$apply();
            //alert(JSON.stringify($scope.categories));
          }
        },
      });
    };
  },
]);
