/**
 * RegisterController
 * @namespace app.accounts.controllers
 */
(function () {
    'use strict';

    angular
        .module('app.accounts.controllers')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$scope', '$uibModalInstance', 'User'];//, 'Fellows', 'Companies' ];
    function RegisterController ($scope, $uibModalInstance, User) {//, Fellows, Companies) {
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
                    console.log( user );
                    var user_id = response.data.id;
                    if( user.userType === "Fellow" ){
                        var fellow_post = {
                            first_name: "",
                            last_name: "",
                            user_id: user_id
                        };

                        //Insert user
                    }
                    else if( user.userType === "Company" ){
                        var company_post = {
                            name: "",
                            user_id: user_id
                        };
                        //Insert company
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
