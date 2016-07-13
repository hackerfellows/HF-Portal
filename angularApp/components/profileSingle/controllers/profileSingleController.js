/*  File name:      profileSingleController.js
    Author:         Jessica Wu, Michael Baldwin
    Description:    Checks location to determine whether or not to show fellows
                    or companies.
                    Loads up a single profile of a fellow or a company.
                    Allows user (company or fellow) to edit their own profile.
                    Error checks to make sure the user's inputs are valid.
*/


(function () {
  'use strict';

  angular
  .module('app.profileSingle.controllers')
  .controller('ProfileSingleController', ProfileSingleController);

  ProfileSingleController.$inject = ['$scope', '$location', 'HFHelpers', 'Entities'];
  /**
  * @namespace ProfileController
  */
  function ProfileSingleController($scope, $location, HFHelpers, Entities ) {
    console.log("single profile view");
      //shared stuff
      var entityId = $location.path().split('/')[2];
      //Check path to see if it's 'fellows' or 'companies'
      if($location.path().split('/')[1] === "fellows"){
        console.log("fellow profile");
        $scope.whichEntity = "fellow";
        $scope.whichEntityPlural = "fellows";
      } else if ($location.path().split('/')[1] === "companies"){
        console.log("company profile");
        $scope.whichEntity = "company";
        $scope.whichEntityPlural = "companies";
      } else {
        console.log("error");
      }

      
      Entities.getById($scope.whichEntityPlural, entityId).success(function (result) {

            $scope.entityObject = result;
           // console.log("List:", result);
        });

        $scope.helpers = HFHelpers;

      //if fellow call fellow helper function



      //if company ""








   /*   var vm = this;

      if( User.isUserLoggedIn() ) {

          var currentUser = User.getCurrentUser();

          // redirect the user based on their type
          if (currentUser.userType === 'Admin') {
              //console.log("Like a boss");
              $location.path("/profile/admin");
          }
          else if (currentUser.userType === 'Fellow') {
              //console.log("Like a fella");
              $location.path("/profile/fellow");
          }
          else if (currentUser.userType === 'Company') {
              //console.log("Like a company");
              $location.path("/profile/company");
          }
      }
      else{

           $location.path("/");
      }
*/
  }


})();
