/**
 * Accounts
 * @namespace app.accounts.services
 */
(function () {
    'use strict';

    angular
        .module('app.accounts.services')
        .service('Accounts', Accounts);

    Accounts.$inject = ['$http', '$uibModal'];
    
    console.log("tryin to make an Accounts :/");
    /**
     * @namespace Accounts
     * @returns {Service}
     */
    function Accounts($http, $uibModal) {
        var loginModal = null;
        var registerModal = null;

        return {
            startLogin: startLogin,
            startRegistration: startRegistration,
            endLogin: endLogin,
            endRegistration: endRegistration
        };

        function startLogin() {
            loginModal = $uibModal.open({
                replace: true,
                templateUrl: '/shared/accounts/partials/login.html',
                controller: 'LoginController'
            });
            loginModal.result.then(function(){
                updateLoginStatus();
                self.endLogin();
            });
        }

        function startRegistration() {
            registerModal = $uibModal.open({
                replace: true,
                templateUrl: '/shared/accounts/partials/register.html',
                controller: 'RegisterController'
            });
        }
        function endLogin() {
            if (loginModal !== null){
                loginModal.close();
            }
            loginModal = null;
        }
        function endRegistration() {
            if (registerModal !== null){
                registerModal.close();
            }
            registerModal = null;
        }

    }
})();
