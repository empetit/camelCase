'use strict';

/**
 * @ngdoc function
 * @name camelCaseApp.controller:vuePolygonInteractiveCtrl
 * @description
 * # vuePolygonInteractiveCtrl
 * Controller of the camelCaseApp
 */
angular.module('camelCaseApp')
	.controller('actorsCtrl', function($http, $scope, ThingService, API_KEY, $routeParams,$location, $rootScope) {


		var idPerson = $routeParams.id;
		$scope.actor = {};

		var getActor = 'http://api.themoviedb.org/3/person/' + idPerson + '?api_key=' + API_KEY;
		var getMovies = 'http://api.themoviedb.org/3/person/' + idPerson + '/credits?api_key=' + API_KEY;

		$http.get(getActor).then(function(res) {
			$scope.actor = res.data;
			$rootScope.historic.push({
				'image':'https://image.tmdb.org/t/p/w92' + $scope.actor.profile_path,
				'url':'actor/' + $scope.actor.id
			});
			$scope.historic = $rootScope.historic;
		})

		$scope.redirectTo = function(url) {
			$location.url(url);
		}

		$http.get(getMovies).then(function(res) {

			var arr = res.data.cast.slice(0, 7);
			$scope.actor.movies  = shuffle(arr);

			$scope.getMovies();
		})

		$scope.moveToHomePage = function() {
			$location.url('/');
		}

		$scope.selectedMovie = function(selected) {
			//console.log(selected);
			if(selected  && selected.id)
				$location.url('movie/'+selected.id);
		}



		$scope.getMovies = function() {
			$scope.actor.movies.forEach(function(key, value) {
				var getDetailedMovie = 'http://api.themoviedb.org/3/movie/' + key.id + '?api_key=' + API_KEY;
				$http.get(getDetailedMovie).then(function(res) {
					key.info = res.data;

					//console.log(key.info);
				})
			})

			afficherEffet(2,2);
		}






	});
