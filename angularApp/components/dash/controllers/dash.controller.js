/**
 * DashController
 * @namespace app.dash.controllers
 */
(function () {
    'use strict';

    angular
        .module('app.dash.controllers')
        .controller('DashController', DashController);

    DashController.$inject = ['$scope'];

    /**
     * @namespace DashController
     */
    function DashController($scope) {
        var vm = this;
        activate();
        function activate() {
            //console.log('activated dash controller!');
            //dash.all();
        }
    }
})();
