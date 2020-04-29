import './lead.component.scss';

export const ModalLeadComponent = {
	options: {
		controller: 'ModalLeadController'
	},
	controller: ["$scope", "$rootScope", "swangular", "$http", "HttpService", ModalLeadController]
}

function ModalLeadController($scope, $rootScope, swangular, $http, HttpService) {
	
	$scope.close = () => {
		swangular.close()
	}
	$scope.openPDF = function () {
		if ($scope.lead) {
			if ($scope.lead.nome && $scope.lead.nome != "") {
				if ($scope.lead.email && $scope.lead.email != "") {
					HttpService.get("/leads/post-new-lead/", $scope.lead, $scope.lead).then(function (resp) {
						window.open('http://prod.colibri.letscomunica.com.br/api/upload/uploads/download/catalogo_2020.pdf')
						$scope.lead = {}
						swangular.close()
					});
				}
			}
		}
	}
}