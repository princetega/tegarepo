///////////// THIS IS THE INDEXPAGE CONTROLLER///////
///// THIS CONTROLS EVERY ACTIVITY ON THE INDEX PAGE
/////////////////////////

module.controller("signupController", [
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
    
   
    $scope.user_signup = function(){
      
        $('.loader').show();    
         $('.result').hide(); 
         var email = $('#email').val();
          var password = $('#password').val();
          var confirm_password = $('#confirm_password').val();
          var formData = new FormData($('#user_signup')[0]);
         
          if(password===confirm_password){
          $.ajax({
               url: $scope.dirlocation+'api/user_signup',
               type: 'POST',
               data: formData,
               async: true,
               cache: false,
               contentType: false,
               enctype: 'multipart/form-data',
               headers:{'gnice-authenticate':'gnice-web'},
               crossDomain: true,
               processData: false,
               success: function (answer) {
                ///alert(JSON.stringify(answer));
               var response=JSON.stringify(answer);
               var parsed = JSON.parse(response);
               var msg =angular.fromJson(parsed);
               $('.loader').hide();  
              if(msg.status == '1'){
              $scope.localStorage_save('user_email',email,'');
              $('.loader').hide();    
              $('.result').html(msg.msg);  
              $('.result').show();
              window.location.href=datagrab.completeUrlLocation+'confirm';
              return;
              }else{
              $('.loader').hide();    
              $('.result').html(msg.msg);  
              $('.result').show();
              alert(msg.msg);
              } 
              $localStorage.$reset();
              }
             });
            }else{
            $('.result').html('PASSWORDS DO NOT MATCH!');  
            $('.result').show(); 
            }
            $localStorage.$reset();
    },
        

    $scope.localStorage_get = function (key) {
      $scope[key] = $localStorage[key];
      //$scope.$apply();
    };

    $scope.localStorage_save = function (key, value, url) {
      $localStorage[key] = value;
      //$scope[key] = $localStorage[key];
      //alert(JSON.stringify($localStorage[key]));
      if(url!=''){
          $scope.go_to_url(url);
      }
    };

  $scope.go_to_url = function (url){
      window.location.href=$scope.dirlocation+url;
  }


$scope.resend_confirmation_code = function(){
    $('.loader').show();    
         $('.result').hide(); 
          var formData = new FormData($('#resend_confirmation_code_form')[0]);
          var email = $('#email').val();
          $.ajax({
               url: $scope.dirlocation+'api/resend_confirmation_code',
               type: 'POST',
               data: formData,
               async: true,
               cache: false,
               contentType: false,
               enctype: 'multipart/form-data',
               headers:{'gnice-authenticate':'gnice-web'},
               crossDomain: true,
               processData: false,
               success: function (answer) {
                //alert(answer);
               var response=JSON.stringify(answer);
               var parsed = JSON.parse(response);
               var msg=angular.fromJson(parsed);
               //alert(msg.msg);
               $('.loader').hide();  
              if(msg.status == '1'){
              $('.loader').hide();    
              $('.result').html(msg.message);  
              $('.result').show();
              $scope.localStorage_save('user_email',email,'confirm');
              }else{
              $('.loader').hide();    
              $('.result').html(msg.message);  
              $('.result').show();
            
              //$('.signup_loader').hide();
              //$('.alert').html(answer);
              }
              
               }
             });
    }


    // $scope.confirm_user_signup = function(){
    // $('.loader').show();    
    //      $('.result').hide(); 
    //       var formData = new FormData($('#confirm_user_signup')[0]);
    //       $.ajax({
    //            url: $scope.dirlocation+'api/confirm_user_signup',
    //            type: 'POST',
    //            data: formData,
    //            async: true,
    //            cache: false,
    //            contentType: false,
    //            enctype: 'multipart/form-data',
    //            headers:{'gnice-authenticate':'gnice-web'},
    //            crossDomain: true,
    //            processData: false,
    //            success: function (answer) {
    //             //alert(answer);
    //            var response=JSON.stringify(answer);
    //            var parsed = JSON.parse(response);
    //            var msg=angular.fromJson(parsed);
    //            //alert(msg.msg);
    //            $('.loader').hide();  
    //           if(msg.status == '1'){
    //           $('.loader').hide();    
    //           $('.result').html(msg.msg);  
    //           $('.result').show();
    //           setTimeout(function(){ 
    //             //alert('got here');
    //             window.location.href=datagrab.completeUrlLocation+'login'
                
    //            }, 5000);
              
    //           }else{
    //           $('.loader').hide();    
    //           $('.result').html(msg.msg);  
    //           $('.result').show();
            
    //           //$('.signup_loader').hide();
    //           //$('.alert').html(answer);
    //           }
              
    //            }
    //          });
    // }

    $scope.confirm_user_signup = function () {
      $(".loader").show();
      $(".result").hide();
      //var email = $('#email').val();
      //var confirm_code = $('#confirm_code').val();
      //alert(confirm_code);
      var formData = new FormData($("#confirm_user_signup")[0]);
      $.ajax({
        url: $scope.dirlocation + "api/confirm_user_signup",
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
          //alert(msg.msg);
          $(".loader").hide();
          if (msg.status == "1") {
            $(".loader").hide();
            $(".result").html(msg.msg);
            $(".result").show();
            //alert(msg.msg);
            setTimeout(function(){ 
            $localStorage["user_data"] = msg.data;
            $localStorage["user_token"] = msg.token;
            window.location.href = datagrab.completeUrlLocation+'dashboard/account_packages';
            }, 5000);

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
  },
]);
