angular.module('ShayApp', [])
	.controller('AppCtrl', function ($scope, $http) {

		$("#menu a").on('click', function (e) {
			e.preventDefault();
			$('html, body').animate({
				scrollTop: $($(this).attr('href')).offset().top
			}, 1000);
		})


		$scope.page = 0;
		$scope.total_pages = 1;
		$scope.shots = [1, 2, 3];


		$scope.loadMore = function () {
			if ($scope.page <= $scope.total_pages) {
				$scope.getShots($scope.page + 1)
			} else {
				console.log('nothing more to load, requested page is out of bounds');
			}
		};


		$scope.getNextPage = function () {
			$scope.page += 1;
			$scope.getShots($scope.page)
		}

		$scope.getShots = function (page, per_page) {
			per_page = per_page || 4
			$scope.canLoad = false;
			$http({
				url   : 'http://api.dribbble.com/players/shayke/shots',
				method: 'jsonp',
				params: {
					callback: 'JSON_CALLBACK',
					per_page: per_page,
					page    : page || 1
				}
			}).then(
					function (result) {
						$scope.canLoad = true;
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

		$scope.getShots(1, 11)
	});


//angular.module('scroll', []).directive('whenScrolled', function () {
//    return function (scope, elm, attr) {
//        var raw = elm[0];
//        angular.element(window).bind('scroll', function () {
//            var buffer = -200;
//            //if user skipped a lot, dont' load more shit
//            scrolling = ((window.scrollY + window.outerHeight) - (raw.offsetHeight + raw.offsetTop + buffer)) <= 400;
//            if (scrolling && scope.canLoad && window.scrollY + window.outerHeight > raw.offsetHeight + raw.offsetTop + buffer) {
//                if(scope.page > 2){
//                    angular.element(window).unbind('scroll');
//                }else{
//                    scope.$apply(attr.whenScrolled);
//                }
//            }
//        });
//    };
//});
