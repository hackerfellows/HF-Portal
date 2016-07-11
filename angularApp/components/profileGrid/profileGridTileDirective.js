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