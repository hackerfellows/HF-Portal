/**
 * Accounts
 * @namespace app.accounts.services
 */
(function () {
    'use strict';

    angular
        .module('app.accounts.services')
        .service('Accounts', Accounts);

    Accounts.$inject = ['$http', '$uibModal', 'User'];
    /**
     * @namespace Accounts
     * @returns {Service}
     */
    function Accounts($http, $uibModal, User) {
        var loginModal = null;
        var registerModal = null;

        var isUserLoggedIn;
        var isUserAdmin;
        var isUserFellow;
        var isUserCompany;

        return {
            startLogin: startLogin,
            startRegistration: startRegistration,
            updateNavbar: updateNavbar
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

            loginModal.result.then(function(){

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

        function updateNavbar() {
            isUserLoggedIn = User.isUserLoggedIn();
            isUserAdmin = User.isUserAdmin();
            isUserFellow = User.isUserFellow();
            isUserCompany = User.isUserCompany();
        }

    }
})();
