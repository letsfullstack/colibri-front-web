import './lead.component.scss';

export const ModalLeadComponent = {
	options: {
		controller: 'ModalLeadController'
	},
	controller: ["$scope", "$rootScope", "swangular", "$http", "HttpService", ModalLeadController]
}

function ModalLeadController($scope, $rootScope, swangular, $http, HttpService) {
	var vm = this;
	var catalogo;

	$scope.close = () => {
		swangular.close()
	}
 
	HttpService.get("/resources/get-home-data/", {}, {}).then(function (resp) {
		vm.most_viewed = resp.data.most_viewed;
		vm.images = resp.data.images[0];
		if (vm.images) {
			catalogo = vm.images.catalogo;
		}
	});

	var STORAGE_URL = $rootScope.getCurrentEnvironment().STORAGE_URL;

	$scope.openPDF = function () {
		if ($scope.lead) {
			if ($scope.lead.nome && $scope.lead.nome != "") {
				if ($scope.lead.email && $scope.lead.email != "") {
					HttpService.get("/leads/post-new-lead/", $scope.lead, $scope.lead).then(function (resp) {
						window.open(STORAGE_URL + catalogo)
						$scope.lead = {}
						swangular.close()
					});
				}
			}
		}
	}
}