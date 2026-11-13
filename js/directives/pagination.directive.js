(function () {
  "use strict";

  angular.module("formly.directives")
    .directive("pagination", function () {
      return {
        restrict: "E",
        scope: {
          currentPage: "=",
          totalPages: "=",
          onPageChange: "&"
        },
        template:
          '<nav class="pagination" aria-label="Paginação">' +
            '<button type="button" ng-click="change(currentPage - 1)" ng-disabled="currentPage <= 0">← Anterior</button>' +
            '<div class="page-numbers">' +
              '<button type="button" ng-repeat="page in pages track by $index" ng-class="{ active: currentPage === $index }" ng-click="change($index)" aria-label="Ir para página {{ $index + 1 }}">{{ $index + 1 }}</button>' +
            '</div>' +
            '<span class="pagination-status">Página {{ currentPage + 1 }} de {{ totalPages }}</span>' +
            '<button type="button" ng-click="change(currentPage + 1)" ng-disabled="currentPage >= totalPages - 1">Próximo →</button>' +
          '</nav>',
        link: function (scope) {
          function updatePages() {
            var total = Math.max(0, Number(scope.totalPages) || 0);
            scope.pages = [];
            for (var index = 0; index < total; index += 1) {
              scope.pages.push(index);
            }
          }
          scope.change = function (page) {
            if (page < 0 || page >= scope.totalPages) return;
            scope.onPageChange({ page: page });
          };
          scope.$watch("totalPages", updatePages);
          updatePages();
        }
      };
    });
})();
