import './sub.component.scss';

export const SubComponent = {
  options: {
    url: '/sub',
    selector: 'sub',
    template: require("./sub.component.html"),
    controller: SubController.name,
    controllerAs: "vm",
    authenticate: false
  },
  controller: ["$scope", "ngMeta", "MetaService", SubController]
}

function SubController($scope, ngMeta, MetaService) {
  $scope.home = "HOME"

  $(document).ready(() => {
    new Swiper('.products .mid .swiper-container')
  })
}