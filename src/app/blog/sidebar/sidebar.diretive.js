export const SidebarDiretive = {
	options: function () {
		return {
			restrict: 'E',
			template: require("./sidebar.diretive.html"),
			scope: {},
			controller: ["$rootScope", "HttpService", "$translate", "$window", "$scope", SidebarController],
			controllerAs: "vm",
			bindToController: true
		}
	},
	element: "sidebarDiretive"
}

function SidebarController($rootScope, HttpService, $translate, $window, $scope) {
	var vm = this
	$scope.active = false;
	$scope.categories = [];

	HttpService.get("/categoriaspublicacao/get-categorias", {}).then(function (resp) {
		$scope.categories = resp.data.data;
	})

	$scope.toggleActive = function() {
		$scope.active = !$scope.active;
	}

	return true;

}
