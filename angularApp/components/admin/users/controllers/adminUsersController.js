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

                // remove fellow
                //Fellows.destroy( fellow.id ).then( function(){

                    // now remove user
                   // User.destroy( fellow.user_id).then( function(){

                        // reload users
                    //    $window.location.reload();
                   // });
               // });

                Entities.destory(fellow.user_id, 'fellows').then( function(){
                    $window.location.reload();
                    console.log('destroying fellow');
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
        .controller('CreateUserModalInstanceController', CreateUserModalInstanceController)
        .controller('CompanyVotesModalInstanceController', CompanyVotesModalInstanceController)
        .controller('FellowVotesModalInstanceController', FellowVotesModalInstanceController);

    EditFellowModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'Entities', 'fellow' ];
    function EditFellowModalInstanceController ($scope, $uibModalInstance, Entities, fellow) {

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

    EditCompanyModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'company', 'Entities'];
    function EditCompanyModalInstanceController ($scope, $uibModalInstance, company, Entities) {

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

            console.log("in the function ok with company");
       };

        $scope.cancel = function cancel() {
            $uibModalInstance.dismiss('cancel');
        };
    }

    FellowVotesModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'fellow' ];
    function FellowVotesModalInstanceController( $scope, $uibModalInstance, fellow ){

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

    CompanyVotesModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'company' ];
    function CompanyVotesModalInstanceController( $scope, $uibModalInstance, company ){

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

    CreateUserModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'Entities' ];
    function CreateUserModalInstanceController ($scope, $uibModalInstance, Entities) {

        $scope.verify_password = "";

        $scope.create = function (user){

            $scope.errors = [];

            // Form is being validated by angular, but leaving this just in case
            if( typeof user  === "undefined"){

                $scope.errors.push( "Add some data first" );

            }
            else {

                if( typeof user.email === "undefined" ) {

                    $scope.errors.push( "Enter an email" );
                }

                if( typeof user.password === "undefined" ) {

                    $scope.errors.push( "Enter a password" );
                }

                if( typeof user.userType === "undefined" ) {

                    $scope.errors.push( "Choose a user type" );
                }

                if( user.password !== $scope.verify_password ){

                    $scope.errors.push( "Passwords do not match" );
                }
            }


            if( $scope.errors.length === 0 ){

                // send user to API via Service
                User.create(user).then( function(response) {

                    // create user success callback
                    //console.log(response);

                    console.log( user );

                    var user_id = response.data.id;

                    if( user.userType === "Fellow" ){

                        var fellow_post = {

                            first_name: "",
                            last_name: "",
                            user_id: user_id
                        };
                        Fellows.create(fellow_post).then( function( fellow ){

                            // create fellow success callback
                            console.log( fellow );
                            $uibModalInstance.close( fellow );

                        }, function( response ){

                            // create fellow error callback
                            console.log( response );
                            $scope.errors.push( response.data.error );
                        });
                    }
                    else if( user.userType === "Company" ){

                        var company_post = {

                            name: "",
                            user_id: user_id
                        };
                        Companies.create(company_post).then( function( company ){

                            // create company success callback
                            $uibModalInstance.close( company );

                        }, function( response ){

                            // create fellow error callback
                            console.log( response );
                            $scope.errors.push( response.data.error );
                        });
                    }

                }, function( response ){

                    // create user error callback

                    console.log( response );
                    $scope.errors.push( response.data.error );
                });
            }
        };
        
        $scope.cancel = function cancel() {

            $uibModalInstance.dismiss('cancel');
        };


    }

})();
