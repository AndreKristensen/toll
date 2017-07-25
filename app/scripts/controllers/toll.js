'use strict';

/**
 * @ngdoc function
 * @name beerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the beerApp
 */
angular.module('beerApp')
  .controller('TollCtrl', function ($scope, $log, $http, localStorageService, uiGmapGoogleMapApi) {

    var _tollData = localStorageService.get('_tollData');

    uiGmapGoogleMapApi.then(function (maps) {
      console.log('rdy');
      if ($scope.tollDatas.length === 0) {
        $http.get('https://hotell.difi.no/api/json/vegvesen/bomstasjoner?page=1').then(function (data) {

          var _count = 0;
          angular.forEach(data.data.entries, function (toll) {
            $scope.tollDatas.push(
              {
                'id': _count++,
                'vegnr': toll.vegnr,
                'params': {
                  'autopass_beskrivelse': toll.autopass_beskrivelse,
                  'navn': toll.navn,
                  'autopass': toll.autopass_beskrivelse,
                  'takst_liten_bil': toll.takst_liten_bil,
                  'kommunenr': toll.kommunenr,
                  'takst_stor_bil': toll.takst_stor_bil,
                },
                'show': false,
                'longitude': toll.long,
                'latitude': toll.lat
              }
            );
          });

          $http.get('http://hotell.difi.no/api/json/vegvesen/bomstasjoner?page=3').then(function (data3) {
            var _count3 = 201;
            angular.forEach(data3.data.entries, function (toll) {
              $scope.tollDatas.push(
                {
                  'id': _count3++,
                  'vegnr': toll.vegnr,
                  'params': {
                    'autopass_beskrivelse': toll.autopass_beskrivelse,
                    'navn': toll.navn,
                    'autopass': toll.autopass_beskrivelse,
                    'takst_liten_bil': toll.takst_liten_bil,
                    'kommunenr': toll.kommunenr,
                    'takst_stor_bil': toll.takst_stor_bil,
                  },
                  'show': false,
                  'longitude': toll.long,
                  'latitude': toll.lat
                }
              );
            });

            $http.get('http://hotell.difi.no/api/json/vegvesen/bomstasjoner?page=2').then(function (data2) {
              var _count2 = 101;
              angular.forEach(data2.data.entries, function (toll) {
                $scope.tollDatas.push(
                  {
                    'id': _count2++,
                    'vegnr': toll.vegnr,
                    'params': {
                      'autopass_beskrivelse': toll.autopass_beskrivelse,
                      'navn': toll.navn,
                      'autopass': toll.autopass_beskrivelse,
                      'takst_liten_bil': toll.takst_liten_bil,
                      'kommunenr': toll.kommunenr,
                      'takst_stor_bil': toll.takst_stor_bil,
                    },
                    'show': false,
                    'longitude': toll.long,
                    'latitude': toll.lat
                  }
                );
              });

              localStorageService.set('_tollData', $scope.tollDatas);
            });
          });
        });
      }
    });

    $scope.tollDatas = _tollData || [];
    $scope.tollDataInfoWindow = [];
    var offset = new google.maps.Size(0, -40);

    $scope.map = {
      center: {
        'longitude': '10.85250',
        'latitude': '59.94787'
      },
      zoom: 4
    };

    $scope.tolls = [];

    $scope.windowData = [];

    $scope.windowData.show = false;

    $scope.prevId = -1;

    $scope.onClick = function (marker, eventName, model) {

      if ($scope.prevId != model.id) {
        $scope.windowData.show = true;
        $scope.prevId = model.id;
      } else {
        $scope.windowData.show = !$scope.windowData.show;
      }

      $scope.windowData['coords'] = {
        'longitude': model.longitude,
        'latitude': model.latitude
      };
      $scope.windowData['opt'] = {
        pixelOffset: offset
      };
      $scope.windowData['params'] = model.params;
    };

    $scope.closeClick = function () {
      $scope.windowData.show = false;

    }
  })
;
