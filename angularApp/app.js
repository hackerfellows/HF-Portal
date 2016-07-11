/**
 * app.routes
 * @desc    contains the routes for the app
 */
// Note from JW: We're only using app.profile, so I don't know if we need tags, 
// // votes, alert, home, and config. We should delete what we don't need
//  var app = angular.module('app', ['ngRoute', 'ui.bootstrap', 'ui.select',
//     'app.config', 'app.home', 'app.profile', 'app.profileGrid', 'app.tags', 'app.votes', 'app.alert' ])
//     .run(run);

//NOTE: Make sure these modules (app.moduleName) are defined in 
//      components/componentModules.js otherwise the page will not run
var app = angular.module('app', ['ngRoute', 'app.home', 'app.profile', 'ui.bootstrap', 
    'app.profileGrid', 'app.navbar', 'app.accounts']);

/**
 *   * @name config
 *     * @desc Define valid application routes
 *       */
app.config(function($routeProvider, $locationProvider){
    $routeProvider
    .when('/', {
        controller  : 'HomeController',
        templateUrl : 'components/home/home.html'
    })
    .when('/fellows', {
        controller: 'ProfileGridController',
        templateUrl: 'components/profileGrid/profileGrid.html',
    })
    .when('/fellows/:fellow_id/:fellow_name', {
        controller: 'ProfileController',
        templateUrl: 'components/profileSingle/profileSingle.html',
    })
    .when('/companies', {
        controller: 'ProfileGridController',
        templateUrl: 'components/profileGrid/profileGrid.html',
    })
    .when('/companies/:company_id/:company_name', {
        controller: 'ProfileController',
        templateUrl: 'components/profileSingle/profileSingle.html',
    })
    //Profile team TODO: add a route for /entities/:entity_id/:entity_name/edit
    //                   that runs if the user is logged in and editing    
    .otherwise({ redirectTo: '/' });
});
