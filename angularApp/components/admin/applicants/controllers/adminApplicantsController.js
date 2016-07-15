/**
* AdminApplicantsController
* @namespace app.adminApplicants.controllers
*/
(function () {
    'use strict';

    angular
    .module('app.adminApplicants.controllers')
    .controller('AdminApplicantsController', AdminApplicantsController);

    AdminApplicantsController.$inject = ['$scope', '$location', '$uibModal', '$window', 'Entities', 'User'];

    /**
     * @namespace AdminUsersController
     */
     function AdminApplicantsController($scope, $location, $uibModal, $window, Entities, User) {

        console.log("in admin applicants controller"); 

        $scope.applicants = [];
        $scope.userListLoad = function() {

            if( $scope.applicants.length === 0 ) {

                Entities.getApplicants('fellows').success(function (applicants) {

                    $scope.applicants = applicants;
                    console.log("got applicants");

                });
            }

            
        };
        $scope.userListLoad();


        $scope.viewApplicant = function(applicant){

            // send user data to service

            var modalInstance = $uibModal.open({

                templateUrl: 'components/admin/applicants/partials/view-applicant.html',
                controller: 'ViewApplicantModalInstanceController',
                size: 'md',
                resolve: {
                    applicant: function() {

                        return applicant;
                    }
                }

            });

            // show success/failure
            return false;
        };



        $scope.rejectApplicant = function(applicant ){

            var c = confirm( "Are you sure you want to reject" + applicant.first_name + " " + applicant.last_name + "?");

            if( c ){

                // remove applicant
//                Fellows.destroy( applicant.id ).then( function(){

                    // now remove user
//                    User.destroy( applicant.user_id).then( function(){

                        // reload users
//                        $window.location.reload();
//                    });
//                });
            }
        };

        $scope.acceptApplicant = function(applicant ){

            var c = confirm( "Are you sure you want to accept" + applicant.first_name + " " + applicant.last_name + "?");

            if( c ){

                // remove applicant
//                Fellows.destroy( applicant.id ).then( function(){

                    // now remove user
//                    User.destroy( applicant.user_id).then( function(){

                        // reload users
//                        $window.location.reload();
//                    });
//                });
            }
        };



    }


    /**
     * Modal Instance Controllers
     * @namespace app.adminUsers.controllers
     */

    angular
        .module('app.adminApplicants.controllers')
        .controller('ViewApplicantModalInstanceController', ViewApplicantModalInstanceController);

    ViewApplicantModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'Entities', 'applicant', 'User' ];
    function ViewApplicantModalInstanceController ($scope, $uibModalInstance, Entities, applicant, User) {

        $scope.user = applicant.user;
        $scope.applicant = applicant;

        $scope.init = function(){

            $("[name='enabled']").bootstrapSwitch({

                onText: "Visible",
                offText: "Hidden",
                state: $scope.applicant.enabled,
                onSwitchChange: function (event, state) {

                    $scope.applicant.enabled = ( state ) ? 1 : 0;
                }
            });
        };

        $scope.ok = function ok() {
            //This needs to make an api call to the database to update
            console.log("in function ok");

        };

        $scope.cancel = function cancel() {
            $uibModalInstance.dismiss('cancel');
        };
    }

    
   

})();
