/*
 *
 */


(function () {
    'use strict';

    angular
        .module('app.application.controllers')
        .controller('CompanyAppController', CompanyAppController);

    CompanyAppController.$inject = ['$scope'];

    function CompanyAppController($scope) {
        function apply(company) {
            console.log("Apply is a stub function");
            //Make api call for application
        }
        function cancel() {
            console.log("Cancel is a stub function");
        }
    }
})();
