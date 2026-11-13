(function () {
  "use strict";

  angular.module("formly.directives")
    .directive("dropdownMenu", function ($document) {
      return {
        restrict: "E",
        scope: {
          label: "@",
          options: "=",
          value: "=",
          onSelect: "&"
        },
        template:
          '<div class="dropdown" ng-class="{ open: isOpen }">' +
            '<label>{{ label }}</label>' +
            '<button type="button" class="dropdown-button" ng-click="toggle()" aria-haspopup="true" ng-expanded="isOpen">' +
              '<span>{{ value || "Selecione uma opção" }}</span><span>{{ isOpen ? "▲" : "▼" }}</span>' +
            '</button>' +
            '<div class="dropdown-options" ng-if="isOpen">' +
              '<button type="button" ng-repeat="option in options track by $index" ng-click="choose(option)">{{ option }}</button>' +
            '</div>' +
          '</div>',
        link: function (scope, element) {
          scope.isOpen = false;
          scope.toggle = function () { scope.isOpen = !scope.isOpen; };
          scope.choose = function (option) {
            scope.onSelect({ option: option });
            scope.isOpen = false;
          };

          function closeOnOutsideClick(event) {
            if (!element[0].contains(event.target)) {
              scope.$applyAsync(function () { scope.isOpen = false; });
            }
          }

          $document.on("click", closeOnOutsideClick);
          scope.$on("$destroy", function () {
            $document.off("click", closeOnOutsideClick);
          });
        }
      };
    });
})();
