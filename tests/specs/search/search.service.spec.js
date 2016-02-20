describe('Search Service', function () {

  describe('should be able to search airports and flights', function () {

    var service;

    beforeEach(function () {
      // load module
      module('search');
      // inject service for testing
      inject(['searchService', function (searchService) {
        service = searchService;
      }]);
    });

    it('should contain searchService', function () {
      expect(service).not.toBeNull();
    });

    describe('when searching for airports', function() {

      it('should contain getAirports', function () {
        var response = service.getAirports();
        expect(response).toBeDefined();
      });

      it('should contain airport data', function () {
        var response = service.getAirports();
        response.then(function(data) {
          expect(data.status).toBeDefined();
          expect(data.results[0].name).toBeDefined();
          expect(data.results[0].code).toBeDefined();
        });
      });

    });

    describe('when searching for flights', function() {

      it('should contain getFlights', function () {
        var response = service.getFlights();
        expect(response).toBeDefined();
      });

      it('should contain flight data', function () {
        var response = service.getFlights();
        response.then(function(data) {
          expect(data.status).toBeDefined();
          expect(data.fareDetails).toBeDefined();
          expect(data.results[0].outboundRoute).toBeDefined();
          expect(data.results[0].inboundRoute).toBeDefined();
          expect(data.results[0].price).toBeDefined();
        });
      });

    });

  });

});
