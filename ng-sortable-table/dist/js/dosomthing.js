// angular.module('app.module').controlle('$socpe',function ($scope) {
//     alert(111)
// })
var app=angular.module("App", ['sortable-table.module']);
app.controller("AppController",function ($scope) {

    $scope.list = [
        {
            name: '小A',
            age: 12,
            str:"A12BC"
        },
        {
            name: '小B',
            age: 13,
            str:"A13BC"
        },
        {
            name: '小C',
            age: 14,
            str:"A14BC"
        },
        {
            name: '小D',
            age: 15,
            str:"A13BF"
        },
        {
            name: '小E',
            age: 16,
            str:"A13SD"
        },
        {
            name: '小F',
            age: 17,
            str:"A14SD"
        },
        {
            name: '小王',
            age: 17,
            str:"A14SD"
        },
        {
            name: '小徐',
            age: 90,
            str:"A14SD"
        },
        {
            name: '小安',
            age: 600,
            str:"A"
        },
        {
            name: '小泰',
            age: 120,
            str:"BASD"
        },
        {
            name: '小卞',
            age: 25,
            str:"basd"
        },
        {
            name: '小卞1',
            age: 9,
            str:"sdasda"
        },
        {
            name: '小卞123456',
            age: 10,
            str:"sdasdc"
        },
        {
            name: '小卞2',
            age: 60,
            str:"sdasdb"
        }

    ];
    $scope.onSort = function(attrName, sortType, event) {
        var list = $scope.list.sort(function(a, b) {
            if(typeof a[attrName] === 'string') {
                return a[attrName].localeCompare(b[attrName]);
            } else if (typeof a[attrName] === 'number') {
                return a[attrName] - b[attrName];
            }
        });
        if(sortType === 'desc') {
            list = list.reverse();
        }
        $scope.list = list;
    };

});
angular.bootstrap(document.querySelector('#main'), [
'app.module',
]);