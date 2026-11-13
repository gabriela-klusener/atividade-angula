# Formly — versão AngularJS

Projeto convertido de React para AngularJS 1.8.3, mantendo a proposta visual e o fluxo de formulários da versão original.

## Como executar

1. Extraia o arquivo ZIP.
2. Abra a pasta `atividade-angularjs-formly` no VS Code.
3. Abra `index.html` no navegador. Recomenda-se utilizar a extensão **Live Server** do VS Code e clicar em **Go Live**.
4. Não é necessário executar `npm install` nem `npm run dev`.

A aplicação carrega AngularJS 1.8.3 pelo CDN, portanto é necessária conexão com a internet para carregar a biblioteca.

## Estrutura

- `index.html`: estrutura visual e importação dos scripts.
- `js/app.js`: módulo principal `formlyApp`.
- `js/controllers/main.controller.js`: dados, navegação, validação e interação da tela.
- `js/services/form-data.service.js`: leitura e gravação dos dados no localStorage.
- `js/services/toast.service.js`: serviço responsável pelas notificações temporárias.
- `js/directives/`: seis diretivas visuais independentes.
- `src/styles.css`: estilos e regras responsivas.

## Diretivas exigidas

1. `<accordion>` — perguntas frequentes expansíveis; apenas um item aberto por vez.
2. `<pagination>` — navegação entre os formulários.
3. `<progress-bar>` — percentual de preenchimento.
4. `<form-tabs>` — abas para alternar entre os formulários.
5. `<dropdown-menu>` — seleção de responsável, fecha ao selecionar ou clicar fora.
6. `<toast-notification>` — feedback de sucesso/erro com fechamento automático e manual.

## Conceitos AngularJS demonstrados

- Módulos: `formlyApp`, `formly.services`, `formly.directives` e `formly.controllers`.
- Controlador: `MainController`.
- Diretivas com escopos isolados e bindings (`=`, `@`, `&`).
- Two-way data binding com `ng-model`.
- Eventos com `ng-click`, `ng-change` e `ng-submit`.
- Serviço/factory para persistência e notificações.
- Filtros nativos, como `number`.
- Expressões, `ng-repeat`, `ng-if`, `ng-class` e `ng-style`.

> Observação: AngularJS 1.x é uma tecnologia legada, mas foi utilizado intencionalmente por ser o framework solicitado na atividade.
