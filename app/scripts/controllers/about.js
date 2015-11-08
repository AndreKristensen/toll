'use strict';

/**
 * @ngdoc function
 * @name beerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the beerApp
 */
angular.module('beerApp')
  .controller('AboutCtrl', function ($scope, $log, $http, localStorageService) {

    var _tollData = localStorageService.get('_tollData');

    $scope.tollData = _tollData || [];

    $scope.windowOptions = {
      show: false
    };

    $scope.$watch($scope.tollData,
      function (newData) {

        if ($scope.tollData) {
          console.log($scope.tollData.length)
        }

      }, true);

    if ($scope.tollData.length == 0) {
      $http.get('http://hotell.difi.no/api/json/vegvesen/bomstasjoner?page=1').then(function (data) {

        var _count = 0;
        angular.forEach(data.data.entries, function (toll) {
          $scope.tollData.push(
            {
              'id': _count++,
              'vegnr': toll.vegnr,
              'autopass_beskrivelse': toll.autopass_beskrivelse,
              'navn': toll.navn,
              'autopass': toll.autopass_beskrivelse,
              'takst_liten_bil': toll.takst_liten_bil,
              'kommunenr': toll.kommunenr,

                'longitude': toll.long,
                'latitude': toll.lat,


              'takst_stor_bil': toll.takst_stor_bil
            }
          );
        });

        $http.get('http://hotell.difi.no/api/json/vegvesen/bomstasjoner?page=3').then(function (data3) {
          var _count3 = 201;
          angular.forEach(data3.data.entries, function (toll) {
            $scope.tollData.push(
              {
                'id': _count3++,
                'vegnr': toll.vegnr,
                'autopass_beskrivelse': toll.autopass_beskrivelse,
                'navn': toll.navn,
                'autopass': toll.autopass_beskrivelse,
                'takst_liten_bil': toll.takst_liten_bil,
                'kommunenr': toll.kommunenr,
                'longitude': toll.long,
                'latitude': toll.lat,
                'takst_stor_bil': toll.takst_stor_bil
              }
            );
          });

          $http.get('http://hotell.difi.no/api/json/vegvesen/bomstasjoner?page=2').then(function (data2) {
            var _count2 = 101;
            angular.forEach(data2.data.entries, function (toll) {
              $scope.tollData.push(
                {
                  'id': _count2++,
                  'vegnr': toll.vegnr,
                  'autopass_beskrivelse': toll.autopass_beskrivelse,
                  'navn': toll.navn,
                  'autopass': toll.autopass_beskrivelse,
                  'takst_liten_bil': toll.takst_liten_bil,
                  'kommunenr': toll.kommunenr,
                  'longitude': toll.long,
                  'latitude': toll.lat,
                  'takst_stor_bil': toll.takst_stor_bil
                }
              );
            });

            localStorageService.set('_tollData', $scope.tollData);
            console.log($scope.tollData.length);
          });
        });
      });
    }

    $scope.map =
    {
      center: {
        'longitude': '10.85250',
        'latitude': '59.94787'
      },
      zoom: 4
    };

    $scope.tolls = [];
    $scope.marker = {
      id: 0,
      coords: {
        latitude: 40.1451,
        longitude: -99.6680
      },
      options: {draggable: true},
      events: {
        dragend: function (marker, eventName, args) {
          $log.log('marker dragend');
          var latitude = marker.getPosition().latitude();
          var lon = marker.getPosition().lng();
          $log.log(latitude);
          $log.log(lon);

          $scope.marker.options = {
            draggable: true,
            labelContent: 'latitude: ' + $scope.marker.coords.latitudeitude + ' ' + 'lon: ' + $scope.marker.coords.longitudeitude,
            labelAnchor: '100 0',
            labelClass: 'marker-labels'
          };
        }
      }
    };

    $scope.onClick = function(marker, eventName, model) {
      console.log("Clicked!");
      model.show = !model.show;
    };

    //angular.forEach($scope.temps, function (temp) {
    //  $scope.tolls.push(
    //    {
    //      latitude: temp.latitude,
    //      longitude: temp.longitude
    //    });
    //});
  });
