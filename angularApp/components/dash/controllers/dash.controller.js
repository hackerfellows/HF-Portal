/**
* DashController
* @namespace app.dash.controllers
*/
(function () {
  'use strict';

  angular
    .module('app.dash.controllers')
    .controller('DashController', DashController);

  DashController.$inject = ['$scope', 'cats'];

  /**
  * @namespace DashController
  */
  function DashController($scope, cats) {

    var vm = this;

    activate();

    function activate() {
      //console.log('activated dash controller!');
      //dash.all();
    }
  }
})();
