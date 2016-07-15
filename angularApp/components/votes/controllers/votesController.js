/**
* HomeController
* @namespace app.votes.controllers
*/
(function () {
    'use strict';

    angular
    .module('app.votes.controllers')
    .controller('VotesController', VotesController);

    VotesController.$inject = ['$scope','User'];

    /**
    * @namespace VotesController
    */


    function VotesController($scope,User) {
        $scope.votes = [];
        console.log("WHYYYYYYYY")
        User.getVotes().success(function(votes){
            console.log("Votes:::::::")
            console.log(votes);
        });//End of User.getVotes



        $scope.removeVote  = function(vote){
            console.log("remove this vote: " + vote);
        }

    }
})();
