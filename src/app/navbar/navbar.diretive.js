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

  vm.isMobile = false;
  vm.menuOpen = false;
  vm.search;

  if (window.innerWidth < 991){
    vm.isMobile = true;
  }
  
  
  $scope.currentLanguage = window.localStorage.getItem("NG_TRANSLATE_LANG_KEY") || "pt";

	$scope.changeLanguage = function (langKey) {
		$translate.use(langKey);
		$window.location.reload();
  };

  $scope.buscar = function(){
    setTimeout(function(){
      if (vm.search){
        window.location.href = "produtos/all/all/" + vm.search;
  
      }else{
        window.location.href = "produtos/all/all/all";
      }
    }, 300)
  }

  $scope.open = function(){
    $('#menu').toggleClass('menu-open')
    vm.menuOpen = !vm.menuOpen;
  }
  $scope.close = function(){
    $('#menu').removeClass('menu-open')
    vm.menuOpen = false;
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