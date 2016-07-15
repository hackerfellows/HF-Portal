/**
 * DashController
 * @namespace app.dash.controllers
 */
(function () {
    'use strict';

    angular
        .module('app.dash.controllers')
        .controller('DashController', DashController);

    DashController.$inject = ['$scope', 'User'];

    /**
     * @namespace DashController
     */
    function DashController($scope, User) {

        $scope.currentID = User.getCurrentUser().id;
    }
})();
