(function() {
    'use strict';

    angular
        .module('app.profile.directives')
        .directive('profileGridTile', profileGridTile);


    function profileGridTile() {
        return {
            restrict: 'AE',
            replace: true,
            scope: true,
            templateUrl: 'profileGridTile.html'
        };
    }

})();