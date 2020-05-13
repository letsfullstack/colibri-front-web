export const NavbarDiretive = {
  options: function () {
    return {
      restrict: 'E',
      template: require("./navbar.diretive.html"),
      scope: {},
      controller: ["$state", "$scope", "$element", "HttpService", "$translate", "$window", NavbarController],
      controllerAs: "vm",
      bindToController: true
    }
  },
  element: "navbarDiretive"
}

function NavbarController($state, $scope, $element, HttpService, $translate, $window) {
  var vm = this

  $scope.currentLanguage = window.localStorage.getItem("NG_TRANSLATE_LANG_KEY") || "pt";

	$scope.changeLanguage = function (langKey) {
		$translate.use(langKey);
		$window.location.reload();
  };

  $scope.open = function(){
    $('#menu').addClass('menu-open')
  }
  $scope.close = function(){
    $('#menu').removeClass('menu-open')
  }

  HttpService.get("/ambientes/get-nav-info/", {}).then(function (resp) {
		vm.filters = resp.data;
	});
  // $scope.$watch(function () { return $state.$current.name }, function (newVal) {
  //   if (newVal === '/') $(window).scroll(function () {
  //     if ($(this).scrollTop() > 200)
  //       $element.addClass('invert')
  //     else
  //       $element.removeClass('invert')
  //   }) 
  //   else if(newVal !== '/'  && newVal !== ''){
  //     $element.addClass('invert')
  //     $("main").css("margin-top", "90px")
  //   }
  // })
}