(function () {
  "use strict";

  angular.module("formly.services", [])
    .factory("FormDataService", function ($window) {
      var STORAGE_KEY = "formly-angular-data";

      function emptyData() {
        return { answers: {}, completed: {}, responsaveis: {} };
      }

      function load() {
        try {
          var stored = $window.localStorage.getItem(STORAGE_KEY);
          var data = stored ? JSON.parse(stored) : emptyData();
          data.answers = data.answers || {};
          data.completed = data.completed || {};
          data.responsaveis = data.responsaveis || {};
          return data;
        } catch (error) {
          return emptyData();
        }
      }

      function save(data) {
        $window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }

      return {
        load: load,
        save: save
      };
    });
})();
