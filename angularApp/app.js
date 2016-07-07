/**
 * app.routes
 * @desc    contains the routes for the app
 */
// Note from JW: We're only using app.profile, so I don't know if we need tags, 
// votes, alert, home, and config. We should delete what we don't need
var app = angular.module('app', ['ngRoute', 'ngFileUpload', 'ngSanitize', 'ui.bootstrap', 'ui.select',
        'app.config', 'app.home', 'app.profile', 'app.tags', 'app.votes', 'app.alert' ])
.run(run);

/**
 *   * @name config
 *     * @desc Define valid application routes
 *       */
app.config(function($routeProvider, $locationProvider){

    $routeProvider
        .when('/', {
            controller  : 'HomeController',
            templateUrl : 'index.html'
        })
    //Profile team changed here VVV
    .when('/fellows', {
        controller: 'FellowsController',
        templateUrl: 'components/profileGrid/profileGrid.html',
        resolve: { loggedIn: checkLoggedin }
    })
    .when('/fellows/:fellow_id/:fellow_name', {
        controller: 'FellowController',
        templateUrl: 'components/profileSingle/profileSingle.html',
        resolve: { loggedIn: checkLoggedin }
    })
    .when('/companies', {
        controller: 'CompaniesController',
        templateUrl: 'components/profileGrid/profileGrid.html',
        resolve: { loggedIn: checkLoggedin }
    })
    .when('/companies/:company_id/:company_name', {
        controller: 'CompanyController',
        templateUrl: 'components/profileSingle/profileSingle.html',
        resolve: { loggedIn: checkLoggedin }
    })
    //Profile team changes end here ^^^
    .when('/tags', {
        controller: 'TagsController',
        templateUrl: 'source/app/tags/tags.html',
        resolve: { loggedIn: checkLoggedin }
    })
    .when('/profile', {
        controller: 'ProfileController',
        templateUrl: 'source/app/profile/profile.html',
        resolve: { loggedIn: checkLoggedin }
    })
    .when('/profile/admin', {
        controller: 'AdminProfileController',
        templateUrl: 'source/app/profile/partials/admin-profile.html',
        resolve: { loggedIn: checkLoggedin }
    })
    .when('/profile/fellow', {
        controller: 'FellowsProfileController',
        templateUrl: 'source/app/profile/partials/fellow-profile.html',
        resolve: { loggedIn: checkLoggedin }
    })
    .when('/profile/company', {
        controller: 'CompanyProfileController',
        templateUrl: 'source/app/profile/partials/company-profile.html',
        resolve: { loggedIn: checkLoggedin }
    })
    .when( '/votes', {
        controller: 'VotesController',
        templateUrl: 'source/app/votes/partials/votes.html',
        resolve: { loggedIn: checkLoggedin }
    })
    .when( '/votes/fellow', {
        controller: 'FellowVotesController',
        templateUrl: 'source/app/votes/partials/fellow-votes.html',
        resolve: { loggedIn: checkLoggedin }
    })
    .when( '/votes/company', {
        controller: 'CompanyVotesController',
        templateUrl: 'source/app/votes/partials/company-votes.html',
        resolve: { loggedIn: checkLoggedin }
    })
    .otherwise({ redirectTo: '/' });

});

app.controller('RoutingController', RoutingController)
.controller('LoginModalInstanceController', LoginModalInstanceController);

RoutingController.$inject = ['$scope', '$modal', '$window', 'User', '$location', '$anchorScroll'];
LoginModalInstanceController.$inject = ['$scope', '$modalInstance', 'User'];

function RoutingController($scope, $modal, $window, User, $location, $anchorScroll) {
    $scope.isUserLoggedIn = false;
    updateLoginStatus();
    $scope.scrollTo = function(id){
        $location.hash(id);
        $anchorScroll();
    };

    function updateLoginStatus(){
        $scope.isUserLoggedIn = User.isUserLoggedIn();
        $scope.isUserAdmin = User.isUserAdmin();
        $scope.isUserFellow = User.isUserFellow();
        $scope.isUserCompany = User.isUserCompany();
    }

    $scope.openModal = function() {
        var modalInstance = $modal.open({
            templateUrl: 'source/app/profile/partials/login-page.html',
            controller: 'LoginModalInstanceController',
            size: ''
        });

        modalInstance.result.then(function(){
            updateLoginStatus();
        });
    };

    $scope.$on('loginStatusChanged', updateLoginStatus);

    $scope.logoutUser = function(){
        User.ClearCredentials();
        $scope.isUserLoggedIn = false;
        $scope.isUserAdmin = false;
        $scope.isUserFellow = false;
        $scope.isUserCompany = false;
        $window.location.reload();
    };
}

function LoginModalInstanceController ($scope, $modalInstance, User) {
    // save this through a refresh
    $scope.loginForm = {
        email: "",
        password: "",
        errors: []
    };

    $scope.login = function(loginForm) {
        $scope.loginForm.errors = [];
        User.login(loginForm).success(function( data ){
            if( data.success ){
                var user = data.user;
                $modalInstance.close();
                User.SetCredentials( user.id, user.email, user.userType );
            }
            else{
                $scope.loginForm.errors.push( "Invalid user credentials" );
            }
        }).error( function(error){
            $scope.loginForm.errors.push( "Invalid user credentials" );
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}


run.$inject = ['$http', 'User', 'CONFIG'];
function run($http, User, CONFIG ){}

/**
 * Helper Functions
 **/

var HFHelpers = HFHelpers || {};

HFHelpers.helpers = {
    slugify: function(str) {
        return str.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    },

    paragraphize: function( str ) {
        if( typeof str !== 'string' ) return '';
        var parts = str.split( "\n" );
        return ( parts.length > 0 ? '<p>' + parts.join('</p><p>') + '</p>' : '' );
    }
};

app.filter("sanitize", ['$sce', function($sce) {
    return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
    };
}]);

app.filter('propsFilter', function() {
    return function(items, props) {
        var out = [];
        if (angular.isArray(items)) {
            items.forEach(function(item) {
                var itemMatches = false;
                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }
                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }
        return out;
    };
});
