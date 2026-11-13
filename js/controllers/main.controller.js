(function () {
  "use strict";

  angular.module("formly.controllers", [])
    .controller("MainController", function ($scope, $location, FormDataService, ToastService) {
      $scope.forms = [
        {
          id: "pessoal",
          icon: "01",
          title: "Informações pessoais",
          description: "Preencha seus dados pessoais.",
          fields: [
            { name: "nome", label: "Nome completo", type: "text", required: true },
            { name: "email", label: "E-mail", type: "email", required: true },
            { name: "telefone", label: "Telefone", type: "tel", required: true },
            { name: "nascimento", label: "Data de nascimento", type: "date", required: true }
          ]
        },
        {
          id: "profissional",
          icon: "02",
          title: "Informações profissionais",
          description: "Conte um pouco sobre sua vida profissional.",
          fields: [
            { name: "profissao", label: "Profissão", type: "text", required: true },
            { name: "empresa", label: "Empresa", type: "text", required: true },
            { name: "cargo", label: "Cargo", type: "text", required: true },
            { name: "experiencia", label: "Tempo de experiência", type: "text", required: true },
            { name: "linkedin", label: "LinkedIn", type: "url", required: false }
          ]
        },
        {
          id: "endereco",
          icon: "03",
          title: "Informações de endereço",
          description: "Informe seu endereço atual.",
          fields: [
            { name: "cep", label: "CEP", type: "text", required: true },
            { name: "rua", label: "Rua", type: "text", required: true },
            { name: "numero", label: "Número", type: "text", required: true },
            { name: "bairro", label: "Bairro", type: "text", required: true },
            { name: "cidade", label: "Cidade", type: "text", required: true },
            { name: "estado", label: "Estado", type: "text", required: true }
          ]
        }
      ];

      $scope.faqItems = [
        {
          question: "Como preencher os formulários?",
          answer: "Na página inicial, escolha um formulário e preencha os campos solicitados. Os campos marcados com asterisco são obrigatórios."
        },
        {
          question: "Posso alterar minhas respostas?",
          answer: "Sim! Você pode voltar a qualquer formulário e modificar suas respostas. As alterações são salvas automaticamente."
        },
        {
          question: "Minhas informações ficam salvas?",
          answer: "Sim. As respostas ficam salvas no armazenamento local do navegador utilizado para acessar esta aplicação."
        },
        {
          question: "Como sei que terminei um formulário?",
          answer: "Uma mensagem de confirmação será exibida quando todos os campos obrigatórios forem preenchidos."
        }
      ];

      $scope.responsavelOptions = ["Eu mesmo", "Outra pessoa", "Ambos"];
      $scope.savedData = FormDataService.load();

      function ensureAnswerObjects() {
        $scope.forms.forEach(function (form) {
          if (!$scope.savedData.answers[form.id]) {
            $scope.savedData.answers[form.id] = {};
          }
        });
      }

      function syncRoute() {
        var path = $location.path();
        var match = path.match(/^\/formulario\/([^/]+)$/);
        $scope.formId = match ? match[1] : null;
        $scope.currentFormIndex = $scope.forms.findIndex(function (form) {
          return form.id === $scope.formId;
        });

        if ($scope.formId && $scope.currentFormIndex === -1) {
          $location.path("/");
          return;
        }

        $scope.currentForm = $scope.currentFormIndex >= 0
          ? $scope.forms[$scope.currentFormIndex]
          : null;
        $scope.showForm = Boolean($scope.currentForm);
      }

      ensureAnswerObjects();
      syncRoute();
      $scope.$on("$locationChangeSuccess", syncRoute);

      $scope.persist = function () {
        FormDataService.save($scope.savedData);
      };

      $scope.getProgress = function (form) {
        var required = form.fields.filter(function (field) { return field.required; });
        if (!required.length) return 100;

        var answers = $scope.savedData.answers[form.id] || {};
        var filled = required.filter(function (field) {
          return String(answers[field.name] || "").trim() !== "";
        });
        return Math.round((filled.length / required.length) * 100);
      };

      $scope.allFormsCompleted = function () {
        return $scope.forms.every(function (form) {
          return Boolean($scope.savedData.completed[form.id]);
        });
      };

      $scope.openForm = function (id) {
        $location.path("/formulario/" + id);
      };

      $scope.goHome = function () {
        $location.path("/");
      };

      $scope.goToForm = function (index) {
        if (index < 0 || index >= $scope.forms.length) return;
        $location.path("/formulario/" + $scope.forms[index].id);
      };

      $scope.selectForm = function (id) {
        $scope.openForm(id);
      };

      $scope.setResponsavel = function (option) {
        if (!$scope.currentForm) return;
        $scope.savedData.responsaveis[$scope.currentForm.id] = option;
        $scope.persist();
      };

      $scope.onAnswerChange = function (formId) {
        $scope.savedData.completed[formId] = false;
        $scope.persist();
      };

      $scope.completeForm = function () {
        if (!$scope.currentForm) return;

        var answers = $scope.savedData.answers[$scope.currentForm.id] || {};
        var missing = $scope.currentForm.fields.filter(function (field) {
          return field.required && !String(answers[field.name] || "").trim();
        });

        if (missing.length) {
          ToastService.show("error", "Preencha todos os campos obrigatórios antes de concluir.");
          return;
        }

        $scope.savedData.completed[$scope.currentForm.id] = true;
        $scope.persist();
        ToastService.show("success", "Formulário concluído com sucesso!");
      };

      $scope.closeToast = function () {
        ToastService.close();
      };
    });
})();
