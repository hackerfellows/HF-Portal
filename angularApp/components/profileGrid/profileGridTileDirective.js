(function() {
    'use strict';

    angular
        .module('app.profileGrid.directives')
        .directive('profileGridTile', profileGridTile);


    function profileGridTile() {
        console.log("profileGridTile");
        return {
            restrict: 'AE',
            replace: true,
            scope: true,
            templateUrl: 'profileGridTile.html'
        };
    }

})();