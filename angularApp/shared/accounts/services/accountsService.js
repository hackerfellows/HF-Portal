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
        };

        function startLogin() {
            if (loginModal !== null) {
                loginModal.dismiss();
            }
            loginModal = $uibModal.open({
                backdrop: false,
                templateUrl: '/shared/accounts/partials/login.html',
                controller: 'LoginController'
            });

            return loginModal.result;
        }

        function startRegistration() {
            if (registerModal !== null) {
                registerModal.dismiss();
            }
            registerModal = $uibModal.open({
                backdrop: false,
                templateUrl: '/shared/accounts/partials/register.html',
                controller: 'RegisterController'
            });

            return registerModal.result;
        }
    }
})();
