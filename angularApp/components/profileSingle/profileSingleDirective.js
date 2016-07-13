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
        .directive('profileSingleFellow', profileSingleFellow);


    //We're splitting up the fellow and company profiles because they're different enough
    function profileSingleFellow() {
        console.log("profileSingleFellow");
        return {
            restrict: 'E',
            //scope: true,
            templateUrl: '/components/profileSingle/profileSingleFellow.html'
        };
    }

    function profileSingleCompany() {
        console.log("profileSingleCompany");
        return {
            restrict: 'E',
            //scope: true,
            templateUrl: '/components/profileSingle/profileSingleCompany.html'
        };
    }

})();