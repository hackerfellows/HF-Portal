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

        $scope.fellows = [];
        $scope.companies = [];
        $scope.userListLoad = function() {

            if( $scope.fellows.length === 0 ) {

                Entities.allWithUser('fellows').success(function (fellows) {

                    $scope.fellows = fellows;
                    console.log("fellows retrieved");

                });
            }

            if( $scope.companies.length === 0 ) {

                Entities.allWithUser('companies').success(function (companies) {

                    $scope.companies = companies;
                     console.log("companies retrieved");
                });
            }
        };
        $scope.userListLoad();


        $scope.viewApplicant = function(fellow){

            // send user data to service

            var modalInstance = $uibModal.open({

                templateUrl: 'components/admin/applicants/partials/view-applicant.html',
                controller: 'ViewApplicantModalInstanceController',
                size: 'md',
                resolve: {
                    fellow: function() {

                        return fellow;
                    }
                }

            });

            // show success/failure
            return false;
        };



        $scope.rejectApplicant = function( fellow ){

            var c = confirm( "Are you sure you want to reject" + fellow.first_name + " " + fellow.last_name + "?");

            if( c ){

                // remove fellow
//                Fellows.destroy( fellow.id ).then( function(){

                    // now remove user
//                    User.destroy( fellow.user_id).then( function(){

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

    ViewApplicantModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'Entities', 'fellow', 'User' ];
    function ViewApplicantModalInstanceController ($scope, $uibModalInstance, Entities, fellow, User) {

        $scope.user = fellow.user;
        $scope.fellow = fellow;

        $scope.init = function(){

            $("[name='enabled']").bootstrapSwitch({

                onText: "Visible",
                offText: "Hidden",
                state: $scope.fellow.enabled,
                onSwitchChange: function (event, state) {

                    $scope.fellow.enabled = ( state ) ? 1 : 0;
                }
            });
        };

        $scope.ok = function ok() {

            console.log("in function ok");

        };

        $scope.cancel = function cancel() {
            $uibModalInstance.dismiss('cancel');
        };
    }

    
   

})();
