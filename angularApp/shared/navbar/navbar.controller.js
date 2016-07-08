(function(){

    angular
        .module('app.navbar.controllers')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', 'Account'];

    function NavbarController($scope) {
        console.log("NavbarController Ran");
        $scope.openLoginModal = function() {
            console.log("Open login");
            Account.startLogin();
        };
    }
})();
