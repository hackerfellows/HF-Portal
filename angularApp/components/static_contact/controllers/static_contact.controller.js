/**
* static_contactController
* @namespace app.static_contact.controllers
*/
(function () {
  'use strict';

  angular
    .module('app.static_contact.controllers')
    .controller('static_contactController', static_contactController);

  static_contactController.$inject = ['$scope', 'reptiles'];

  /**
  * @namespace static_contactController
  */
  function static_contactController($scope, reptiles) {

    var vm = this;

    activate();

    function activate() {
      console.log('activated static_contact controller!');
      //dash.all();
    }
  }
})();
