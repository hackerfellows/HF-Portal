/**
 * TagsController
 * @namespace app.tags.controllers
 */
(function () {
    'use strict';

    angular
        .module( 'app.tags.controllers' )
        .controller( 'TagsController', TagsController );

    TagsController.$inject = [ '$scope', 'Tags','$location', '$uibModal' ];

    /**
     * @namespace TagsController
     */
    function TagsController( $scope, Tags, $location, $uibModal ) {

        var vm = this;
        console.log("In tags controller");
        $scope.newTag = '';
        Tags.all().success( function( tags ){
          $scope.tags = tags;
         });

        $scope.addTag = function( newTag ){

            Tags.create( newTag ).then( function( response ){

                var newTag = response.data;

                $scope.newTag = '';
                $scope.tags.unshift( newTag );
            });
        };

        $scope.editTag = function( tag ){

            // show modal with tag

            var modalInstance = $uibModal.open({
                backdrop: false,
                templateUrl: 'components/admin/tags/partials/edit-tag-form.html',
                controller: 'EditTagsModalInstanceController',
                size: 'md',
                resolve: {
                    tag: function() {

                        return tag;
                    }
                }

            });


            // show success/failure
            return false;
        };

        $scope.removeTag = function( tag ){

            var c = confirm( "Are you sure you want to delete " + tag.name + "?");

            if( c ){

                Tags.destroy( tag.id).then( function(){

                    // now update available tags
                    Tags.all().success( function( tags ){

                        $scope.tags = tags;
                    });
                });
            }
        };

    }



    angular
        .module('app.tags.controllers')
        .controller('EditTagsModalInstanceController', EditTagsModalInstanceController);

    console.log("before modal inject call");
    EditTagsModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'tag', 'Tags', '$uibModal' ];
    console.log("after modal inject call");
    function EditTagsModalInstanceController ($scope, $uibModalInstance, tag, Tags) {

        $scope.tag = tag;

        $scope.ok = function ok() {

            Tags.update( $scope.tag ).then(function(newTag){

                $uibModalInstance.close( newTag );

            },
            function(){

                // error callback
                $scope.errors = [ "There was an error updating the tag" ];
            });

        };

        $scope.cancel = function cancel() {

            $uibModalInstance.dismiss('cancel');
        };
    }

})();
