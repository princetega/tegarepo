///////////// THIS IS THE INDEXPAGE CONTROLLER///////
///// THIS CONTROLS EVERY ACTIVITY ON THE INDEX PAGE
/////////////////////////

module.controller("packageController", [
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
    
    $scope.init = function(){
      //alert(JSON.stringify($routeParams));
      if(($routeParams.reference)&&($routeParams.reference!='')){
        $scope.paymentResponseWindow=true;
        $scope.routeParams = $routeParams;
        $scope.fetch_transaction_by_reference($routeParams.reference);
      }else{
        $scope.paymentResponseWindow=false;
      }
    }   

    $scope.fetch_transaction_by_reference = function(reference){
        $.ajax({
          url: $scope.dirlocation+'api/fetch_transaction_by_reference?id='+reference,
          type: 'GET',
          async: true,
          cache: false,
          contentType: "application/json",
          headers:{'gnice-authenticate':$scope.user_token}, 
          processData: false,
          success: function (result1) {
          //alert(result1);
         var response1=JSON.stringify(result1);
         var parsed1 = JSON.parse(response1);
         var msg1=angular.fromJson(parsed1);
         $('.loader').hide(); 
         if(msg1.status=='1'){  
         $scope.reference_data = msg1.data;
         $scope.reference_check = true;
         //alert(JSON.stringify($scope.packages));
         $scope.$apply();
         //alert(JSON.stringify($scope.products));
         }
         
          }
        });
      }

    $scope.fetch_account_packages = function(){
        $.ajax({
          url: $scope.dirlocation+'api/get_account_packages',
          type: 'GET',
          //data: JSON.stringify({'user_email':'mike98989@gmail.com'}),
          async: true,
          cache: false,
          contentType: "application/json",
          headers:{'gnice-authenticate':$scope.user_token}, 
          processData: false,
          success: function (result1) {
        //alert(result1);
         var response1=JSON.stringify(result1);
         var parsed1 = JSON.parse(response1);
         var msg1=angular.fromJson(parsed1);
         $('.loader').hide(); 
         if(msg1.status=='1'){  
         $scope.packages = msg1.data;
         //alert(JSON.stringify($scope.packages));
         $scope.$apply();
         //alert(JSON.stringify($scope.products));
         }
         
          }
        });
      }
  
      $scope.choose_package = function(package){ 
        if(package.package_id=='1'){
          $scope.selectedOptionText="CONTINUE";
        }else{
          $scope.selectedOptionText="MAKE PAYMENT";
        }
        $scope.selectedOption = package;  
        window.scrollTo(0,document.body.scrollHeight+400);
        //alert($scope.selectedOption.package_id);
      }

      $scope.payWithPaystack = function(){
        $('.pay_loader').show();
        if($scope.selectedOption.value!='0'){
          
        var handler = PaystackPop.setup({
          key: "pk_test_ba985e21c8a78ea8da3609b479b2f087944dcb00",
          email: $scope.user_data.email,
          amount: $scope.selectedOption.value + "00",
          currency: "NGN",
          //ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
          metadata: {
            custom_fields: [
              {
                display_name: $scope.user_data.email,
                variable_name: $scope.user_data.email,
                value: $scope.user_data.phone,
              },
            ],
          },
          callback: function (response) {
            $scope.paystackResponse = response.reference;
            $http({
              method: "GET",
              url:
                $scope.dirlocation +
                "api/verify_transaction?reference=" +
                $scope.paystackResponse +
                "&&source=browser",
            }).then(
              function (response) {
                var resp = JSON.stringify(response);
                var parsed = JSON.parse(resp);
                var msg=angular.fromJson(parsed);
                //$scope.paymentResponse = msg;
                if(msg.data.data.status=='success'){
                    $scope.update_user_account_package($scope.dirlocation+'dashboard/account_packages?reference='+$scope.paystackResponse);
                }else{
                    alert('Something went wrong! Please try again');
                }
              },
              function errorCallback(response) {
                return response.status;
              }
            );

            alert("success. transaction ref is " + $scope.paystackResponse);
          },
          onClose: function () {
            alert("window closed");
          },
        });
        handler.openIframe();
      } else {
        $scope.update_user_account_package();
      }

    }
  


    $scope.update_user_account_package = function(successRedirectionUrl){
        let formData = new FormData();
        formData.append('email_to_be_activated', $scope.user_data.email);
        formData.append('selectedOption', $scope.selectedOption.package_id);
            $.ajax({
            url: $scope.dirlocation+'api/update_user_account_type',
            type: 'POST',
            headers:{'gnice-authenticate':$scope.user_token}, 
            data: formData,
            async: true,
            cache: false,
            contentType: false,
            enctype: 'multipart/form-data',
            crossDomain: true,
            processData: false,
            success: function (answer) {
            //alert(answer);
            var response=JSON.stringify(answer);
            var parsed = JSON.parse(response);
            var msg=angular.fromJson(parsed);
            $('.pay_loader').hide();  
            if(msg.status=='1'){
            $('.pay_loader').hide();    
            $('.result').html(msg.msg);  
            $('.result').show();
            $localStorage["user_data"] = msg.data;
            $scope.user_data  = $localStorage.user_data;
            if(successRedirectionUrl!=''){
              window.location.href = successRedirectionUrl;
            }
            //alert(msg.msg);
            
            }else{
            $('.pay_loader').hide();    
            $('.result').html(msg.message);  
            $('.result').show();
            alert(msg.message);
          }
        },
      });
    };
  }
]);
