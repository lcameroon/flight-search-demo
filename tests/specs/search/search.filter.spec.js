describe('Search Filter', function () {

  describe('should be able to filtering between a range', function () {

    var filter;

    beforeEach(function () {
      // load module
      module('search');
      inject(function($filter) {
        filter = $filter('rangeFilter');
      });
    });

    it('should filter the results using the rangeFilter', function () {

      var items = [
        { 'price': { 'raw': { 'amount': 0 } } },
        { 'price': { 'raw': { 'amount': 1 } } },
        { 'price': { 'raw': { 'amount': 2 } } },
        { 'price': { 'raw': { 'amount': 3 } } },
        { 'price': { 'raw': { 'amount': 4 } } },
        { 'price': { 'raw': { 'amount': 5 } } },
        { 'price': { 'raw': { 'amount': 6 } } }
      ];

      var rangeInfo = {
        from: 2,
        to: 4
      };

      expect(filter(items, rangeInfo).length).toEqual(3);

    });

  });

});
