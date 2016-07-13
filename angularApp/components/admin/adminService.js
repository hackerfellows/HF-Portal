(function () {
    'use strict';

    angular
    .module('app.admin.services')
    .service('Entities', Entities);

    Entities.$inject = ['$http'];




     function Entities($http) {
       console.log("in admin service"); 
       
       return 0;
       
     }
})();
