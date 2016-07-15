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

    FellowAppController.$inject = ['$scope', 'Entities'];

    function FellowAppController($scope, Entities) {

        initFormData();

        function initFormData() {
            Entities.getApplication("fellows").then(function(thing) {
                $scope.fellow = thing.data.data;
                console.log(thing.data.data);
            }, function() {
                console.log("Error in Entities.getAppliction()");
            });
        }

        $scope.apply = function(fellow) {
            Entities.updateApplication(fellow, "fellows");
            showToastSuccess("Application submitted");
            console.log($scope.fellow);
        };
        $scope.cancel = function(fellow) {
            Entities.updateApplication(fellow, "fellows");
            showToastInfo("Application saved");
            console.log($scope.fellow);
        };
    }
})();
