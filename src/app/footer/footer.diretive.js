export const FooterDiretive = {
  options: function () {
    return {
      restrict: 'E',
      template: require("./footer.diretive.html"),
      scope: { },
      controller: ["$rootScope", FooterController],
      controllerAs: "vm",
      bindToController: true
    }
  },
  element: "footerDiretive"
}

function FooterController($rootScope) {
  var vm = this


}