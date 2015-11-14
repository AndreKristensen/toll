'use strict';

/**
 * @ngdoc overview
 * @name beerApp
 * @description
 * # beerApp
 *
 * Main module of the application.
 */
angular
  .module('beerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'uiGmapgoogle-maps',
    'LocalStorageModule',

  ]).config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
  }])
  .config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider){
    uiGmapGoogleMapApiProvider.configure({
      //    key: 'your api key',
      v: '3.20', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
    });
  }])

  .config(function ($routeProvider,uiGmapGoogleMapApiProvider) {



    $routeProvider
      .when('/om', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/', {
        templateUrl: 'views/toll.html',
        controller: 'TollCtrl',
        controllerAs: 'toll'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
