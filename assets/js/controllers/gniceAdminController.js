module.controller("gniceAdminController", [
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
    $scope.direction = datagrab.completeUrlLocation;
    $scope.currentPage = 1;
    $scope.pageSize = 30;

    $scope.admin_login = function () {
      alert("asdfasdfasdf");
      return;
      $(".loader").show();
      $(".result").show();
      var email = $("#email").val();
      var password = $("#password").val();
      var formData = new FormData($("admin_login")[0]);
      $.ajax({
        url: $scope.dirlocation + "adminauth/index",
        type: "POST",
        data: JSON.stringify({ user_email: "mike98989@gmail.com" }),
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        enctype: "multipart/form-data",
        headers: { "gnice-authenticate": "gnice-web" },
        crossDomain: true,
        processData: false,
        crossDomain: true,
        processData: false,
        success: function (answer) {
          //alert(answer);
          var response = JSON.stringify(answer);
          var parsed = JSON.parse(response);
          var msg = angular.fromJson(response);
          //alert(msg);
          console.log(msg);
          if (msg.status == "1") {
            //alert(msg.data.fullname);
            //alert(msg.token);
            $localStorage["user_data"] = msg.data;
            $localStorage.name = msg.data.fullname;
            $localStorage.email = msg.data.email;
            $localStorage.id = msg.data.id;
            $localStorage.user_token = msg.token;
            console.log($localStorage["user_data"]);
            // $scope.createUserSession();

            //alert(JSON.stringify($localStorage['user_data']));
            window.location.href = datagrab.completeUrlLocation + "Home";
          } else {
            $(".loader").hide();
            $(".result").html(msg.msg);
            $(".result").show();

            //$('.signup_loader').hide();
            //$('.alert').html(answer);
          }
        },
      });
    };
  },
]);
