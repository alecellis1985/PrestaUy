(function () {
  'use strict';
  debugger;
  angular.module('shared').controller('alertCtrl', alertCtrl);

  alertCtrl.$inject = ['$scope', '$timeout'];

  function alertCtrl($scope, $timeout) {
    var vm = this;
    vm.alerts = [];
    vm.closeAlert = closeAlert;
    $scope.$on('alert-event', function (event, args) {
      $scope.addAlert(args);
      $timeout(function () {
        $('.alertsTop button').removeClass('ng-hide');
      }, 5);
    });

    $scope.addAlert = function (alertElem) {
      if (alertElem.type === 'danger') {
        vm.alerts.forEach(function (alert, index) {
          if (alert.type === 'danger')
            vm.closeAlert(index);
        });
      }
      vm.alerts.push(alertElem);
      var alertIndex = vm.alerts.length - 1;
      $timeout(function () {
        vm.closeAlert(alertIndex);
      }, 5000);
    };

    function closeAlert(index) {
      vm.alerts.splice(index, 1);
    }
  }
})();