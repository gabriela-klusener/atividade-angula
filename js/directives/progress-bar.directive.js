(function () {
  "use strict";

  angular.module("formly.directives")
    .directive("progressBar", function () {
      return {
        restrict: "E",
        scope: {
          value: "&",
          label: "@"
        },
        template:
          '<div class="progress-area">' +
            '<div class="progress-label"><span>{{ label || "Progresso" }}</span><strong>{{ percentage }}%</strong></div>' +
            '<div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" ng-attr-aria-valuenow="{{ percentage }}">' +
              '<div class="progress-fill" ng-style="{ width: percentage + \'%\' }"></div>' +
            '</div>' +
          '</div>',
        link: function (scope) {
          scope.$watch(scope.value, function (newValue) {
            var number = Number(newValue) || 0;
            scope.percentage = Math.max(0, Math.min(100, Math.round(number)));
          });
        }
      };
    });
})();
