/**
* static_groupsController
* @namespace app.static_groups.controllers
*/
(function () {
  'use strict';

  angular
    .module('app.static_groups.controllers')
    .controller('static_groupsController', static_groupsController);

  static_groupsController.$inject = ['$scope', 'insects'];

  /**
  * @namespace static_groupsController
  */
  function static_groupsController($scope, beetle) {

    var vm = this;

    activate();

    function activate() {
      console.log('activated static_groups controller!');
      //dash.all();
    }
  }
})();
