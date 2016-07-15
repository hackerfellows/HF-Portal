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

        $scope.openLoginModal = function() {
            Accounts.startLogin();
        };


        $scope.logoutUser = function() {
            showToastInfo("You have been logged out");
            User.clearCredentials();
        };
    }
})();
