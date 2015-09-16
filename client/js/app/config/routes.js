'use strict';
angular.module('guay-news')
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('app', {
        abstract: true,
        url: '/app',
        templateUrl: 'js/app/views/base.html'
      })
      .state('app.home', {
        url: '/home',
        templateUrl: 'js/app/views/home.html',
        controller: 'HomeController'
      })
      .state('app.noticias', {
        url: '/noticias/:categoriaId',
        templateUrl: 'js/app/views/news/noticias.html',
        controller: "NoticiasController"
      })
      .state('app.noticia', {
        url: '/articulo/:articuloId',
        templateUrl: 'js/app/views/news/noticia.html',
        controller: 'NoticiasController'
      })
      .state('app.admin', {
        url: '/admin',
        templateUrl: 'js/app/views/admin/admin.html',
        controller: 'NoticiasController'
      });

    $urlRouterProvider.otherwise('/app/home');

  });

