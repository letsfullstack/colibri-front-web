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
  controller: ["$scope", "ngMeta", "MetaFunction", HomeController]
}

function HomeController($scope, ngMeta, MetaFunction) {
  $scope.home = "HOME"
  console.log("TESTE CONTROLLER")
}