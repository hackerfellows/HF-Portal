/*  File name:      profileGridService.js
    Author:         Jessica Wu, Michael Baldwin
    Description:    wraps all API calls in a class of helper functions
    Function:       Returns an object containing the results of all API calls

    argument "type" in all function below is a string that is either "fellows" or "companies"
*/

(function () {
    'use strict';

    angular
    .module('app.api.services')
    .service('Entities', Entities);

    Entities.$inject = ['$http', 'User'];


    /**
     * @namespace Entities
     * @returns {Service}
     */
    function Entities($http, User) {
        return {

            getAll: getAll,
            getById: getById,
            create: create,
            update: update,
            destroy: destroy,
            getApplication: getApplication,
            updateApplication: updateApplication
        };

        /**
         * @name all
         * @desc get all the fellows/companies along with their user account 
                 info (email)
         */
        function getAll(type) {
            return $http.get('/api/v2/' + type);
        }

        /**
         * @name get
         * @desc get one entity (used in old code to view a profile)
                 get one fellow/company with tags
         */
        function getById(type, id) {
            return $http.get('/api/v2/' + type + '/' + id);
        }

        function getApplication(type) {
            return $http.get('/api/v2/' + type + '/' + User.getCurrentUser().id);
        }

        function updateApplication(user, type) {
            return $http.put('/api/v2/' + type + '/' + User.getCurrentUser().id, user);
        }

        /**
         * @name create
         * @desc creeate a new fellow record
         */
        function create(user, type) {
            return $http.post('/api/v2/' + type + '/', user);
        }

        /**
         * @name update
         * @desc updates a fellow record
         */
        function update(user, type) {
            return $http.put('/api/v2/' + type + '/' + user.id, user);
        }

        /**
         * @name destroy
         * @desc destroy a fellow record
         */
         function destroy(id, type) {
            return $http.delete('/api/v2/' + type + '/' + id);
        }
    }
})();
