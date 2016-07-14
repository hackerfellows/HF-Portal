/**
 * Profile
 * @namespace app.accounts.services
 */
(function () {
    'use strict';

    angular
        .module('app.api.services')
        .factory('User', User);

    User.$inject = ['$rootScope', '$http', '$q'];

    /**
     * @namespace User
     * @returns {Service}
     */
    function User($rootScope, $http, $q) {
        var provides = {
            getVotes: getVotes,
            create: create,
            login: login,
            update: update,
            destroy: destroy,
            setCredentials: setCredentials,
            clearCredentials: clearCredentials,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            getType: getType,
            isUserLoggedIn: isUserLoggedIn,
            isUserAdmin: isUserAdmin,
            isUserFellow: isUserFellow,
            isUserAccepted: isUserAccepted,
            updateLoginStatus: updateLoginStatus,
            isUserCompany: isUserCompany
        };

        var currentUser = {};

        function getCurrentUser() {
            return currentUser;
        }

        function setCurrentUser(user) {
            currentUser = user;
        }

        /**
         * @name getVotes
         * @desc calls the api and returns a list of votes for that user
         */
        function getVotes( user_id ){
            return $http.get('/api/v2/users/' + user_id + '/votes' );
        }

        /**
         * @name login
         * @desc login a new user record
         */
        function login(user) {
            return $http.post('/api/v2/users/login', user);
        }


        /**
         * @name updateLoginStatus
         * @desc polls the api for the current login status of the user
         *           and sets the local user object appropriatly 
         */
        function updateLoginStatus () {
            console.log("Calling confimr long");
            $http.get( '/api/v2/users/confirm-login' )
                .then(function (response) {
                    console.log("User is logged in");
                    setCredentials( response.user.id, response.user.email, response.user.userType );
                },function(err){
                    console.log("User is NOT logged in");
                    console.log(err);
                    currentUser = {};
                });
        }

        /**
         * @name create
         * @desc create a new user record
         */
        function create(user) {
            return $http.post('/api/v2/users/create', user);
        }

        /**
         * @name update
         * @desc updatea a user record
         */
        function update(user) {
            return $http.put('/api/v2/users/' + user.id, user);
        }

        /**
         * @name destroy
         * @desc destroy a user record
         */
        function destroy(id) {
            return $http.delete('/api/v2/users/' + id);
        }

        function isUserLoggedIn(){

            if( Object.keys(currentUser).length > 0 ){
                return true;
            }
            else return false;
        }

        function getType() {
            return currentUser.userType;
        }

        function isUserAdmin(){
            if( currentUser.userType === 'Admin' ){
                return true;
            }
            else return false;
        }

        function isUserAccepted(){
            console.log("isUserAccepted is just a stub, returning true");
            return true;
        }

        function isUserFellow(){
            if( currentUser.userType === 'Fellow' ){
                return true;
            }
            else return false;
        }

        function isUserCompany(){
            if( currentUser.userType === 'Company' ){
                return true;
            }
            else return false;
        }

        function setCredentials(id, username, userType) {
            currentUser = {
                id: id,
                username: username,
                userType: userType,
            };
        }

        /**
         * @name clearCredentials()
         * @desc calls the api's logout endpoint for the current user and clears the local object
         */
        function clearCredentials() {
            var toReturn = $http.get( '/api/v2/users/logout' );
            
            toReturn.then( function(){
                currentUser = {};
            });

            return toReturn;
        }

		return provides;
    }

})();
