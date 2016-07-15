/**
* AdminUsersController
* @namespace app.adminUsers.controllers
* use Jessica's Entities Service to update/remove fellows and comapnies
* use Robin's User Service to update/remove users
*/
(function () {
    'use strict';

    angular
    .module('app.adminUsers.controllers')
    .controller('AdminUsersController', AdminUsersController);

    AdminUsersController.$inject = ['$scope', '$location', '$uibModal', '$window', 'Entities', 'User'];

    /**
     * @namespace AdminUsersController
     */
     function AdminUsersController($scope, $location, $uibModal, $window, Entities, User) {

       

        $scope.fellows = [];
        $scope.companies = [];
        $scope.userListLoad = function() {

            if( $scope.fellows.length === 0 ) {

                Entities.getAll('fellows').success(function (fellows) {

                    $scope.fellows = fellows;
                    console.log("fellows retrieved");
                    console.log(fellows);

                });
            }

            if( $scope.companies.length === 0 ) {

                Entities.getAll('companies').success(function (companies) {

                    $scope.companies = companies;
                    console.log("companies retrieved");
                    console.log(companies);
                });
            }
        };
        $scope.userListLoad();


        $scope.fellowVotes = function( fellow ){

            var modalInstance = $uibModal.open({

                templateUrl: 'components/admin/users/partials/fellow-votes.html',
                controller: 'FellowVotesModalInstanceController',
                size: 'md',
                resolve: {

                    fellow: function(){
                        return fellow;
                    }
                }

            });

            // show success/failure
            return false;

        };

        $scope.companyVotes = function( company ){

            var modalInstance = $uibModal.open({

                templateUrl: 'components/admin/users/partials/company-votes.html',
                controller: 'CompanyVotesModalInstanceController',
                size: 'md',
                resolve: {

                    company: function(){
                        return company;
                    }
                }

            });

            // show success/failure
            return false;

        };

        $scope.editFellow = function(fellow){

            // send user data to service

            var modalInstance = $uibModal.open({

                templateUrl: 'components/admin/users/partials/edit-fellow-form.html',
                controller: 'EditFellowModalInstanceController',
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

        $scope.editCompany= function(company){

            // send user data to service

            var modalInstance = $uibModal.open({

                templateUrl: 'components/admin/users/partials/edit-company-form.html',
                controller: 'EditCompanyModalInstanceController',
                size: 'md',
                resolve: {
                    company: function(){
                        return company;
                    }
                }

            });

            // show success/failure
            return false;
        };


        // @TODO - Implement Later
        $scope.archiveFellow = function(user){

            console.log("Archive User: "+user.id);
            // send user data to service

            // show success/failure
            return false;
        };



        $scope.removeFellow = function( fellow ){

            var c = confirm( "Are you sure you want to delete " + fellow.first_name + " " + fellow.last_name + "?");

            if( c ){
                User.destroy(fellow.user.id ).then( function(){
                    console.log('deleted');
                    $window.location.reload();
                });
               
            }
        };


        $scope.removeCompany = function( company ){

            var c = confirm( "Are you sure you want to delete " + company.name + " " + "?");

            if( c ){

                User.destroy(company.user.id ).then( function(){
                    console.log('deleted');
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
        .module('app.adminUsers.controllers')
        .controller('EditFellowModalInstanceController', EditFellowModalInstanceController)
        .controller('EditCompanyModalInstanceController', EditCompanyModalInstanceController)
        .controller('CompanyVotesModalInstanceController', CompanyVotesModalInstanceController)
        .controller('FellowVotesModalInstanceController', FellowVotesModalInstanceController);

    EditFellowModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'Entities', 'fellow', 'User'];
    function EditFellowModalInstanceController ($scope, $uibModalInstance, Entities, fellow, User) {

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

            Entities.updateProfile(fellow, 'fellows').then( function(){
                console.log('fellow info being updated');
            });
            console.log("in function ok");
            $uibModalInstance.dismiss('cancel');
        };

        $scope.cancel = function cancel() {
            $uibModalInstance.dismiss('cancel');
        };
    }

    EditCompanyModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'company', 'Entities', 'User'];
    function EditCompanyModalInstanceController ($scope, $uibModalInstance, company, Entities, User) {

        $scope.user = company.user;
        $scope.company = company;

        $scope.init = function(){

            $("[name='enabled']").bootstrapSwitch({

                onText: "Visible",
                offText: "Hidden",
                state: $scope.company.enabled,
                onSwitchChange: function (event, state) {

                    $scope.company.enabled = ( state ) ? 1 : 0;
                }
            });
        };

        $scope.ok = function ok() {

            Entities.updateProfile(company, 'companies').then( function(){
                console.log('company info being updated');
            });
            console.log("in function ok");
            $uibModalInstance.dismiss('cancel');
       };

        $scope.cancel = function cancel() {
            $uibModalInstance.dismiss('cancel');
        };
    }

    FellowVotesModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'fellow', 'User' ];
    function FellowVotesModalInstanceController( $scope, $uibModalInstance, fellow, User ){

        $scope.user = fellow.user;
        $scope.fellow = fellow;

        // Check fellow VotesFor to see if a company voted for a fellow
        $scope.companyVotedForFellow = function( company_user_id ){

            for( var i = 0; i < fellow.user.VotesFor.length; i++ )
            {
                var vote = fellow.user.VotesFor[i];

                if( vote.id === company_user_id )
                {
                    return true;
                }
            }

            return false;
        };

        // Check fellow VotesCast to see if they voted for a company
        $scope.fellowVotedForCompany = function( company_user_id ){

            for( var i = 0; i < fellow.user.VotesCast.length; i++ )
            {
                var vote = fellow.user.VotesCast[i];

                if( vote.id === company_user_id )
                {
                    return true;
                }
            }

            return false;
        };

        $scope.ok = function ok() {

            $uibModalInstance.close();
        };
    }

    CompanyVotesModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'company', 'User' ];
    function CompanyVotesModalInstanceController( $scope, $uibModalInstance, company, User ){

        $scope.company = company;

        // Check fellow VotesCast to see if they voted for a company
        $scope.fellowVotedForCompany = function( company_user_id ){

            for( var i = 0; i < company.user.VotesFor.length; i++ )
            {
                var vote = company.user.VotesFor[i];

                if( vote.id === company_user_id )
                {
                    return true;
                }
            }

            return false;
        };

        // Check fellow VotesFor to see if a company voted for a fellow
        $scope.companyVotedForFellow = function( company_user_id ){

            for( var i = 0; i < company.user.VotesCast.length; i++ )
            {
                var vote = company.user.VotesCast[i];

                if( vote.id === company_user_id )
                {
                    return true;
                }
            }

            return false;
        };

        $scope.ok = function ok() {

            $uibModalInstance.close();
        };
    }

})();
