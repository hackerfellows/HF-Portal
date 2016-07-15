/**
 * Votes
 * @namespace app.adminApplicants.services
 * THIS SERVICE SHOULD BE DELETED
 * USE USER SERVICE INSTEAD
 */


(function () {
    'use strict';

    angular
        .module('app.adminApplicants.services')
        .service('AdminApplicantsService', AdminApplicantsService);

    AdminApplicantsService.$inject = ['$http'];


    /**
     * @namespace Tags
     */
    function AdminApplicantsService($http) {

        var rootUrl = '';

        var temp = [
            {   first_name: "a",
                last_name: "b",
                email: "c"
            },
            {   first_name: "a",
                last_name: "b",
                email: "c"
            },  
            {   first_name: "a",
                last_name: "b",
                email: "c"
            }
        ]

        return {

            all: all,
            get: get,
            update: update,
            create: create,
            destroy: destroy
        };

        /**
         * @name get all tags
         * @desc get all possible tags
         */
        function all(){

                    

           
            return temp;
        }

        /**
         * @name get a tag
         * @desc get a tag by tag_id
         */
        function get( tag_id ){

            return $http.get(rootUrl + '/api/v2/tags/' + tag_id );
        }


        /**
         * @name create
         * @desc create a tag by name
         */
        function create( name ) {


            return $http.post(rootUrl + '/api/v2/tags/', {

                name: name
            });
        }

        /**
         * @name update
         * @desc update a tag
         */
        function update( tag ) {

            return $http.put(rootUrl + '/api/v2/tags/' + tag.id, tag);
        }

        /**
         * @name destroy
         * @desc destroy a vote record
         */
        function destroy(id) {

            return $http.delete(rootUrl + '/api/v2/tags/' + id);
        }
    }


})();

