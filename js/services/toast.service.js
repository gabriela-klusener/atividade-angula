(function () {
  "use strict";

  angular.module("formly.services")
    .factory("ToastService", function ($rootScope, $timeout) {
      var timer = null;

      function show(type, message) {
        if (timer) $timeout.cancel(timer);

        $rootScope.toast = {
          type: type || "info",
          message: message || ""
        };

        timer = $timeout(function () {
          $rootScope.toast = null;
          timer = null;
        }, 3500);
      }

      function close() {
        if (timer) {
          $timeout.cancel(timer);
          timer = null;
        }
        $rootScope.toast = null;
      }

      return { show: show, close: close };
    });
})();
