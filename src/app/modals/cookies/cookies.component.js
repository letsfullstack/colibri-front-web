import './cookies.component.scss';

var app = angular.module('myApp', ['ui.mask','ngCookies']);

export const ModalCookiesComponent = {
	options: {
		controller: 'ModalCookiesController'
	},
	controller: ["$scope", "$rootScope", "swangular", '$cookies',"$http", "HttpService", ModalCookiesController]
}

function ModalCookiesController($scope, $rootScope, swangular,$cookies, $http, HttpService) {
	$scope.close = () => {
		swangular.close()
	}
	$scope.aceitarCookies = function () {
		$cookies.put('acceptCookies', 'true');
		swangular.close()

	} 
}