///////////// THIS IS THE INDEXPAGE CONTROLLER///////
///// THIS CONTROLS EVERY ACTIVITY ON THE INDEX PAGE
/////////////////////////

module.controller("messageController", [
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

    $scope.fetch_all_messages_to_seller = function () {
      $.ajax({
        url:
          $scope.dirlocation +
          "api/fetch_all_messages_to_seller?seller_id=" +
          $scope.user_data.seller_id,
        type: "GET",
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
          $scope.messages = msg1.data;
          $scope.$apply();
          //alert(JSON.stringify($scope.categories));
          //}
        },
      });
    };
  },
]);
