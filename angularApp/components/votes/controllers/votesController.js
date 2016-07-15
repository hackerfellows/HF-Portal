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
        User.getVotes().then(function(votes){
            console.log("Votes:::::::");
            console.log("Here are all the votes maaaaaaan:");
            console.log(votes.data);
            $scope.votes = votes.data;

        }, function(){
            console.log("error in votes");
        });//End of User.getVotes

        $scope.removeVote  = function(vote){
            console.log("remove this vote: " + vote);
        };

    }
})();
