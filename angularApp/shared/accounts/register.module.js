/**
 * accounts module
 */

(function () {
    'use strict';

    angular
        .module('app.shared.accounts', [
                'app.shared.accounts.controllers',
                'app.shared.accounts.services'
        ]);

    //declare the controllers module
    angular
        .module('app.shared.accounts.controllers', []);

    //declare the directives module
    angular
        .module('app.shared.accounts.directives', []);
})();
