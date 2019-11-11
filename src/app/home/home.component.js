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
  $scope.home = "HOME"

  $(document).ready(() => {
    new Swiper('.products .mid .swiper-container')
  })
}