(function(){
  'use strict';

  /**
   * Range Filter
   * @param rangeInfo
   */
  angular
    .module('search').filter('rangeFilter', function() {
    return function( items, rangeInfo ) {
      var filtered = [];
      var min = parseInt(rangeInfo.from);
      var max = parseInt(rangeInfo.to);
      // If prices is with the range
      angular.forEach(items, function(item) {
        if( item.price.raw.amount >= min && item.price.raw.amount <= max ) {
          filtered.push(item);
        }
      });
      return filtered;
    };
  });

})();
