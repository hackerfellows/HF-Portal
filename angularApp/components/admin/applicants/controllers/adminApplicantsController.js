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

        $scope.fellow_applicants = []
        $scope.company_applicants = []
        $scope.userListLoad = function() {

            // If there are fellow applicants, retrieve them
            if( $scope.fellow_applicants.length === 0 ) {

                Entities.getApplicants('fellows').success(function (fellow_applicants) {

                    $scope.fellow_applicants = fellow_applicants;
                    console.log("got applicants");
                    console.log(fellow_applicants)

                });
            }
            if( $scope.company_applicants.length === 0 ) {

                Entities.getApplicants('companies').success(function (company_applicants) {

                    $scope.company_applicants = company_applicants;
                    console.log("got company applicants");
                    console.log(company_applicants)

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

            if(applicant.first_name === undefined){
                var c = confirm( "Are you sure you want to reject " + applicant.name + "?");

            }else{
                var c = confirm( "Are you sure you want to reject " + applicant.first_name + " " + applicant.last_name + "?");

            }
            if( c ){

                User.destroy(applicant.user.id ).then( function(){
                    console.log('deleted');
                    $window.location.reload();
                });
            }
        };

        $scope.acceptApplicant = function(applicant ){
            var flag = {
            		      flag: "application",
            		       value: 1
            		    }
            if(applicant.first_name === undefined){
                var c = confirm( "Are you sure you want to accept " + applicant.name + "?");

            }else{
                var c = confirm( "Are you sure you want to accept " + applicant.first_name + " " + applicant.last_name + "?");

            }
            if( c ){

                User.setFlag(applicant.user, flag).then( function(){
                    console.log('accepted');
                    $window.location.reload();
                });
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
        $scope.isApplicantFellow = false;
        $scope.isApplicantCompany = false;

        var str = '';
        if(applicant.user.userType.toLowerCase() == 'fellow'){
            str = 'fellows';
            $scope.isApplicantFellow = true;

        }else{
            str = 'companies';
            $scope.isApplicantCompany = true;

        }
            $scope.init = function(){
            Entities.getApplication(applicant.user, str).success(function (application) {

                $scope.application = application;
                console.log("got application");
                console.log(application);

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
