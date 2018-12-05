/**
 * @author 鸿则
 * @email hungtcs@163.com
 * @description Angular1.x 排序插件
 * @updateAt 2018-06-19
 * @license MIT
 */
(function(angular) {

  const module = angular.module('sortable-table.module', []);

  module.directive('sortableTable', [
    function() {
      return {
        restrict: 'A',
        scope: {
          onSort: '&',
        },
        link: function(scope, element, attrs, controller) {
          let $cols = Array.from(element.find('th[sortable-column]')).map(col => $(col).addClass('sortable-none'));
          $cols.forEach($col => {
            $col.on('click', event => {
              let sortType = $col.data('sortType') || 'asc';
              if(sortType === 'desc') {
                $col.data('sortType', 'asc');
              } else {
                $col.data('sortType', 'desc');
              }
              $cols.forEach($col => $col.removeClass('sortable-asc sortable-desc').addClass('sortable-none'));
              $col.removeClass('sortable-none').addClass(`sortable-${ sortType }`);
              scope.$apply(function() {
                scope.onSort && scope.onSort({
                  $attrName: $col.attr('sortable-column'),
                  $sortType: sortType,
                  $event: event,
                });
              });
            });
          });
        },
      };
    }
  ]);

}(window.angular));
