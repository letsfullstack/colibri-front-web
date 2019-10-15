import './footer.diretive.scss'

export const FooterDiretive = {
  options: function () {
    return {
      restrict: 'E',
      template: require("./footer.diretive.html"),
      scope: { },
      controller: FooterController,
      controllerAs: "vm",
      bindToController: true
    }
  },
  element: "footerDiretive"
}

function FooterController() {
  var vm = this


}