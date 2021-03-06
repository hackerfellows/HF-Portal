/**
 * LoginController
 * @namespace app.accounts.controllers
 */
(function () {
    'use strict';

    angular
        .module('app.accounts.controllers')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$window', '$scope', '$uibModalInstance', 'User', 'Accounts'];
    function LoginController($window, $scope, $uibModalInstance, User, Accounts) {
        // save this through a refresh
        $scope.loginForm = {
            email: "",
            password: "",
            errors: []
        };
        $scope.cancel = function() {
            $uibModalInstance.dismiss();
        };
        $scope.beginRegistration = function() {
            Accounts.startRegistration().then(function(){
                return;
            });
            $uibModalInstance.dismiss();
        };
        $scope.login = function(loginForm) {
            $scope.loginForm.errors = [];
            User.login(loginForm).success(function( data ){
                if( data.success ){
                    var user = data.user;
                    showToastSuccess("Login Succcess");
                    $window.location.href = '/#/dash';
                    $uibModalInstance.close();
                    User.setCredentials( user.id, user.email, user.userType );
                }
                else{
                    $scope.loginForm.errors.push( "Invalid user credentials" );
                }
            }).error( function(error){
                $scope.loginForm.errors.push( "Invalid user credentials" );
            });
        };
    }
})();
