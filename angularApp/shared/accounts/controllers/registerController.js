/**
 * RegisterController
 * @namespace app.accounts.controllers
 */
(function () {
    'use strict';

    angular
        .module('app.accounts.controllers')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$window', '$scope', '$uibModalInstance', 'User'];//, 'Fellows', 'Companies' ];
    function RegisterController ($window, $scope, $uibModalInstance, User) {//, Fellows, Companies) {
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
                    var user_id = response.data.id;
                    var routedisplay;
                    if( user.userType === "Fellow" ){
                        routedisplay = "fellow";
                        var fellow_post = {
                            first_name: "",
                            last_name: "",
                            user_id: user_id
                        };
                        //Insert user
                    }
                    else if( user.userType === "Company" ){
                        routedisplay = "company";
                        var company_post = {
                            name: "",
                            user_id: user_id
                        };
                        //Insert company
                    }

                    showToastSuccess("Account Created Succcessfully");
                    var loginObject = {
                        email: user.email,
                        password: user.password,
                        errors: []
                    };
                    User.login(loginObject).success(function( data ){
                        if( data.success ){
                            var user = data.user;
                            $window.location.href = "/#/application/" + routedisplay;
                            $uibModalInstance.close();
                            User.setCredentials( user.id, user.email, user.userType );
                        }
                        else{
                            $scope.loginForm.errors.push( "Invalid user credentials" );
                        }
                    }).error( function(error){
                        $scope.loginForm.errors.push( "Invalid user credentials" );
                    });
                    $uibModalInstance.dismiss('create');
                }, function( response ){
                    // create user error callback
                    $scope.errors.push( response.data.error );
                });
            }
        };
        $scope.cancel = function cancel() {
            $uibModalInstance.dismiss('cancel');
        };
    }
    })();
