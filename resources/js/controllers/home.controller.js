(function () {
  'use strict';
  angular.module('shared').controller('homeCtrl', homeCtrl);
  homeCtrl.$inject = ['$translate', '$timeout', '$rootScope', 'CommonService'];
  function homeCtrl($translate, $timeout, $rootScope, CommonService) {
    var vm = this;
    vm.user = {};

    vm.sendEmail = function (isValid) {
      if (!isValid) {
        $rootScope.$broadcast('alert-event', {type: 'danger', msg: "Existen errores en el formulario, por favor complete correctamente todos los campos;"});
        return;
      }

      CommonService.postJsonRequest('api/sendMail', vm.user).then(function (result) {
        if (result.data.success)
          $rootScope.$broadcast('alert-event', {type: 'success', msg: 'El mail ha sido enviado'});
        else
          $rootScope.$broadcast('alert-event', {type: 'danger', msg: result.data.msg});
      });
    };

    init();

    function init() {
    }
  }
})();