import './home.component.scss';

export const HomeComponent = {
  options: {
    url: '/',
    selector: 'home',
    template: require("./home.component.html"),
    controller: HomeController.name,
    controllerAs: "vm",
    authenticate: false
  },
  controller: ["$scope", "ngMeta", "MetaService", HomeController]
}

function HomeController($scope, ngMeta, MetaService) {
  var vm = this
  
  $scope.home = "HOME"

  vm.products = [0,1,2,3,4,5,6,7]

  $(document).ready(() => {
    new Swiper('.products .mid .swiper-container')
  })
}