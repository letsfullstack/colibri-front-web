export const NewsDiretive = {
  options: function () {
    return {
      restrict: 'E',
      template: require("./newsletter.diretive.html"),
      scope: { },
      controller: NewsController,
      controllerAs: "vm",
      bindToController: true
    }
  },
  element: "newsDiretive"
}

function NewsController() {
  var vm = this
}