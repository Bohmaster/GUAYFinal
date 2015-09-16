'use strict';
angular.module('guay-news')
  .controller('HomeController',
  function($scope, $http, $modal, Noticia, Categoria) {

    $scope.destacada = null;
    $scope.video = null;
    $scope.primeras = null;
    $scope.segundas = null;

    function setIndexNews() {

      Noticia.find(
        {
          filter:{
            where: {
              destacada: true
            },
            order: 'fecha DESC',
            limit: 5
          }
        }
      , function(destacada) {
            $scope.destacada = destacada;
            console.log(1, destacada);
      }
      , function(err) {
            console.log(err);
      });

      Noticia.find(
        {
          filter: {
            where: {
              esVideo: true
            },
            order: 'fecha DESC',
            limit: 1
          }
        }
      , function(video) {
           $scope.video = video;
          console.log(2, video);
      }
      , function(err) {
           console.log(err);
      });

      Noticia.find(
        {
          filter: {
            where: {
              destacada: false,
              esVideo: false
            },
            order: 'fecha DESC',
            limit: 4
          }
        }, function(first) {
            $scope.primeras = first;
          console.log(3, first);
        }, function(err) {
            console.log(err);
        }
      );

      Noticia.find(
        {
          filter: {
            where: {
              destacada: false,
              esVideo: false
            },
            order: 'fecha DESC',
            limit: 6,
            offset: 4
          }
        }, function(second) {
          $scope.segundas = second;
          console.log(4, second);
        }, function(err) {
          console.log(err);
        }
      );

    }

    setIndexNews();

  });
