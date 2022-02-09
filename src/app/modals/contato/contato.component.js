import './contato.component.scss';

var app = angular.module('myApp', ['ui.mask']);

export const ModalContatoComponent = {
	options: {
		controller: 'ModalContatoController'
	},
	controller: ["$scope", "$rootScope", "swangular", "$http", "HttpService", ModalContatoController]
}

function ModalContatoController($scope, $rootScope, swangular, $http, HttpService) {
	$scope.close = () => {
		swangular.close()
	}
	$scope.enviar = function () {
		if ($scope.data) {
			if ($scope.data.nome && $scope.data.email && $scope.data.telefone && $scope.data.mensagem) {
				HttpService.post("/mensagens/enviar-mensagem/", $scope.data, $scope.data).then(function (resp) {
					$scope.data = {}
					swangular.swal(
						'Sucesso!',
						'Sua mensagem foi enviada com sucesso!',
						'success'
					)
				});
			}
		}
	} 
}