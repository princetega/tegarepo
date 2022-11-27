//// INFORMATION GATHERING ////
module.factory("infogathering", [
  "$http",
  "$cookies",
  "$localStorage",
  function ($http, $cookies, $localStorage) {
    var siteUrl = window.location.pathname;
    var webUrl = siteUrl.split("/");
    //splice the url to fit in both on localhost and onine server
    var i = webUrl.indexOf("angularjs");
    webUrl.splice(i, 1);

    var user_data = $localStorage.user_data;
    var user_token = $localStorage.user_token;
    //var dirlocation = window.location.hostname+'/nps/';
    //var dirlocation = window.location.hostname+'/';
    //var completeUrlLocation = 'https://'+window.location.hostname+'/';
    var completeUrlLocation = "http://" + window.location.hostname + "/angularjs/";
    // var completeUrlLocation = 'http://www.gnice.com.ng/';

    //var current_user = $('#current_user_value').val();
    //alert(completeUrlLocation);

    return {
      urlSplit: webUrl,
      completeUrlLocation: completeUrlLocation,
      user_data: user_data,
      user_token: user_token,
    };
  },
]);

module.filter("HTML2TXT", function ($sce) {
  return function (msg) {
    var RexStr = /\<|\>|\"|\'|\&/g;
    msg = (msg + "").replace(RexStr, function (MatchStr) {
      switch (MatchStr) {
        case "<":
          return "&lt;";
          break;
        case ">":
          return "&gt;";
          break;
        case '"':
          return "&quot;";
          break;
        case "'":
          return "&#39;";
          break;
        case "&":
          return "&amp;";
          break;
        default:
          break;
      }
    });
    return $sce.trustAsHtml(msg);
  };
});

module.filter("htmlToPlaintext", function () {
  return function (text) {
    return text ? String(text).replace(/<[^>]+>/gm, "") : "";
  };
});

module.filter("reverse", function () {
  return function (items) {
    return items.slice().reverse();
  };
});

module.directive("embedSrc", function () {
  return {
    restrict: "A",
    link: function (scope, element, attrs) {
      scope.$watch(
        function () {
          return attrs.embedSrc;
        },
        function () {
          element.attr("src", attrs.embedSrc);
        }
      );
    },
  };
});

module.directive("owlCarousel", [
  function () {
    return {
      restrict: "EA",
      transclude: false,
      scope: {
        owlOptions: "=",
      },
      link: function (scope, element, attrs) {
        scope.initCarousel = function () {
          $(element).owlCarousel(scope.owlOptions);
        };
      },
    };
  },
]);
module.directive("owlCarouselItem", [
  function () {
    return function (scope) {
      if (scope.$last) {
        scope.initCarousel();
      }
    };
  },
]);
