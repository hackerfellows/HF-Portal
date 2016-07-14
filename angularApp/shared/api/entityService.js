/*  File name:      entityService.js
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
            update: update
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

////////////////////////////////////////////////////////////////FIX AFTER
        
        /**
         * @name update
         * @desc updates an entity record
                 whichEntity = 'fellows' or 'companies'
                 entityObject = the object with all the data
        *********MAKE SURE THIS SAVES TO A SEPARATE TABLE AND NOT THE ONE WITH
                 THE ENTITY'S ORIGINAL APPLICATION DATA*********
         */
        function update(whichEntity, entityObject, id) {
            return $http.put('/api/v2/' + whichEntity + '/' + entityObject.id, 
                            entityObject);
        }

        

        // /**
        //I think only admin can create and destroy
        //  * @name create
        //  * @desc creeate a new fellow record
        //  */
        // function create(fellow) {
        //     return $http.post('/api/v1/fellows/', fellow);
        // }

        // /**
        //  * @name destroy
        //  * @desc destroy a fellow record
        //  */
        //  function destroy(id) {
        //     return $http.delete('/api/v2/fellows/' + id);
        // }
    }
})();
