'use strict';

angular.module('conFusion.services', ['ngResource'])
        .constant("baseURL","http://test.vi:3000/")
        .factory('$localStorage', ['$window', function($window) {
          return {
            store: function(key, value) {
              $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
              return $window.localStorage[key] || defaultValue;
            },
            storeObject: function(key, value) {
              $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key,defaultValue) {
              return JSON.parse($window.localStorage[key] || defaultValue);
            },
            // deleteFromStorage: function(obj, key) {
            //   var a = JSON.parse($window.localStorage[obj]);
            //   console.log(a);
            // }
          }
        }])
        .factory('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {
          
            return $resource(baseURL + "dishes/:id", null, {
                'update': {
                    method: 'PUT'
                }
            });
        }])

        .factory('promotionFactory', ['$resource', 'baseURL', function($resource, baseURL) {
                    return $resource(baseURL + "promotions/:id");

        }])

        .factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
            return $resource(baseURL+"leadership/:id");
    
        }])

        .factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
    
            return $resource(baseURL+"feedback/:id");
    
        }])

        .factory('favoriteFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
          var favFac = {};
          var favorites = {};
          if(window.localStorage['favorites']) {
            favorites = JSON.parse(window.localStorage['favorites']);
          }

          favFac.addToFavorites = function (index) {
              for (var i = 0; i < favorites.length; i++) {
                  if (favorites[i].id == index)
                      return;
              }
              favorites.push({id: index});
              window.localStorage['favorites'] = JSON.stringify(favorites);
          };

          favFac.deleteFromFavorites = function (index) {
              for (var i = 0; i < favorites.length; i++) {
                  if (favorites[i].id == index) {
                      favorites.splice(i, 1);
                  }
              }
              window.localStorage['favorites'] = JSON.stringify(favorites);
          }

          favFac.getFavorites = function () {
            console.log(favorites);
              return favorites;
          };

          return favFac;
        }])

;
