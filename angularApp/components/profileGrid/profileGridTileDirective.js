/*  File name:      profileGridTileDirective.js
    Author:         Jessica Wu, Michael Baldwin
    Description:    Declares the profile grid tile directive to be used in 
                    profileGrid.html
*/

(function() {
    'use strict';

    angular
        .module('app.profileGrid.directives')
        .directive('profileGridTile', profileGridTile);


    function profileGridTile() {
        console.log("profileGridTile");
        return {
            restrict: 'E',
            //scope: true,
            templateUrl: '/components/profileGrid/profileGridTile.html'
        };
    }

})();