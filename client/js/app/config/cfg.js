'use strict';

angular
  .module('guay-news')
  .run(function($rootScope) {

    $rootScope.$on('$viewContentLoaded', function(event) {

      Webflow.ready();

    });

  });
