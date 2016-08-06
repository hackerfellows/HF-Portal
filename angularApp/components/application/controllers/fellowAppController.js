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

    FellowAppController.$inject = ['$scope', 'Entities', 'User'];

    function FellowAppController($scope, Entities, User) {

        initFormData();

        $scope.required = true;

        function initFormData() {
            Entities.getApplication(User.getCurrentUser(), "fellows").then(function(thing) {
                $scope.fellow = thing.data.data;
            }, function() {
                console.log("Error in Entities.getAppliction()");
            });
        }

        $scope.save = function(fellow) {
            $scope.required = false;
            Entities.updateApplication(fellow, "fellows");
            showToastSuccess("Progress saved for future submission");
        };

        $scope.apply = function(fellow) {
            $scope.required = true;
            Entities.updateApplication(fellow, "fellows");
            // TODO: set Application submitted flag
            showToastSuccess("Application submitted");
        };
        $scope.cancel = function(fellow) {
            Entities.updateApplication(fellow, "fellows");
            showToastInfo("Application saved");
        };
    }
})();
