/**
 * ProfileGridController
 * @namespace app.profileGrid.controllers
 */
(function () {
    'use strict';

    angular
        .module('app.profileGrid.controllers')
        .controller('ProfileGridController', ProfileGridController);

    ProfileGridController.$inject = ['$scope'];

    /**
     * @namespace CompaniesController
     */
    function ProfileGridController($scope) {
        console.log("HEYYY CONTROLLER");
        $scope.entity = "fellows/companies";
/*
        Companies.all().success(function (companies) {

            $scope.companies = companies;
        });

        $scope.helpers = HFHelpers.helpers;

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
