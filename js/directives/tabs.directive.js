(function () {
  "use strict";

  angular.module("formly.directives")
    .directive("formTabs", function () {
      return {
        restrict: "E",
        scope: {
          tabs: "=",
          activeId: "=",
          onSelect: "&"
        },
        template:
          '<div class="tabs" role="tablist" aria-label="Formulários">' +
            '<button type="button" class="tab" role="tab" ng-repeat="tab in tabs track by tab.id" ng-class="{ active: activeId === tab.id }" ng-attr-aria-selected="{{ activeId === tab.id }}" ng-click="select(tab.id)">{{ tab.title }}</button>' +
          '</div>',
        link: function (scope) {
          scope.select = function (id) {
            scope.onSelect({ id: id });
          };
        }
      };
    });
})();
