/*  File name:      profileGridSingleDirective.js
    Author:         Jessica Wu, Michael Baldwin
    Description:    Declares the fellow and company directives.
                    Both the fellow and company directives will show fields
                    specific to what entity they are.
*/

(function() {
    'use strict';

    angular
        .module('app.profileSingle.directives')
        .directive('profileSingleFellow', profileSingleFellow)
        .directive('profileSingleCompany', profileSingleCompany)
        .directive('profileSingleFellowEdit', profileSingleFellowEdit)
        .directive('profileSingleCompanyEdit', profileSingleCompanyEdit);


    //We're splitting up the fellow and company profiles because they're different enough
    function profileSingleFellow() {
        return {
            restrict: 'E',
            //scope: true,
            templateUrl: '/components/profileSingle/profileSingleFellow.html'
        };
    }

    function profileSingleCompany() {
        return {
            restrict: 'E',
            //scope: true,
            templateUrl: '/components/profileSingle/profileSingleCompany.html'
        };
    }

    //Edit views are different than normal views
    function profileSingleFellowEdit() {
        return {
            restrict: 'E',
            //scope: true,
            templateUrl: '/components/profileSingle/profileSingleFellowEdit.html'
        };
    }

    function profileSingleCompanyEdit() {
        return {
            restrict: 'E',
            //scope: true,
            templateUrl: '/components/profileSingle/profileSingleCompanyEdit.html'
        };
    }

})();