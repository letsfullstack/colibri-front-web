import './navbar.diretive.scss'

export const NavbarDiretive = {
  options: function () {
    return {
      restrict: 'E',
      template: require("./navbar.diretive.html"),
      scope: { },
      controller: [NavbarController],
      controllerAs: "vm",
      bindToController: true
    }
  },
  element: "navbarDiretive"
}

function NavbarController() {
  var vm = this


}