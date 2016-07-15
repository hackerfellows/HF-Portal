/**
* AdminController
* @namespace app.admin.controllers
*/
(function () {
    'use strict';

    angular
    .module('app.admin.controllers')
    .controller('AdminController', AdminController);

    AdminController.$inject = ['$scope'];

    /**
    * @namespace AdminController
    */
    function AdminController($scope) {
        console.log("in admin controller");
        return 0;
    }

})();
