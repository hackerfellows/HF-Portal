/*
 * accounts module
 */

(function () {
    'use strict';

    //Accounts
    angular
        .module('app.accounts', [
                'app.accounts.controllers',
                'app.accounts.services'
        ]);

    angular
        .module('app.accounts.controllers', []);

    angular
        .module('app.accounts.services', ['ui.bootstrap']);

    //End Accounts

    //Navbar
    angular
        .module('app.navbar', [
                'app.navbar.controllers'
        ]);

    angular
        .module('app.navbar.controllers', []);
    //End Navbar

    //Helpers
    angular
        .module('app.helpers', [
                'app.helpers.services'
        ]);
    angular
        .module('app.helpers.services', []);
    //End Helpers

    //API
    angular
        .module('app.api', [
                'app.api.services'
        ]);
    angular
        .module('app.api.services', []);
    //End API

})();
