/**
* HomeController
* @namespace app.home.controllers
*/
(function () {
  'use strict';


  angular
    .module('app.home.controllers')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope'];

  /**
  * @namespace HomeController
  */
  function HomeController($scope) {

//    var vm = this;
  console.log("in the home controller");

    //Fellows.all().success(function(fellows){
    //
    //  $scope.fellows = fellows;
    //});

    // activate();

    // function activate() {
    //   //console.log('activated home controller!');
    //   //Home.all();
    // }
  }
})();
