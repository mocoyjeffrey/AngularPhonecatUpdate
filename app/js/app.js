var phonecatApp = angular.module('phonecatApp', [
'ngRoute',
'phonecatControllers',
'phonecatFilters'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/crud', {
        templateUrl: 'partials/phone-crud.html',
        controller: 'CRUDCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      when('/deletePhones/:phoneId', {
        templateUrl: 'partials/phone-crud.html',
        controller: 'DeletePhoneCtrl'
      }).
      when('/createPhone', {
        templateUrl: 'partials/phone-create.html',
        controller: 'CreatePhoneCtrl'
      }).
      when('/updatePhone/:phoneId', {
        templateUrl: 'partials/phone-update.html',
        controller: 'UpdatePhoneCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);