export const PhraseDiretive = {
  options: function () {
    return {
      restrict: 'E',
      template: require("./phrase.diretive.html"),
      scope: { 
        title : "@",
        phrase : "@"
      },
      controller: PhraseController,
      controllerAs: "vm",
      bindToController: true
    }
  },
  element: "phraseDiretive"
}

function PhraseController() {
  var vm = this


}