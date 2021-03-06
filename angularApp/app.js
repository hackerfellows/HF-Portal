/**
 * app.routes
 * @desc   contains the routes for the app
 */
// Note from JW: We're only using app.profile, so I don't know if we need tags,
// // votes, alert, home, and config. We should delete what we don't need
//  var app = angular.module('app', ['ngRoute', 'ui.bootstrap', 'ui.select',
//     'app.config', 'app.home', 'app.profile', 'app.profileGrid', 'app.tags', 'app.votes', 'app.alert' ])
//     .run(run);

(function () {
    //NOTE: Make sure these modules (app.moduleName) are defined in
    //      components/componentModules.js otherwise the page will not run

    var app = angular.module('app', ['ngRoute', 'ngSanitize', 'app.home', 'ui.bootstrap',
        'app.profileGrid', 'app.profileSingle', 'app.navbar', 'app.accounts', 'app.helpers', 'app.calendar',
        'app.admin', 'app.tags', 'app.adminUsers', 'app.adminApplicants', 'app.application', 'app.api', 'app.dash', 'app.votes']);

    /**
     * @name config
     * @desc Define valid application routes
     **/
    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider
        .when('/', {
            controller  : 'HomeController',
            templateUrl : 'components/home/home.html',
            resolve: { routePermission: Public }
        })
        .when('/fellows', {
            controller: 'ProfileGridController',
            templateUrl: 'components/profileGrid/profileGrid.html',
            resolve: { routePermission: Public }
        })
        .when('/fellows/:fellow_id', {
            controller: 'ProfileSingleController',
            templateUrl: 'components/profileSingle/profileSingleWrapper.html',
            resolve: { routePermission: Public }
        })
        .when('/about', {
            templateUrl : 'assets/html/staticAbout.html',
            resolve: { routePermission: Public }
        })
        .when('/application', {
            templateUrl : 'assets/html/staticApplication.html',
            resolve: { routePermission: Public }
        })
        .when('/contact', {
            templateUrl : 'assets/html/staticContact.html',
            resolve: { routePermission: Public }
        })
        .when('/members', {
            templateUrl : 'assets/html/staticMembers.html',
            resolve: { routePermission: Public }
        })
        .when('/dash', {
            controller  : 'DashController',
            templateUrl : 'components/dash/dash.html',
            resolve: { routePermission: Public }
        })

        .when('/fellows', {
            controller: 'ProfileGridController',
            templateUrl: 'components/profileGrid/profileGrid.html',
            resolve: { routePermission: Public }
        })
        .when('/fellows/:fellow_id', {
            controller: 'ProfileSingleController',
            templateUrl: 'components/profileSingle/profileSingleWrapper.html',
            resolve: { routePermission: Public }
        })
        .when('/companies', {
            controller: 'ProfileGridController',
            templateUrl: 'components/profileGrid/profileGrid.html',
            resolve: { routePermission: Public }
        })
        .when('/companies/:company_id', {
            controller: 'ProfileSingleController',
            templateUrl: 'components/profileSingle/profileSingleWrapper.html',
            resolve: { routePermission: Public }
        })
        .when('/calendar', {
            controller: 'CalendarController',
            templateUrl: 'components/calendar/calendar.html',
            resolve: { routePermission: Public }
        })
        .when('/admin', {
            controller: 'AdminController',
            templateUrl: 'components/admin/admin.html',
            resolve: { routePermission: Public }
        })
        .when('/admin/tags', {
            controller: 'TagsController',
            templateUrl: 'components/admin/tags/tags.html',
            resolve: { routePermission: Public }
        })
        .when('/admin/users', {
            controller: 'AdminUsersController',
            templateUrl: 'components/admin/users/adminUsers.html',
            resolve: { routePermission: Public }
        })
        .when('/admin/applicants', {
            controller: 'AdminApplicantsController',
            templateUrl: 'components/admin/applicants/adminApplicants.html',
            resolve: { routePermission: Public }
        })
        .when('/admin/calendar', {
            controller: 'AdminController',
            templateUrl: 'components/admin/admin.html',
            resolve: { routePermission: Public }
        })

        .when('/application/fellow', {
            controller: 'FellowAppController',
            templateUrl: 'components/application/partials/fellowApplication.html',
            resolve: { routePermission: Public }
        })
        .when('/application/company', {
            controller: 'CompanyAppController',
            templateUrl: 'components/application/partials/companyApplication.html',
            resolve: { routePermission: Public }
        })
        .when('/company/votes', {
            controller: 'VotesController',
            templateUrl: 'components/votes/companyVotes.html',
            resolve: { routePermission: Restricted }
        })
        .when('/fellow/votes', {
            controller: 'VotesController',
            templateUrl: 'components/votes/fellowVotes.html',
            resolve: { routePermission: Restricted }
        })
        //Profile team TODO: add a route for /entities/:entity_id/:entity_name/edit
        //Profile team TODO: add a route for /entities/:entity_id/:entity_name/edit
        //                   that runs if the user is logged in and editing
        .otherwise({ redirectTo: '/' });

    }]);

    /**
     * @name Public
     * @desc Checks if the user is logged in to allow them to continue, otherwise
     *       redirects to the home page
     */
    var Public = function($location, $q, User) {
        var deferred = $q.defer();
        User.updateLoginStatus();
        var type = User.getType();
        deferred.resolve();
        return deferred.promise;
    };

    var Restricted = function($location, $q, User) {
        var deferred = $q.defer();
        User.updateLoginStatus();
        var type = User.getType();
        if (type !== undefined) {
            deferred.resolve();
        } else {
            $location.path("/");
            deferred.reject();
        }
        return deferred.promise;
    };

})();
