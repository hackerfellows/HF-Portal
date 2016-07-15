/*  File name:      profileSingleController.js
    Author:         Jessica Wu, Michael Baldwin
    Description:    Checks location to determine whether or not to show fellows
                    or companies.
                    Loads up a single profile of a fellow or a company.
                    Allows user (company or fellow) to edit their own profile.
                    Error checks to make sure the user's inputs are valid.
*/
(function() {
    'use strict';

    angular
        .module('app.profileSingle.controllers')
        .controller('ProfileSingleController', ProfileSingleController);

    ProfileSingleController.$inject = ['$scope', '$location', 'HFHelpers',
                                       'Entities', 'User'];
    /**
     * @namespace ProfileController
     */
    function ProfileSingleController($scope, $location, HFHelpers, Entities, User) {
        $scope.helpers = HFHelpers;
        //shared stuff
        var urlEntity = $location.path().split('/')[1];
        var entityId = $location.path().split('/')[2];
        //Check path to see if it's 'fellows' or 'companies'
        if (urlEntity === "fellows") {
            $scope.whichEntity = "fellow";
            $scope.whichEntityPlural = "fellows";
            
        } else if (urlEntity === "companies") {
            $scope.whichEntity = "company";
            $scope.whichEntityPlural = "companies";

        } else {
            console.log("error");
        }

        //Make the API call to fetch the data for the chosen entity
        Entities.getById($scope.whichEntityPlural, entityId).success(function(result) {
            $scope.entityObject = result;
            checkLogin();
        });

        //Checks to see if the logged in user is viewing their own
        //entity page
        //only allow the edit button to be viewable if the logged in user
        function checkLogin(){
          var currentUserId = User.getCurrentUser().id;
            if(entityId === 'currentUserId'){
                console.log("correct user logged in");
                $scope.showEditButton = true;
            } else {
                console.log("incorrect user logged in");
                //TODO: CHANGE MEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE TO FALSE PLEEEEEEEEEEEEEASE
                $scope.showEditButton = true;
            }
        }

        //Clicked from a profile view, in wrapper
        $scope.edit = function() {
              $scope.editMode = true;
        }

        //Clicked from edit profile view, in single edit
        $scope.cancelEdit = function(){
            $scope.editMode = false;
        }

        $scope.update = function(entityObject){
            console.log("call API for fellow"); 

            Entities.update(entityObject, $scope.whichEntityPlural).then(function(result) {

                if (result["success"] === false){
                    console.log("NOOOOOOO Something broke in the put to" + $scope.whichEntityPlural + " :(");
                    //NOOOOOO :(
                } else {
                    console.log(":D", result);
                    $scope.entityObject = result["data"];
                    $scope.editMode = false;
                } 
            });
        }

        // $scope.updateCompany = function(){
        //     console.log("entering edit mode for company");
        //     //all the fields should be editable
        //     $scope.editMode = true;
        // }

        //if fellow call fellow helper function



        //if company ""


      // if( User.isUserLoggedIn() ) {

      //     var currentUser = User.getCurrentUser();

      //     // redirect the user based on their type
      // }
    }


})();