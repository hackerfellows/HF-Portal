/**
 * app.routes
 * @desc    contains the routes for the app
 */

 var app = angular.module('app', ['ngRoute', 'ngFileUpload', 'ngSanitize', 'ui.bootstrap', 'ui.select',
    'app.config', 'app.home', 'app.profile'])
    .run(run);

/**
 *   * @name config
 *     * @desc Define valid application routes
 *       */
 app.config(function($routeProvider, $locationProvider){

    $routeProvider
    //Not Sure what this should be
    .when('/', {
        controller  : 'HomeController',
        templateUrl : 'source/app/home/home.html'
    })
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
    .otherwise({ redirectTo: '/' });

});

