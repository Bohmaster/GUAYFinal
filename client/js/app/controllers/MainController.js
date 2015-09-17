'use strict';
angular.module('guay-news')
  .controller('MainController',
  function($scope, $http, $modal, Noticia, Categoria, Video) {

    $scope.categorias = [];

    Categoria.find(function(data) {
      $scope.categorias = data;
      console.log(66, data)
    }, function(err){
      console.log(err);
    });

    $scope.admin = function() {

      $modal.open({
        templateUrl: 'js/app/views/admin/login.html',
        size: 'md',
        controller: function($scope, $state) {

          $scope.user = {};

          $scope.login = function() {


            if ($scope.user.name == "admin" && $scope.user.password == "admin") {

              $state.go('app.admin');
              $scope.$close();

            } else {

              window.alert("Credenciales incorrectas");
              $state.go('app.home');
              $scope.$close();

            }

          }
        }
      });

    };

  });
