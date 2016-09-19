import templateUrl from './sort-helper.html';

function sortHelper() {
  return {
    require: '^listHelper',
    scope: {
      sortBy: '@sortHelper',
      sortId: '@'
    },
    transclude: true,
    templateUrl: templateUrl,
    link: function(scope, element, attrs, listHelperCtrl) {
      scope.sort = function() {
        if (isSorted()) {
          var currentReverse = listHelperCtrl.getReverse();
          listHelperCtrl.sort(getSortBy(), !currentReverse, getSortId(), getSortScope());
        } else {
          listHelperCtrl.sort(getSortBy(), getReverse(), getSortId(), getSortScope());
        }
      };

      scope.isAscending = isAscending;
      scope.isDescending = isDescending;

      function isAscending() {
        return isSorted() && !listHelperCtrl.getReverse();
      }

      function isDescending() {
        return isSorted() && listHelperCtrl.getReverse();
      }

      function isSorted() {
        var sortId = getSortId();
        var currentSortId = listHelperCtrl.getSortId();
        return sortId === currentSortId;
      }

      function getSortId() {
        return scope.sortId || getSortBy();
      }

      function getSortScope() {
        return scope.$parent;
      }

      function getSortBy() {
        return scope.sortBy;
      }

      function getReverse() {
        return attrs.reverse === 'true';
      }
    }
  };
}

export default sortHelper;
