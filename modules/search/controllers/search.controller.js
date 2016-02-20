(function(){
  'use strict';

  angular
    .module('search')
    .controller('SearchController', [
      'searchService', '$scope', '$filter', '$mdSidenav', '$mdBottomSheet', '$log', '$timeout', '$http', '$q',
      SearchController
    ]);

  /**
   * Search Controller
   * @param $http
   * @param $scope
   * @param $filter
   * @param $mdSidenav
   * @param searchService
   * @constructor
   */
  function SearchController(searchService, $scope, $filter, $mdSidenav, $log, $timeout, $http, $q) {
    var self = this;

    self.today         = new Date();
    self.noCache       = true;
    self.searchText    = null;
    self.selectedItem  = {};
    self.searchText2   = null;
    self.selectedItem2 = {};
    self.maxPassengers = [1,2,3];
    self.passengers    = 1;
    self.toggleSidenav = toggleSidenav;
    self.querySearch   = querySearch;
    self.isInvalid     = isInvalid;
    self.isDuplicate   = isDuplicate;
    self.fetchResults  = fetchResults;
    $scope.searchData  = {};

    // Get airports
    searchService
      .getAirports()
      .then( function( data ) {
        self.airports = data.results;
      });

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Hide or Show the 'left' sideNav area
     */
    function toggleSidenav(sideNav) {
      $mdSidenav(sideNav).toggle();
    }

    /**
     * Search for airports
     */
    function querySearch(query) {
      var results = query ? self.airports.filter( airportFilter(query) ) : [];
      return results;
    }

    /**
     * Create filter function for a query string
     */
    function airportFilter(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(airport) {
        return (airport.name.toLowerCase().indexOf(lowercaseQuery) === 0);
      };
    }

    /**
     * Custom validation
     */
    function isInvalid(input, query) {
      var valid = query ? self.airports.filter( airportFilter(query) ) : false;
      return input.$error = valid ? {} : { 'invalid': true };
    }
    function isDuplicate(input, from, to) {
      if (from && to)
        return input.$error = angular.equals(from, to) ? { 'duplicate': true } : {}
    }

    /**
     * Fetch results
     */
    function fetchResults() {

      $scope.searchData.min   = 150
      $scope.searchData.max   = 300;
      $scope.searchData.range = { from: 150, to: 300 };
      $scope.flights = null;

      var params = {};
      var hasErrorMessage = angular.element(document.querySelectorAll('[ng-message]'));

      // Double check errors
      if (angular.equals(hasErrorMessage.length, 0)) {

        toggleSidenav('left');

        $scope.searchData.progress  = true;
        $scope.searchData.tabSwitch = true;

        params['outboundLocation'] = $scope.ctrl.selectedItem.code;
        params['inboundLocation']  = $scope.ctrl.selectedItem2.code;
        params['departureDate']    = $filter('date')($scope.searchData.departureDate, 'yyyy-MM-dd');
        params['passengers']       = $scope.searchData.passengers ? $scope.searchData.passengers : 1;
        params['flightType']       = $scope.searchData.searchTab ? 'roundtrip' : 'oneway';
        params['currencyCode']     = 'GBP';

        // Add returnDate
        if (params.flightType == 'roundtrip')
          params['returnDate'] = $filter('date')($scope.searchData.returnDate, 'yyyy-MM-dd');

        // Get flights
        searchService
          .getFlights(params)
          .then( function( data ) {
            // shuffleResults
            var _n = getRandomInt(0, 3);
            $scope.flights = shuffleResults(data[_n].results);
            // progress
            $scope.searchData.progress = false;
            // fare data
            var _lowestFare  = data[_n].fareDetails.lowestFare.raw.amount;
            var _highestFare = data[_n].fareDetails.highestFare.raw.amount;
            $scope.searchData.max   = _highestFare;
            $scope.searchData.min   = _lowestFare
            $scope.searchData.range = { from: _lowestFare, to: _highestFare };
            $scope.searchData.currencySymbol = data[_n].fareDetails.highestFare.formatted.symbol;
          });
      }
      // getRandomInt
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      // shuffleResults
      function shuffleResults(sourceArray) {
        for (var n = 0; n < sourceArray.length - 1; n++) {
          var k = n + Math.floor(Math.random() * (sourceArray.length - n));
          var temp = sourceArray[k];
          sourceArray[k] = sourceArray[n];
          sourceArray[n] = temp;
        }
        return sourceArray;
      }
    }

  }

})();
