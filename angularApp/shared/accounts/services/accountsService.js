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
                backdrop: false,
                templateUrl: '/shared/accounts/partials/login.html',
                controller: 'LoginController'
            });
        }

        function startRegistration() {
            registerModal = $uibModal.open({
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
