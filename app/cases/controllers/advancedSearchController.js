/**
 * Created by jtrantin on 16.11.15.
 */
angular.module("RedhatAccess.cases").controller("AdvancedSearchController",[
    "$scope",
    "AdvancedCaseSearchService",
    'RHAUtils',
    'securityService',
    'CaseService',
    'AUTH_EVENTS',
    '$state',
    'CASE_EVENTS',
    function($scope, AdvancedCaseSearchService, RHAUtils, securityService, CaseService, AUTH_EVENTS, $state, CASE_EVENTS) {
        $scope.solrQuery = null;
        $scope.queryParsed = false;
        $scope.AdvancedCaseSearchService = AdvancedCaseSearchService;
        $scope.RHAUtils = RHAUtils;
        $scope.securityService = securityService;
        $scope.CaseService = CaseService;

        $scope.doSearch = function () {
            if ($scope.solrQuery !== null) {
                $scope.$broadcast(CASE_EVENTS.advancedSearchSubmitted);
                AdvancedCaseSearchService.performSearch($scope.solrQuery, CaseService.filterSelect);
            }
        };

        $scope.bottomScrolled = function () {
            if (AdvancedCaseSearchService.query != null && !AdvancedCaseSearchService.searching) {
                AdvancedCaseSearchService.performSearch(AdvancedCaseSearchService.query, CaseService.filterSelect);
            }
        };

        $scope.$watch('CaseService.filterSelect', function () {
            AdvancedCaseSearchService.performSearch(AdvancedCaseSearchService.query, CaseService.filterSelect);
        });
    }
]);