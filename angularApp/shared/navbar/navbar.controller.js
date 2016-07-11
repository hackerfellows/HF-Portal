(function(){

    angular
        .module('app.navbar.controllers')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', 'Accounts'];

    function NavbarController($scope, Accounts) {
        console.log("enter NavbarController");
        console.log("NavbarController Ran");
        $scope.openLoginModal = function() {
            console.log("Open login");
            Accounts.startLogin();
        };

    }

})();
