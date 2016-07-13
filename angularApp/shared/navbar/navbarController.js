(function(){

    angular
        .module('app.navbar.controllers')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', 'Accounts'];

    function NavbarController($scope, Accounts) {
        $scope.openLoginModal = function() {
            Accounts.startLogin();
        };
    }
})();
