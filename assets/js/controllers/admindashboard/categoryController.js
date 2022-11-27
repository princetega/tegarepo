///////////// THIS IS THE INDEXPAGE CONTROLLER///////
///// THIS CONTROLS EVERY ACTIVITY ON THE INDEX PAGE
/////////////////////////

module.controller("categoryController", [
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
    $scope.show_image = function (event) {

      const Irray =[];
      const preview = document.querySelector('.preview');
      const images = event.target.files;

      $(".number_of_upload").html(`${images.length} images selected`);

      /*
      for( i = 0; i < images.length; i++){
          let img = images[i]
          let reader = new FileReader();
          reader.onload = (function(event){
          console.log(img.result);
          let getTarget = event.target;
          $(`
            
          <div class="position-relative fig  flex-grow-1" style="width: 100px;min-height: 100px; height:100px;">
          <img src="${event.target.result}" class="block" alt="" style="width: 100px; height:100px;">
          <a href="" class="stretched-link remove-img">
            <i class="mdi mdi-close text-dark"
              style="position: absolute; left: 50%;top: 50%; transform: translate(-50%,-50%) ;cursor: pointer;"></i>
          </a>
        </div>
          
            `).insertAfter(".preview");

        $(".remove-img").click(function(){
          console.log(this);
          $(this).parent(".img-thumbnail").remove();
        })

        });
        reader.readAsDataURL(img);
      }
      */
     
      for( img of images){

        console.log(img.lastModified);
        let reader = new FileReader();
        let figure = document.createElement("figure");
        let a = document.createElement("a");
        Irray.push(img)
        let figcaption = document.createElement("figcaption");
        figcaption.style.cssText = "font-size: 10px ; color: #777";
        figcaption.innerHTML = img.name;
        figure.style.cssText = "width: 100px;height: 100px; margin: 5px; padding:1px;position:relative; cursor:pointer;"
        figure.setAttribute("id", img.lastModified);
        figure.appendChild(figcaption);
        console.log(Irray.indexOf(img));
        reader.onload=()=>{
          let imgTag = document.createElement("img");
          imgTag.classList.add('img-thumbnail','img-fluid');
          a.classList.add("stretched-link");
          imgTag.setAttribute("src", reader.result);
          figure.insertBefore(imgTag, figcaption);
          // figure.appendChild(a);
        }
        preview.appendChild(figure);
        reader.readAsDataURL(img);
      
        /**
         * pass onclick="delete_image(images.indexOf(img))"
         *  function delete_image(e) { images.splice(e,1)}
         * 
         * */  

      }

      $("figure").click(function(){
        console.log(this);
        $(this).remove();
        // console.log($('#files').$(this));
      })

      

    };
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

    $scope.loader_control = function (e) {
      $(e).hide(1000);
    };

    $scope.get_all_cat_and_sub_cat = function () {
      $("#category_loader").show();
      $(".result").hide();

      $.ajax({
        url: $scope.dirlocation + "adminapi/get_all_cat_and_sub_cat",
        type: "GET",
        async: true,
        cache: false,
        contentType: false,
        headers: {
          "gnice-authenticate": "gnice-web",
        },
        processData: false,
        success: function (result) {
          console.log(result);
          var response = JSON.stringify(result);
          var parsed = JSON.parse(response);
          var msg = angular.fromJson(parsed);
          // $scope.loader_control('#category_loader');
          $("#category_loader").hide(500);

          if (msg.status == "1") {
            $scope.all_cat_and_sub = msg.data;

            $scope.$apply();
            $(".result").hide();
          } else {
            $(".result").html(msg.message);
            $(".result").show(500);
          }
        },
      });
    };

    $scope.add_new_category = function () {
      $("#add_cat_loader").show(500);
      var formData = new FormData($("#addCategory")[0]);
      $.ajax({
        url: $scope.dirlocation + "adminapi/add_category",
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
          console.log(answer);
          $("#add_cat_loader").hide(500);
          if (msg.status == "1") {
            $(".result").html(msg.message);
            $(".result").show();
            $scope.get_all_cat_and_sub_cat();
            $("#addCategory")[0].reset();
          } else {
            $(".result").html(msg.message);
            $(".result").show();
          }
        },
      });
    };
    $scope.show_images = function () {
      alert("got here");
    };
    $scope.update_category = function (id) {
      $(".edit_" + id).show(500);
      $(".icon_edit_" + id).hide();

      var formData = new FormData($("#updateCategory")[0]);
      $.ajax({
        url: $scope.dirlocation + "adminapi/update_category",
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

          $(".edit_" + id).hide(500);
          $(".icon_edit_" + id).show();

          if (msg.status == "1") {
            $(".result-c").html(msg.message);
            $(".result-c").show(500);
            $scope.get_all_cat_and_sub_cat();
            $scope.$apply();

            $("#updateCategory")[0].reset();
          } else {
            $(".result-c").html(msg.message);
            $(".result-c").show();
          }
        },
      });
    };
    $scope.localStorage_get = function (key) {
      $scope[key] = $localStorage[key];
    };
    $scope.update_sub_category = function (subCat, $index) {
      let id = subCat.sub_id;
      console.log(subCat.sub_id);
      console.log($index);
      $(".edit_sub_" + id).show(200);
      $(".icon_sub_" + id).hide(100);

      var formData = new FormData($("#update_sub_category_" + id)[0]);
      $(".result-s" + id).show();
      $.ajax({
        url: $scope.dirlocation + "adminapi/update_sub_category",
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
          $(".edit_sub_" + id).hide(500);
          $(".icon_sub_" + id).show(100);
          if (msg.status == "1") {
            let category = JSON.parse(
              localStorage.getItem("ngStorage-catInfo")
            );

            // category.filter((e)=>{
            //   return e.sub_id == id
            //   console.log(e);
            // })
            // for(let i = 0; i < category.subcategory.length; i++){

            //   if(element.sub_id == id){

            //     category.subcategory.split(i, 1);
            //     element.title = msg.title;

            //     if(msg.image != ''){
            //       element.image = msg.image;
            //     }

            //     console.log(category.subcategory);

            //     }
            // }

            category.subcategory.forEach((element) => {
              if (element.sub_id == id) {
                let index = category.subcategory.indexOf(element);

                element.title = msg.title;

                if (msg.image != "") {
                  element.image = msg.image;
                }
                category.subcategory.splice(index, 1, element);
              }
            });

            // localStorage.setItem('ngStorage-catInfo',JSON.stringify(category));
            $localStorage["catInfo"] = category;
            $scope.$apply();
            $(".result-s").html(msg.message);
            $(".result-s").addClass("alert alert-info");
            $(".result-s").show(500);

            setTimeout(() => {
              $(".result-s").hide("500");
              $(".result-s").removeClass("alert alert-info");
            }, 3000);
            $("#update_sub_category_" + id)[0].reset();
            location.reload(true);
          } else {
            $(".result-s").html(msg.message);
            $(".result-s").addClass("alert alert-info");
            $(".result-s").show(500);

            setTimeout(() => {
              $(".result-s").hide("500");
              $(".result-s").removeClass("alert alert-info");
            }, 3000);
          }
        },
      });
    };
    $scope.add_new_sub_category = function () {
      $(".add_sub_cat_loader").show(500);
      var formData = new FormData($("#addSubCategory")[0]);

      $.ajax({
        url: $scope.dirlocation + "adminapi/add_sub_category",
        type: "POST",
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        headers: { "gnice-authenticate": $scope.admin_token },
        processData: false,
        success: function (answer) {
          console.log(result);

          var response = JSON.stringify(answer);
          var parsed = JSON.parse(response);
          var msg = angular.fromJson(parsed);
          $(".add_sub_cat_loader").hide(500);
          if (msg.status == "1") {
            $(".loader").hide();
            $(".result").html(msg.message);
            $(".result").addClass("alert alert-info");
            $(".result").show(500);

            setTimeout(() => {
              $(".result").hide("500");
              $(".result").removeClass("alert alert-info");
            }, 3000);
            $scope.get_all_cat_and_sub_cat();
            $scope.$apply();
            $("#addSubCategory")[0].reset();
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

    $scope.enable_disable_sub = function (code, sub) {
      $(".sub_loader_" + sub.sub_id).show();
      $(".icon_" + sub.sub_id).hide();
      var formData = new FormData();

      formData.append("status", code);
      formData.append("sub_id", sub.sub_id);
      $.ajax({
        url: $scope.dirlocation + "adminapi/disable_enable_sub_category",
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
          $(".sub_loader_" + sub.sub_id).hide(500);
          $(".icon_" + sub.sub_id).show();
          if (msg.status == "1") {
            $(".result").html(msg.message);
            $(".result").addClass("alert alert-info");
            $(".result").show(500);
            sub.status = code;
            $scope.$apply();
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
    $scope.enable_or_disable_cat = function (code, cat) {
      $(".cat_loader_" + cat.id).show(500);
      $(".icon_toggle_" + cat.id).hide(100);

      var formData = new FormData();

      formData.append("status", code);
      formData.append("category_id", cat.id);
      $.ajax({
        url: $scope.dirlocation + "adminapi/disable_enable_category",
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

          $(".cat_loader_" + cat.id).hide(500);
          $(".icon_toggle_" + cat.id).show(100);
          if (msg.status == "1") {
            $(".result").html(msg.message);
            $(".result").addClass("alert alert-info");
            $(".result").show(500);

            cat.status = code;
            $scope.$apply();

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

    $scope.localStorage_get = function (key) {
      $scope[key] = $localStorage[key];
    };
    // $(".files[]").change(function(){
    //   alert("The text has been changed.");
    // });
  },
]);
