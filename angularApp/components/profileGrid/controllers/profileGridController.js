/*  File name:      profileGridController.js
    Author:         Jessica Wu, Michael Baldwin
    Description:    Checks location to determine whether or not to show fellows
                    or companies
*/

(function () {
    'use strict';

    angular
        .module('app.profileGrid.controllers')
        .controller('ProfileGridController', ProfileGridController);

    ProfileGridController.$inject = ['$scope', '$location', 'Entities', 'HFHelpers'];

    /**
     * @namespace CompaniesController
     */
    function ProfileGridController($scope, $location, Entities, HFHelpers) {
        $scope.helpers = HFHelpers;
        var whichEntity = "";

        //Decide if the path is /fellows or /companies
        if($location.path() === "/fellows"){
            $scope.entitySingular = "Fellow";
            $scope.entityPlural = "Fellows";
            $scope.whichEntity = "fellows";
        } else if ($location.path() === "/companies"){
            $scope.entitySingular = "Company";
            $scope.entityPlural = "Companies";
            $scope.whichEntity = "companies";
        } else {
            //Throw an error
        }

//////////////////////////////////////////////////////////////////////////

        Entities.getAll($scope.whichEntity).success(function (result) {
            console.log(result);
            $scope.entityList = result;
        });

        
        /*
        $scope.openModal = function (company) {

            $scope.company = company;

            var modalInstance = $modal.open({

                templateUrl: 'source/app/companies/partials/company_detail_view.html',
                controller: 'CompaniesModalInstanceController',
                size: 'lg',
                resolve: {
                    company: function () {
                        return company;
                    }
                }

            });

        };
*/
    }

    /**
     * Companies Modal Instance Controller
     * @namespace app.fellows.controllers
     */
/*
    angular
        .module('app.companies.controllers')
        .controller('CompaniesModalInstanceController', CompaniesModalInstanceController);

    CompaniesModalInstanceController.$inject = ['$scope', '$modalInstance',
        'company', 'Votes', 'User'];

    function CompaniesModalInstanceController($scope, $modalInstance, company, Votes, User) {

        $scope.company = company;

        $scope.ok = function () {
            $modalInstance.close($scope.company);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };


    }
*/
})();
