(function(){
  'use strict';

  angular.module('search')
         .factory('searchService', SearchService );

  SearchService.$inject = ['$q', '$timeout', '$http'];

  /**
   * Search DataService
   *
   * @returns {{getAirports: Function}}
   * @returns {{getFlights: Function}}
   * @constructor
   */
  function SearchService($q, $timeout, $http){

    var airportsUrl = './data/airports.json'; // api/airports
    var flightsUrl  = './data/flights.json';  // api/flights

    var service = {
      getAirports: getAirports,
      getFlights: getFlights
    };

    return service;

    // ******************************
    // Internal methods
    // ******************************

    function getAirports() {
      return $http.get(airportsUrl)
        .then(getAirportsComplete)
        .catch(getAirportsFailed);

      function getAirportsComplete(response){
        return response.data;
      }

      function getAirportsFailed(error){
        console.log('XHR Failed for getAirports', error.data);
      }
    }

    function getFlights(_params) {
      return $http.get(flightsUrl, { params: _params } )
        .then(getFlightsComplete)
        .catch(getFlightsFailed);

      function getFlightsComplete(response){
        // Simulated slow fetch
        var deferred = $q.defer();
        $timeout(function() {
          deferred.resolve(response.data)
        }, 3000);
        return deferred.promise;
      }

      function getFlightsFailed(error){
        console.log('XHR Failed for getFlights', error.data);
      }
    }

  }

})();
