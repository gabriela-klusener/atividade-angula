(function () {
  "use strict";

  angular.module("formly.directives", [])
    .directive("accordion", function () {
      return {
        restrict: "E",
        scope: {
          items: "=",
          heading: "@",
          subtitle: "@"
        },
        template:
          '<section class="faq">' +
            '<h2>{{ heading || "Perguntas frequentes" }}</h2>' +
            '<p class="subtitle" ng-if="subtitle">{{ subtitle }}</p>' +
            '<div class="accordion-item" ng-repeat="item in items track by $index">' +
              '<button type="button" class="accordion-button" ng-click="toggle($index)" ng-expanded="openIndex === $index">' +
                '<span class="accordion-question">{{ item.question }}</span>' +
                '<span class="accordion-symbol">{{ openIndex === $index ? "−" : "+" }}</span>' +
              '</button>' +
              '<div class="accordion-content" ng-class="{ expanded: openIndex === $index }" ng-attr-aria-hidden="{{ openIndex !== $index }}">' +
                '<div class="accordion-inner">{{ item.answer }}</div>' +
              '</div>' +
            '</div>' +
          '</section>',
        link: function (scope) {
          scope.openIndex = null;
          scope.toggle = function (index) {
            scope.openIndex = scope.openIndex === index ? null : index;
          };
        }
      };
    });
})();
