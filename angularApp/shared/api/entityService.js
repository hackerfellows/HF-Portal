/*  File name:      profileGridService.js
    Author:         Jessica Wu, Michael Baldwin
    Description:    wraps all API calls in a class of helper functions
    Function:       Returns an object containing the results of all API calls
*/

(function () {
    'use strict';

    angular
    .module('app.api.services')
    .service('Entities', Entities);

    Entities.$inject = ['$http'];


    /**
     * @namespace Entities
     * @returns {Service}
     */
    function Entities($http) {
        return {

            allWithUser: allWithUser,
            getById: getById,
            create: create,
            update: update,
            destroy: destroy
        };

        /**
         * @name all
         * @desc get all the fellows/companies along with their user account 
                 info (email)
         */
        function allWithUser(whichEntity) {
            //TODO: DELETE MEEEEEEEEEEEEEEEEEEE VVVV
            return $http.get('test' + whichEntity + 'Get.json');
            // ^^^^^^^^^^^
            //return $http.get('/api/v2/' + whichEntity);
        }

        /**
         * @name get
         * @desc get one entity (used in old code to view a profile)
                 get one fellow/company with tags
         */
        function getById(whichEntity, id) {
            //TODO: DELETE MEEEEEEEEEEEEEEEEEEE VVVV
            return $http.get('test' + whichEntity + 'Get' + id + '.json');
            // ^^^^^^^^^^^
            //return $http.get('/api/v2/' + whichEntity + '/' + id);
        }

        // *
        //  * @name getByUserId
        //  * @desc get one entity by user_id (used in old code to view profile
        //          (company OR fellow) of currently logged in user)
         
        // function getByUserId(whichEntity, userId) {
        //     return $http.get('/api/v1/' + whichEntity + '/user_id/' + userId);
        // }
////////////////////////////////////////////////////////////////FIX AFTER
        /**
         * @name create
         * @desc creeate a new fellow record
         */
        function create(fellow) {
            return $http.post('/api/v1/fellows/', fellow);
        }

        /**
         * @name update
         * @desc updates a fellow record
         */
        function update(fellow) {
            return $http.put('/api/v1/fellows/' + fellow.id, fellow);
        }

        /**
         * @name destroy
         * @desc destroy a fellow record
         */
         function destroy(id) {
            return $http.delete('/api/v1/fellows/' + id);
        }
    }
})();
