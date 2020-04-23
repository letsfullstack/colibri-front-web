export const FooterDiretive = {
  options: function () {
    return {
      restrict: 'E',
      template: require("./footer.diretive.html"),
      scope: { },
      controller: ["$rootScope", "HttpService", FooterController],
      controllerAs: "vm",
      bindToController: true
    }
  },
  element: "footerDiretive"
}

function FooterController($rootScope, HttpService) {
  var vm = this

  HttpService.get("/produtos/get-atributos-busca/", {}).then(function(resp){
    vm.filters = resp.data[0];
	});
}