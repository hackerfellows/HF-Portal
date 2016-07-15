/*
    company.name
    company.website_url
    company.city
    company.industry
    company.contact_name
    company.contact_email
    company.contact_phone
    company.map_url
    company.logo_url
    company.description
    company.age
    company.company_size
    company.value_prop
    company.whyHF
    company.developer_type
    company.developer_type
    company.developer_type
    company.devneeds[0]
    company.devneeds[1]
    company.devneeds[2]
    company.devneeds[3]
    company.devneeds[4]
    company.ideal_dev
 */


(function () {
    'use strict';

    angular
        .module('app.application.controllers')
        .controller('CompanyAppController', CompanyAppController);

    CompanyAppController.$inject = ['$scope'];

    function CompanyAppController($scope) {
        function apply(company) {
            console.log("Apply is a stub function");
            //Make api call for application
        }
        function cancel() {
            console.log("Cancel is a stub function");
        }
    }
})();
