import './home.component.scss';

export const HomeComponent = {
    options : {
        url: '/',
        selector: 'home',
        template: require("./home.component.html"),
        controller: HomeController.name,
        controllerAs: "vm",
        authenticate: false
    },
    controller: ["$scope", "local", "ngMeta", "MetaFunction", HomeController]
}

function HomeController($scope, local, ngMeta, MetaFunction) {
  $scope.asd = "TESTE"
  console.log("TESTE CONTROLLER")
}