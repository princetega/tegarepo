///////////// THIS IS THE INDEXPAGE CONTROLLER///////
///// THIS CONTROLS EVERY ACTIVITY ON THE INDEX PAGE
/////////////////////////
module.controller("loginController", [
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
    $scope.dirlocation = datagrab.completeUrlLocation;
    $scope.currentPage = 1;
    $scope.pageSize = 30;

    $scope.password_recovery = function () {
      $(".loader").show();
      $(".result").hide();
      var email = $("#email").val();
      var formData = new FormData($("#password_recovery")[0]);
      $.ajax({
        url: $scope.dirlocation + "api/password_recovery",
        type: "POST",
        //data: JSON.stringify({'user_email':'mike98989@gmail.com'}),
        data: formData,
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
          $(".loader").hide();
          $(".result").html(msg.msg);
          $(".result").show();
          if (msg.status == "1") {
            $localStorage.recovery_token = msg.token;
            setTimeout(function(){ 
               window.location.href = datagrab.completeUrlLocation + "confirmrecovery"; 
            }, 5000);
           
          }
        },
      });
    };

    $scope.confirm_password_recovery_code = function () {
      $(".loader").show();
      $(".result").hide();
      //alert($localStorage.recovery_token);
      var password = $('#password').val();
      var confirm_password = $('#confirm_password').val();
      if(password!==confirm_password){
        alert("Passwords do not match");
       $('.result').html("Passwords do not match!");
       $(".result").show();
       return; 
      }
      var formData = new FormData($("#confirm_password_recovery_code")[0]);
      $.ajax({
        url: $scope.dirlocation + "api/confirm_password_recovery_code",
        type: "POST",
        //data: JSON.stringify({'user_email':'mike98989@gmail.com'}),
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        enctype: "multipart/form-data",
        headers: { "gnice-authenticate": $localStorage.recovery_token },
        crossDomain: true,
        processData: false,
        success: function (answer) {
          //alert(answer);
          var response = JSON.stringify(answer);
          var parsed = JSON.parse(response);
          var msg = angular.fromJson(parsed);
          $(".loader").hide();
          $(".result").html(msg.msg);
          $(".result").show();
          if (msg.status == "1") {
            setTimeout(function(){ 
              window.location.href = datagrab.completeUrlLocation + "Login"; 
            }, 5000);

            
          } 
        },
      });
    };



    $scope.user_login = function () {
      redirectUrl = "dashboard/home";
      const params = new URLSearchParams(window.location.search);
      //alert(JSON.stringify(params)  );
      ///return;
      if (params.has("redirectTo")) {
        redirectUrl = params.get("redirectTo");
      }
      $(".loader").show();
      $(".result").hide();
      var username = $("#username").val();
      var password = $("#password").val();
      var formData = new FormData($("#user_login")[0]);
      $.ajax({
        url: $scope.dirlocation + "api/user_login",
        type: "POST",
        //data: JSON.stringify({'user_email':'mike98989@gmail.com'}),
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        enctype: "multipart/form-data",
        headers: { "gnice-authenticate": "gnice-web" },
        crossDomain: true,
        processData: false,
        success: function (answer) {
          var response = JSON.stringify(answer);
          var parsed = JSON.parse(response);
          var msg = angular.fromJson(parsed);
          //alert(msg);
          //console.log(msg);
          $(".loader").hide();
          if (msg.status == "1") {
            //alert(msg.data.fullname);
            //alert(msg.token);
            // $localStorage["user_data"] = msg.data;
            // $localStorage.name = msg.data.fullname;
            // $localStorage.email = msg.data.email;
            // $localStorage.id = msg.data.id;
            // $localStorage.user_token = msg.token;
            // console.log($localStorage["user_data"]);
            // $scope.createUserSession();
            // window.location.href = datagrab.completeUrlLocation + "Home";

            $localStorage["user_data"] = msg.data;
            $localStorage["user_token"] = msg.token;
            window.location.href = datagrab.completeUrlLocation + redirectUrl;
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

    $scope.clear_storage = function () {
      $localStorage["fullname_checked"] = false;
      window.location.reload();
    };

    $scope.admin_login = function () {
      // $(".loader").show();
      $(".spinner").show(500);
      $(".text").hide(300);
      $(".result").hide();
      var username = $("#username").val();
      var pwrd = $("#password").val();
      var formData = new FormData($("#admin_login")[0]);
      $.ajax({
        url: $scope.dirlocation + "api/admin_login",
        type: "POST",
        //data: JSON.stringify({'user_email':'mike98989@gmail.com'}),
        data: formData,
        async: true,
        cache: false,
        contentType: false,
        enctype: "multipart/form-data",
        headers: { "gnice-authenticate": username + ":pwrd:" + pwrd },
        crossDomain: true,
        processData: false,
        success: function (answer) {
          //alert(answer);
          var response = JSON.stringify(answer);
          var parsed = JSON.parse(response);
          var msg = angular.fromJson(parsed);
          $(".spinner").hide(500);
          $(".text").show(300);
         
          if (msg.status == "1") {
            //alert(msg.token)
            $localStorage["user_data"] = msg.data;
            $localStorage["user_token"] = msg.token;
            window.location.href =
              datagrab.completeUrlLocation + "admindashboard";

              alert(JSON.stringify($localStorage['user_data']));
              alert(JSON.stringify($localStorage['user_token']));
          } else {
            $(".loader").hide();
            $(".result").html(msg.message);
            $(".result").show();
            //$('.signup_loader').hide();
            //$('.alert').html(answer);
          }
        },
      });
    };
  },
]);
