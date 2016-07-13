/**
* static_applicationController
* @namespace app.static_application.controllers
*/
(function () {
  'use strict';

  angular
    .module('app.static_application.controllers')
    .controller('static_applicationController', static_applicationController);

  static_applicationController.$inject = ['$scope', 'birds'];

  /**
  * @namespace static_applicationController
  */
  function static_applicationController($scope, birds) {

    var vm = this;

    activate();

    function activate() {
      console.log('activated static_application controller!');
      //dash.all();
    }
  }
})();
