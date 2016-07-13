/**
* static_aboutController
* @namespace app.static_about.controllers
*/
(function () {
  'use strict';

  angular
    .module('app.static_about.controllers')
    .controller('static_aboutController', static_aboutController);

  static_aboutController.$inject = ['$scope', 'dogs'];

  /**
  * @namespace static_aboutController
  */
  function static_aboutController($scope, dogs) {

    var vm = this;

    activate();

    function activate() {
      console.log('activated static_about controller!');
      //dash.all();
    }
  }
})();
