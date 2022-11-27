
module.config(function($routeProvider,$locationProvider){
    $routeProvider
        .when('/',{
            templateUrl:"Views/home.html",
            controller:"homeController",
        })
        .when('/about',{
            templateUrl:"Views/about.html",
            controller:"homeController",
        })
        .when('/plan',{
           templateUrl:"Views/plan.html",
            controller:"productController",
        })
         .when('/faq',{
           templateUrl:"Views/faq.html",
            controller:"productController",
        })
         .when('/rule',{
           templateUrl:"Views/rule.html",
            controller:"productController",
        })
        .when('/contact',{
           templateUrl:"Views/contact.html",
            controller:"productController",
        })
       
        .otherwise({
            redirectTo:"/"
        })
        $locationProvider.html5Mode(true);
})