describe('Search Controller', function () {

  describe('should be able to find an origin and destination', function () {

    var testController, $rootScope, $scope, $controller;

    var mockAirportData = {
      "results": [{
        "code": "MCK",
        "name": "Mock Airport"
      }]
    }
    var mockFlightData = {
      "fareDetails": {},
      "results": [{
        "outboundRoute": {},
        "inboundRoute": {},
        "price": {}
      }]
    }

    beforeEach(function(){
      // load module
      module('search');
      inject(function(_searchService_, _$rootScope_, _$controller_){
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $controller = _$controller_;
        searchService = _searchService_;

        testController = $controller('SearchController', {
          $rootScope : $rootScope,
          $scope: $scope,
          searchService: searchService
        });
      });
    });

    it('should have some public values into scope', function () {
      expect(testController).toBeDefined();
      expect(testController.today).toBeDefined();
      expect(testController.noCache).toBeDefined();
      expect(testController.noCache).toBe(true);
      expect(testController.searchText).toBeDefined();
      expect(testController.searchText).toBe(null);
      expect(testController.selectedItem).toBeDefined();
      expect(testController.maxPassengers).toBeDefined();
      expect(testController.passengers).toEqual(1);
    });

    it('should have some public methods into scope', function () {
      expect(testController.toggleSidenav).toBeDefined();
      expect(testController.querySearch).toBeDefined();
      expect(testController.isInvalid).toBeDefined();
      expect(testController.isDuplicate).toBeDefined();
      expect(testController.fetchResults).toBeDefined();
    });

    it('when toggle sidenav', function () {
      expect(testController.toggleSidenav('left')).not.toBeDefined();
    });

    it('when query search', function () {
      expect(testController.querySearch()).toEqual([]);
    });

    describe('should be able to fetch flights result', function () {

      it('when fetching flights result', function () {
        expect(testController.fetchResults).toBeDefined();
      });

    });

  });

});
