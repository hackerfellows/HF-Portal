/* 
 * user.firstname
 * user.lastname
 * user.major
 * user.graduation
 * user.hometown
 * user.phone
 * user.permanentresident
 * user.description
 * user.dreamjob
 * user.resume
 * user.coolthings
 * user.referral.friend
 * user.referral.careerfair
 * user.referral.club
 * user.referral.investdetroit
 * user.referral.grandcircus
 * user.referral.other
 * user.referral.othervalue
 * user.whyHF
 * user.MIimpact
 * user.devtype
 * user.devskills
 * user.achievement
 * user.involvements
 * user.github
 * user.comments
 * user.firstname
 *
 */


(function () {
    'use strict';

    angular
        .module('app.application.controllers')
        .controller('FellowAppController', FellowAppController);

    FellowAppController.$inject = ['$scope'];

    function FellowAppController($scope) {
        function apply(fellow) {
            console.log("Apply is a stub function");
        }
        function cancel() {
            console.log("Cancel is a stub function");
        }
    }
})();
