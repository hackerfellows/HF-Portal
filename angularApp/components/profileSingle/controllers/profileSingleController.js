/**
* ProfileController
* @namespace app.profile.controllers
*/
(function () {
  'use strict';

  angular
  .module('app.profileSingle.controllers')
  .controller('ProfileSingleController', ProfileSingleController);

  ProfileSingleController.$inject = ['$scope'];
  /**
  * @namespace ProfileController
  */
  function ProfileSingleController($scope) {
      console.log("single profile view");
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
