/*  File name:      entityService.js
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
            updateProf: updateProf,
            destroy: destroy,
            getApplication: getApplication,
            updateApplication: updateApplication,
            getApplicants: getApplicants 
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
            return $http.get('/api/v2/' + type + '/profile/' + id);
        }

        function getApplication(type) {
            return $http.get('/api/v2/' + type + '/application/' + User.getCurrentUser().id);
        }

        function updateApplication(user, type) {
            return $http.put('/api/v2/' + type + '/application/' + User.getCurrentUser().id, user);
        }

        /**
         * @name updateProf
         * @desc updates an entity record
                 whichEntity = 'fellows' or 'companies'
                 entityObject = the object with all the data
        *********MAKE SURE THIS SAVES TO A SEPARATE TABLE AND NOT THE ONE WITH
                 THE ENTITY'S ORIGINAL APPLICATION DATA*********
         */
        function updateProf(user, type) {
            return $http.put('/api/v2/' + type + '/profile/' + user.id, user);
        }


        /**
         * @name destroy
         * @desc destroy a fellow record
         */
        function destroy(id, type) {
            return $http.delete('/api/v2/' + type + '/' + id);
        }

        /**
         * @name getApplicants 
         * @desc gets unaccepted applicants
         */
        function getApplicants(type) {
            return $http.get('/api/v2/' + type + '/unaccepted');
        }

        function getApplication(user, type){
            return $http.get('/api/v2/' + type + '/profile/' + user.id );
        }
    }
})();
