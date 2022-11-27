module.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when("/index", {
      templateUrl: "../app/Views/Admin/Views/home.html",
      //template:"<h4>This is home page</h4>",
      controller: "homeController",
    })
    .when("/categories", {
      templateUrl: "../app/Views/Admin/Views/categories.html",
      controller: "categoryController",
    })
    .when("/sub_category", {
      templateUrl: "../app/Views/Admin/Views/sub_category.html",
      controller: "categoryController",
    })
    .when("/complaints", {
      templateUrl: "../app/Views/Admin/Views/complaints.html",
      controller: "homeController",
    })
    // .when("/edit_sub", {
    //   templateUrl: "../app/views/Admin/views/edit_sub_category.html",
    //   controller: "categoryController",
    // })
    .when("/listings", {
      templateUrl: "../app/Views/Admin/Views/listings.html",
      controller: "listingController",
    })
    .when("/users", {
      templateUrl: "../app/Views/Admin/Views/users.html",
      controller: "usersController",
    })
    .when("/profile", {
      templateUrl: "../app/Views/Admin/Views/profile.html",
      controller: "usersController",
    })
    .when("/single_listing", {
      templateUrl: "../app/Views/Admin/Views/single_listing.html",
      controller: "listingController",
    })
    .when("/account_types", {
      templateUrl: "../app/Views/Admin/Views/account_types.html",
      controller: "packagesController",
    })
    // .when("/edit_packages", {
    //   templateUrl: "../app/views/Admin/views/edit_packages.html",
    //   controller: "packagesController",
    // })
    .when("/banners", {
      templateUrl: "../app/Views/Admin/Views/banners.html",
      controller: "bannerController",
    })
    .when("/transactions", {
      templateUrl: "../app/Views/Admin/Views/transactions.html",
      controller: "transactionController",
    })
    .when("/admins", {
      templateUrl: "../app/Views/Admin/Views/admins.html",
      controller: "adminController",
    })
    .otherwise({
      redirectTo: "/index",
    });
  $locationProvider.html5Mode(true);
});
