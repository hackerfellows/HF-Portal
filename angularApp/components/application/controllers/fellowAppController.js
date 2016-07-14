/*
 * user.first_name*
 * user.last_name*
 * user.university
 * user.major
 * user.graduation
 * user.hometown
 * user.phone
 * user.residentUSA*
 * user.description
 * user.dreamjob
 * user.resumeURL*
 * user.coolthings
 * user.referral *referral is a text field*
 * user.whyHF
 * user.MIimpact
 * user.developer_type*
 * user.devskills
 * user.achievement
 * user.involvements
 * user.git_hub*
 * user.comments
 *
 */


(function () {
    'use strict';

    angular
        .module('app.application.controllers')
        .controller('FellowAppController', FellowAppController);

    FellowAppController.$inject = ['$scope', 'User', 'Entities'];

    function FellowAppController($scope, User, Entities) {
        console.log("FellowAppController loaded");

        function initFormData() {
            $scope.fellow = Entities.getApplication("fellows");
        }

        function apply(fellow) {
            Entities.updateApplication(fellow, "fellows");
        }
        function cancel() {
            console.log("Cancel is a stub function");
        }
    }
})();
