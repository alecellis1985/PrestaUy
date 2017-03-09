(function () {
  'use strict';
  angular.module('shared').config(['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider',
    function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
      // Now set up the states
      $urlMatcherFactoryProvider.caseInsensitive(true);
      $urlMatcherFactoryProvider.strictMode(false);

      $urlRouterProvider.otherwise("/");
    }
  ]);
})();