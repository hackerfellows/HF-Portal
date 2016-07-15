(function(){

    angular
        .module('app.navbar.controllers')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', 'Accounts', 'User'];

    function NavbarController($scope, Accounts, User) {

        $scope.isUserLoggedIn = User.isUserLoggedIn;
        $scope.isUserAdmin = User.isUserAdmin;
        $scope.isUserFellow = User.isUserFellow;
        $scope.isUserCompany = User.isUserCompany;

        console.log($scope.isUserLoggedIn);

        $scope.openLoginModal = function() {
            Accounts.startLogin();
        };


        $scope.logoutUser = function() {
            User.clearCredentials();
        };
    }
})();
