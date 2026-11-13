(function () {
  "use strict";

  angular.module("formly.directives")
    .directive("toastNotification", function () {
      return {
        restrict: "E",
        scope: {
          toast: "=",
          onClose: "&"
        },
        template:
          '<div class="toast" ng-if="toast" ng-class="toast.type" role="status" aria-live="polite">' +
            '<span class="toast-icon">{{ toast.type === "success" ? "✓" : (toast.type === "error" ? "!" : "i") }}</span>' +
            '<span class="toast-message">{{ toast.message }}</span>' +
            '<button type="button" aria-label="Fechar notificação" ng-click="onClose()">×</button>' +
          '</div>'
      };
    });
})();
