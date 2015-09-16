'use strict';

angular
  .module('guay-news')
  .directive('navbar', function() {
    return {
      restrict: 'E',
      templateUrl: 'js/modules/core/elements/navbar.html'
    }}
  )
  .directive('fileInput', function($parse) {
    return {
      restrict: 'A',
      link: function(scope, elm, attrs) {
        elm.bind('change', function() {
          $parse(attrs.fileInput)
            .assign(scope, elm[0].files);
          scope.$apply();
        });
      }
    }
  })
  .directive('compile', function($compile) {
    return {
      restrict: 'A',
      scope: {
        data: '@compile'
      },
      compile: function(elem, attrs) {

        var x = attrs.compile;
        var y = "<span>" + x + "</span>";

        attrs.compile = y;

        return function postLink(scope, elem, attrs) {

          attrs.$observe("compile", function(value) {

            var linkFn = $compile(scope.data);
            var content = linkFn(scope);
            elem.append(content);

          })

        }
      }

    }
  });
