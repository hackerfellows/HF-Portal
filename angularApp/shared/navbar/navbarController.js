(function(){

    angular
        .module('app.navbar.controllers')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', 'Accounts', 'User'];

    function NavbarController($scope, Accounts, User) {

        updateLoginStatus();

        $scope.openLoginModal = function() {
            Accounts.startLogin().then(function() {
                updateLoginStatus();
                console.log(User.getCurrentUser());
            });
        };

        function updateLoginStatus() {
            $scope.isUserLoggedIn = User.isUserLoggedIn();
            $scope.isUserAdmin = User.isUserAdmin();
            $scope.isUserFellow = User.isUserFellow();
            $scope.isUserCompany = User.isUserCompany();

            console.log($scope.isUserLoggedIn);
        }

        $scope.logoutUser = function() {
            User.clearCredentials().then(function () {
                showToastInfo("You have been logged out");
                updateLoginStatus();
            });
        };
    }
})();
