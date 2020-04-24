export const FooterDiretive = {
	options: function () {
		return {
			restrict: 'E',
			template: require("./footer.diretive.html"),
			scope: {},
			controller: ["$scope", "$rootScope", "$translate", "$window", FooterController],
			controllerAs: "vm",
			bindToController: true
		}
	},
	element: "footerDiretive"
}

function FooterController($scope, $rootScope, $translate, $window) {
	var vm = this

	$scope.currentLanguage = window.localStorage.getItem("NG_TRANSLATE_LANG_KEY") || "pt";

	$scope.changeLanguage = function (langKey) {
		$translate.use(langKey);
		$window.location.reload();
	};
}