angular.module('ShayApp', ['scroll'])

    .controller('AppCtrl', function ($scope, $http) {
        $scope.page = 0;
        $scope.total_pages = 1;
        $scope.shots = [1, 2, 3, 4];

        $scope.goto = function (url) {
            location = url;
        };
        $scope.loadMore = function () {
            if ($scope.page <= $scope.total_pages) {
                $scope.getShots($scope.page + 1)
            } else {
                console.log('nothing more to load, requested page is out of bounds');
            }
        };

        $scope.getShots = function (page) {
            $scope.canLoad = false;
            $http({
                url: 'http://api.dribbble.com/players/shayke/shots',
                method: 'jsonp',
                params: {
                    callback: 'JSON_CALLBACK',
                    per_page: 4,
                    page: page || 1
                }
            }).then(
                function (result) {
                    $scope.canLoad = true;
                    console.log(result);
                    if ($scope.page == 0) {
                        $scope.shots = result.data.shots;
                    } else {
                        $scope.shots = $scope.shots.concat(result.data.shots);
                    }
                    $scope.page = result.data.page;
                    $scope.total_pages = result.data.pages;
                }
            )
        };

        $scope.getShots(1)
    });


angular.module('scroll', []).directive('whenScrolled', function () {
    return function (scope, elm, attr) {
        var raw = elm[0];
        angular.element(window).bind('scroll', function () {
            var buffer = -200;

            //if user skipped a lot, dont' load more shit
            scrolling = ((window.scrollY + window.outerHeight) - (raw.offsetHeight + raw.offsetTop + buffer)) <= 400;
            if (scrolling && scope.canLoad && window.scrollY + window.outerHeight > raw.offsetHeight + raw.offsetTop + buffer) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});
