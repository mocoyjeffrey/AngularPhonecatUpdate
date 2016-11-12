var phonecatControllers = angular.module('phonecatControllers', []);
var phonelistURL = 'http://localhost:3000/phonelist';
var crudlistURL = 'http://localhost:3000/crudlist';
var phonedetailURL = 'http://localhost:3000/phonedetail/';
var deletePhoneURL = 'http://localhost:3000/deletephone/';
var updatePhoneURL = 'http://localhost:3000/update';
var createPhoneURL = 'http://localhost:3000/create';

phonecatControllers.controller('PhoneListCtrl', ['$scope', '$http',
  function ($scope, $http) {
   $http.get(phonelistURL).success(function(data) {
      $scope.phones = data;

    });

  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.phoneId = $routeParams.phoneId;
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    /*$http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {*/
      $http.get(phonedetailURL+ $routeParams.phoneId).success(function(data) {
      $scope.phone = data;
    });
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    //$http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {
      $http.get(phonedetailURL+ $routeParams.phoneId ).success(function(data) {
        // console.log(data);
     // console.log(data);
      $scope.phone = data[0];
      var value =  (data[0].list).split(',');
      //console.log(value[0]);
     $scope.vimage = value;
     $scope.mainImageUrl = value[0];
    });
    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);

phonecatControllers.controller('CRUDCtrl', ['$scope', '$http',
  function ($scope, $http) {
   $http.get(crudlistURL).success(function(data) {
      $scope.phones = data;

    });

  }]);

// phonecatControllers.controller('DeletePhoneCtrl', ['$scope', '$routeParams', '$http',
//   function($scope, $routeParams, $http) {
//     /*$http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {*/
//       $http.get(deletePhoneURL+ $routeParams.phoneId).success(function(data) {
//       $scope.phones = data;
//     });
//   }]);

// phonecatControllers.controller('DeletePhoneCtrl', ['$scope', '$routeParams', '$http',
//   function($scope, $routeParams, $http) {
//     //$http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {
//       $http.get(deletePhoneURL+ $routeParams.phoneId ).success(function(data) {
//        $scope.phones = data;
//     });
//   }]);

phonecatControllers.controller('CreatePhoneCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    /*$http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {*/
      $scope.Createtitle ="Create New Phone";
  }]);


phonecatControllers.controller('UpdatePhoneCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    /*$http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {*/
      $http.get(phonedetailURL+ $routeParams.phoneId).success(function(data) {
      $scope.phone = data;
    });
  }]);

phonecatControllers.controller('UpdatePhoneCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    //$http.get('phones/' + $routeParams.phoneId + '.json').success(function(data) {
      $http.get(phonedetailURL+ $routeParams.phoneId ).success(function(data) {
        // console.log(data);
     // console.log(data);
      $scope.phone = data[0];
      var value =  (data[0].list).split(',');
      //console.log(value[0]);
     $scope.vimage = value;
     $scope.mainImageUrl = value[0];
    });
    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);

phonecatControllers.controller('UpdateCtrl', ['$scope', '$http',
  function ($scope, $http) {
     $scope.submit = function () {
    var data ={pdphoneid:$scope.phone.phone_id,
                        pdid:$scope.phone.id,
                        pdname:$scope.phone.name,
                        pddescription:$scope.phone.description,
                        pdadditionalFeatures:$scope.phone.additionalFeatures,
                        page:$scope.phone.age,
                        pcarrier:$scope.phone.carrier,
                        pimageUrl:$scope.phone.imageUrl,
                        psnippet:$scope.phone.snippet,
                        bstandbyTime:$scope.phone.standbyTime,
                        btalkTime:$scope.phone.talkTime,
                        btype:$scope.phone.type,
                        aos:$scope.phone.os,
                        aui:$scope.phone.ui,
                        avlist:$scope.phone.carrier,
                        cfeatures:$scope.phone.features,
                        cprimary:$scope.phone.primary,
                        ctbluetooth:$scope.phone.bluetooth,
                        ctcell:$scope.phone.cell,
                        ctgps:$scope.phone.gps,
                        ctinfrared:$scope.phone.infrared,
                        ctwifi:$scope.phone.wifi,
                        dscreenResolution:$scope.phone.screenResolution,
                        dscreenSize:$scope.phone.screenSize,
                        dtouchScreen:$scope.phone.touchScreen,
                        haccelerometer:$scope.phone.accelerometer,
                        haudioJack:$scope.phone.audioJack,
                        hcpu:$scope.phone.cpu,
                        hfmRadio:$scope.phone.fmRadio,
                        hphysicalKeyboard:$scope.phone.physicalKeyboard,
                        husb:$scope.phone.usb,
                        imlist:$scope.vimage,
                        swdimensions:$scope.phone.dimensions,
                        swweight:$scope.phone.weight,
                        sflash:$scope.phone.flash,
                        sram:$scope.phone.ram
                      };
    console.log(JSON.stringify(data));
      var dataJSON = JSON.stringify(data);
      $http.post(updatePhoneURL,dataJSON).success(function(data) {
          

            
      });
      window.location.href = "#/crud";
    };
  }]);

/*phonecatControllers.controller('CreateCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    
  }]);*/

phonecatControllers.controller('CreateCtrl', ['$scope', '$http',
  function ($scope, $http) {
     $scope.submit = function () {
    var data ={pdphoneid:$scope.phone.phone_id,
                        pdid:$scope.phone.id,
                        pdname:$scope.phone.name,
                        pddescription:$scope.phone.description,
                        pdadditionalFeatures:$scope.phone.additionalFeatures,
                        page:$scope.phone.age,
                        pcarrier:$scope.phone.carrier,
                        pimageUrl:$scope.phone.imageUrl,
                        psnippet:$scope.phone.snippet,
                        bstandbyTime:$scope.phone.standbyTime,
                        btalkTime:$scope.phone.talkTime,
                        btype:$scope.phone.type,
                        aos:$scope.phone.os,
                        aui:$scope.phone.ui,
                        avlist:$scope.phone.carrier,
                        cfeatures:$scope.phone.features,
                        cprimary:$scope.phone.primary,
                        ctbluetooth:$scope.phone.bluetooth,
                        ctcell:$scope.phone.cell,
                        ctgps:$scope.phone.gps,
                        ctinfrared:$scope.phone.infrared,
                        ctwifi:$scope.phone.wifi,
                        dscreenResolution:$scope.phone.screenResolution,
                        dscreenSize:$scope.phone.screenSize,
                        dtouchScreen:$scope.phone.touchScreen,
                        haccelerometer:$scope.phone.accelerometer,
                        haudioJack:$scope.phone.audioJack,
                        hcpu:$scope.phone.cpu,
                        hfmRadio:$scope.phone.fmRadio,
                        hphysicalKeyboard:$scope.phone.physicalKeyboard,
                        husb:$scope.phone.usb,
                        imlist:$scope.vimage,
                        swdimensions:$scope.phone.dimensions,
                        swweight:$scope.phone.weight,
                        sflash:$scope.phone.flash,
                        sram:$scope.phone.ram
                      };
    console.log(JSON.stringify(data));
      var dataJSON = JSON.stringify(data);
      $http.post(createPhoneURL,dataJSON).success(function(data) {
          

            
      });
     window.location.href = "#/crud";
    };
  }]);