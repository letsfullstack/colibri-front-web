import './info.component.scss';

export const ModalInfoComponent = {
	options: {
		controller: 'ModalInfoController'
	},
	controller: ["$scope", "$rootScope", "swangular", "$sce", ModalInfoController]
}

function ModalInfoController($scope, $rootScope, swangular, $sce) {
	$scope.title = $rootScope._modalInfo.title || '';
	$scope.description = $sce.trustAsHtml($rootScope._modalInfo.description || '');
	$scope.image = $rootScope._modalInfo.image || null;
	$scope.buttonText = $rootScope._modalInfo.buttonText || null;
	$scope.link = $rootScope._modalInfo.link || null;

	$scope.close = () => {
		swangular.close();
	};
}
