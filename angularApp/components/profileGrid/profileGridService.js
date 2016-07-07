/**
 * Fellows
 * @namespace app.fellows.services
 */

/*  File name:      profileGridService.js
    Author:         Jessica Wu
    Description:    wraps all API calls in a class of helper functions  
    Function:       Fellows($http, Upload, CONFIG){ all(); allWithUser(); get(id); 
                    getByUserId(user_id); create(fellow); update(fellow) }*/
 
(function () {
    'use strict';

    angular
    .module('app.fellows.services')
    .service('Fellows', Fellows);

    Fellows.$inject = ['$http', 'Upload', 'CONFIG'];


    /**
     * @namespace Fellows
     * @returns {Service}
     */
    function Fellows($http, Upload, CONFIG) {

        var rootUrl = CONFIG.SERVICE_URL;

        return {
            all: all,
            allWithUser: allWithUser,
            get: get,
            getByUserId: getByUserId,
            create: create,
            update: update,
            destroy: destroy
        };

        ////////////////////

        /**
         * @name all
         * @desc get all the fellows
         */
        function all() {
            return $http.get(rootUrl + '/api/v1/fellows');
        }

        /**
         * @name all
         * @desc get all the fellows with their user account info
         */
        function allWithUser() {
            return $http.get(rootUrl + '/api/v1/fellows/users');
        }

        /**
         * @name get
         * @desc get one fellow
         */
        function get(id) {
            return $http.get(rootUrl + '/api/v1/fellows/' + id);
        }

        /**
         * @name getByUserId
         * @desc get one fellow by user_id
         */
        function getByUserId(user_id) {
            return $http.get(rootUrl + '/api/v1/fellows/user_id/' + user_id);
        }

        /**
         * @name create
         * @desc creeate a new fellow record
         */
        function create(fellow) {
            return $http.post(rootUrl + '/api/v1/fellows/', fellow);
        }

        /**
         * @name update
         * @desc updates a fellow record
         */
        function update(fellow) {
            return $http.put(rootUrl + '/api/v1/fellows/' + fellow.id, fellow);
        }

        /**
         * @name destroy
         * @desc destroy a fellow record
         */
         function destroy(id) {
            return $http.delete(rootUrl + '/api/v1/fellows/' + id);
        }
    }
})();
