(function(){

    angular
        .module('app.navbar.controllers')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', 'Accounts', 'User'];

    function NavbarController($scope, Accounts, User) {
        $scope.openLoginModal = function() {
            Accounts.startLogin();
        };
    }
})();
