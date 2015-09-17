angular.module('guay-news')
  .directive('newsBlock', function() {
    return {
      restrict: 'EA',
      templateUrl: 'js/app/views/components/news-block.html',
      link: function(scope, elem, attrs) {
////
        angular.element('.normal').on('mouseover', function() {
          console.log('mouse');
          var desc = angular.element(this).find('.description');
          TweenMax.to(desc, 0.2, {bottom: "0"});
        });
        angular.element('.normal').on('mouseout', function() {
          var desc = angular.element(this).find('.description');
          TweenMax.to(desc, 0.2, {bottom: "-100px"});
        });

        scope.init = function() {

          angular.element('.normal').on('mouseover', function() {
            console.log('mouse');
            var desc = angular.element(this).find('.description');
            TweenMax.to(desc, 0.2, {bottom: "0"});
          });
          angular.element('.normal').on('mouseout', function() {
            var desc = angular.element(this).find('.description');
            TweenMax.to(desc, 0.2, {bottom: "-100px"});
          });

        };

      }
    }
  })
  .directive('newsBlockLow', function() {
    return {
      restrict: 'EA',
      templateUrl: 'js/app/views/components/news-block-low.html',
      link: function(scope, elem, attrs) {

        scope.init = function() {

          angular.element('.normal').on('mouseover', function() {
            console.log('mouse');
            var desc = angular.element(this).find('.description');
            TweenMax.to(desc, 0.2, {bottom: "0"});
          });
          angular.element('.normal').on('mouseout', function() {
            var desc = angular.element(this).find('.description');
            TweenMax.to(desc, 0.2, {bottom: "-100px"});
          });

        };

      }
    }
  })
  .directive('sugeridas', function() {
    return {
      restrict: 'EA',
      templateUrl: 'js/app/views/components/sugeridas.html',
      link: function(scope, elem, attrs) {

        scope.init = function() {

          angular.element('.normal').on('mouseover', function() {
            console.log('mouse');
            var desc = angular.element(this).find('.description');
            TweenMax.to(desc, 0.2, {bottom: "0"});
          });
          angular.element('.normal').on('mouseout', function() {
            var desc = angular.element(this).find('.description');
            TweenMax.to(desc, 0.2, {bottom: "-100px"});
          });

        };

      }
    }
  });
