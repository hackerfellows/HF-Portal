/*  File name:      profileGridService.js
    Author:         Jessica Wu, Michael "The cool kid" Baldwin
    Description:    wraps all API calls in a class of helper functions
    Function:       Fellows($http, Upload, SETTINGS){ all(); allWithUser(); get(id);
                    getByUserId(user_id); create(fellow); update(fellow) }*/

(function () {
    'use strict';

    angular
    .module('app.profileGrid.services')
    .service('Entities', Entities);

    Entities.$inject = ['$http'];


    /**
     * @namespace Entities
     * @returns {Service}
     */
    function Entities($http) {
        //TODO: GET RID OF THIS STUPID HARDCODED BS
        var rootUrl = 'testCompaniesGet.json';//SETTINGS.SERVICE_URL;
        //console.log("rootUrl:", rootUrl);

        return {

            allWithUser: allWithUser,
            get: get,
            getByUserId: getByUserId,
            create: create,
            update: update,
            destroy: destroy
        };

        ////////////////////
        //DEPRECATED
        // *
        //  * @name all
        //  * @desc get all the fellows
        //  apiPath should be '/api/v1/fellows'

        // function all(apiPath) {
        //     return $http.get(rootUrl + '/api/v1/fellows');
        // }

        //Same as above but comes with email

        /**
         * @name all
         * @desc get all the fellows with their user account info
         */
        function allWithUser(whichEntity) {
            //console.log("api call:", rootUrl + '/api/v1/' + whichEntity + '/users');
            //return $http.get(rootUrl + '/api/v1/' + whichEntity + '/users');

            //TODO: DELETE MEEEEEEEEEEEEEEEEEEE VVVV
            return $http.get('test' + whichEntity + 'Get.json');
            // ^^^^^^^^^^^
          //  return $http.get(rootUrl);
        }

        /**
         * @name get
         * @desc get one entity (used in old code to view a profile)
         */
        function get(whichEntity, id) {
            return $http.get(rootUrl + '/api/v1/' + whichEntity + '/' + id);
        }

        /**
         * @name getByUserId
         * @desc get one entity by user_id (used in old code to view profile
                 (company OR fellow) of currently logged in user)
         */
        function getByUserId(whichEntity, userId) {
            return $http.get(rootUrl + '/api/v1/' + whichEntity + '/user_id/' + userId);
        }
////////////////////////////////////////////////////////////////FIX AFTER
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
