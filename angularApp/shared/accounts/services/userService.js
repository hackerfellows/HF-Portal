/**
 * Profile
 * @namespace app.accounts.services
 */
(function () {
    'use strict';

    angular
        .module('app.accounts.services')
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
            SetCredentials: SetCredentials,
            ClearCredentials: ClearCredentials,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            isUserLoggedIn: isUserLoggedIn,
            isUserAdmin: isUserAdmin,
            isUserFellow: isUserFellow,
            isUserAccepted: isUserAccepted,
            ensureLoggedIn: ensureLoggedIn,
            checkLoggedIn: checkLoggedIn,
            updateLoginStatus: updateLoginStatus,
            isUserCompany: isUserCompany
        };

        // Will hold info for the currently logged in user
        var currentUser = {};

        function getCurrentUser() {
            return currentUser;
        }

        function setCurrentUser(user) {
            currentUser = user;
        }

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

        // On paths that require login, make sure the login is confirmed before the route is loaded.
        function ensureLoggedIn ($q, $timeout, $http, $location, $rootScope, User){

            var deferred = $q.defer();

            $http.get( '/api/v2/users/confirm-login' )
                .success(function (user) {
                    if (user && user.id) {
                        self.SetCredentials( user.id, user.email, user.userType );
                        deferred.resolve();
                    }
                    else{
                        $location.url('/');
                        deferred.reject();
                    }
                });
            return deferred.promise;
        }

        function checkLoggedIn (){

            var deferred = $q.defer();
            $http.get( '/api/v2/users/confirm-login' )
                .success(function (user) {
                    if (user && user.id) {
                        //self.SetCredentials( user.id, user.email, user.userType );
                        deferred.resolve();
                    }
                    else{
                        currentUser = {};
                        deferred.resolve();
                    }
                });
            return deferred.promise;
        }


        function updateLoginStatus(){
            $scope.isUserLoggedIn = User.isUserLoggedIn();
            $scope.isUserAdmin = User.isUserAdmin();
            $scope.isUserFellow = User.isUserFellow();
            $scope.isUserCompany = User.isUserCompany();
        }

        /**
         * @name all
         * @desc get all the users
         */
        //function all() {
        //
        //    return [];
        //
        //    //return $http.get('/api/v2/companies/');
        //}

        /**
         * @name get
         * @desc get just one user
         */
        //function get(id) {
        //    return $http.get('/api/v2/users/' + parseInt(id) );
        //}

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

        function SetCredentials(id, username, userType) {
            var authdata = Base64.encode(id + ':' + username + ':' + userType);
            currentUser = {
                id: id,
                username: username,
                userType: userType,
                authdata: authdata
            };
            loginStatusChanged();
        }

        function ClearCredentials() {
            $http.get( '/api/v2/users/logout' ).then( function(){
                currentUser = {};
            });
            loginStatusChanged();
        }


        function loginStatusChanged() {

            $rootScope.$broadcast('loginStatusChanged');
        }

		return provides;
    }

    // Base64 encoding service used by AuthenticationService
    var Base64 = {

        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };

})();
