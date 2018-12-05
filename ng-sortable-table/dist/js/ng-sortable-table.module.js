"use strict";

/**
 * @author 鸿则
 * @email hungtcs@163.com
 * @description Angular1.x 排序插件
 * @updateAt 2018-06-19
 * @license MIT
 */
(function (angular) {
  var module = angular.module('sortable-table.module', []);
  module.directive('sortableTable', [function () {
    return {
      restrict: 'A',
      scope: {
          onSort: '&',
          sortList:"="
      },
      link: function link(scope, element, attrs, controller) {
        var $cols = Array.from(element.find('th[sortable-column]')).map(function (col) {
          return $(col).addClass('sortable-none');
        });
        $cols.forEach(function ($col) {
          $col.on('click', function (event) {
            var sortType = $col.data('sortType') || 'asc';

            if (sortType === 'desc') {
              $col.data('sortType', 'asc');
            } else {
              $col.data('sortType', 'desc');
            }

            $cols.forEach(function ($col) {
              return $col.removeClass('sortable-asc sortable-desc').addClass('sortable-none');
            });
            $col.removeClass('sortable-none').addClass("sortable-".concat(sortType));
            scope.$apply(function () {
              scope.onSort && scope.onSort({
                $attrName: $col.attr('sortable-column'),
                $sortType: sortType,
                $event: event
              });
            });
          });
        });

          scope.onSort = function(obj) {
              var list = scope.sortList.sort(function(a, b) {
                // console.log(scope.sortList);
                // console.log(a);
                // console.log(a.$attrName)
                // console.log(a[a.$attrName]);
                  if(typeof a[obj.$attrName] === 'string') {
                      return a[obj.$attrName].localeCompare(b[obj.$attrName]);
                  } else if (typeof a[obj.$attrName] === 'number') {
                      return a[obj.$attrName] - b[obj.$attrName];
                  }
              });
              if(obj.$sortType === 'desc') {
                  scope.sortList = list.reverse();
              }
              scope.sortList = list;
          };
      }
    };
  }]);
})(window.angular);