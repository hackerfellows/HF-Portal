/**
 * accounts module
 */

(function () {
    'use strict';

    angular
        .module('app.accounts', [
                'app.accounts.controllers',
                'app.accounts.services'
        ]);

    //declare the controllers module
    angular
        .module('app.accounts.controllers', []);

    //declare the services module
    angular
        .module('app.accounts.services', []);
    
    console.log("tryin to make an import :/");
    angular
        .module('app.navbar', [
                'app.navbar.controllers'
        ]);

    angular
        .module('app.navbar.controllers', []);
})();
