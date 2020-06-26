export const FooterDiretive = {
	options: function () {
		return {
			restrict: 'E',
			template: require("./footer.diretive.html"),
			scope: {},
			controller: ["$rootScope", "HttpService", "$translate", "$window", "$scope", FooterController],
			controllerAs: "vm",
			bindToController: true
		}
	},
	element: "footerDiretive"
}

function FooterController($rootScope, HttpService, $translate, $window, $scope) {
	var vm = this

	$scope.currentLanguage = window.localStorage.getItem("NG_TRANSLATE_LANG_KEY") || "pt";

	$scope.changeLanguage = function (langKey) {
		$translate.use(langKey);
		$window.location.reload();
	};

	HttpService.get("/ambientes/get-nav-info/", {}).then(function (resp) {
		vm.filters = resp.data;
		vm.filters.forEach(element => {
			// debugger
			if ($scope.currentLanguage == "pt") {
				element.nome = element.nome_pt
			} else if ($scope.currentLanguage == "en") {
				element.nome = element.nome_us
			} else if ($scope.currentLanguage == "es") {
				element.nome = element.nome_es
			}
			element.categoriaproduto.forEach(el => {
				if ($scope.currentLanguage == "pt") {
					el.nome = el.nome_pt
				} else if ($scope.currentLanguage == "en") {
					el.nome = el.nome_us
				} else if ($scope.currentLanguage == "es") {
					el.nome = el.nome_es
				}
			});
		});
	});
}