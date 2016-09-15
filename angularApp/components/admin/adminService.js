(function () {
    'use strict';

    angular
    .module('app.admin.services')
    .service('Placeholder', Placeholder);

    Placeholder.$inject = ['$http'];




     function Placeholder($http) {
       console.log("in admin service");

       return 0;

     }
})();
