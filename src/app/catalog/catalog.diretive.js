export const CatalogDiretive = {
  options: function () {
    return {
      restrict: 'E',
      template: require("./catalog.diretive.html"),
      scope: {
        title : "@",
        description : "@"
      },
      controller: ["$scope", "$element", CatalogController],
      controllerAs: "vm",
      bindToController: true
    }
  },
  element: "catalogDiretive"
}

function CatalogController($scope, $element) {
  var vm = this
  
  new Swiper($element.children().children().children()[2],{
    slidesPerView : 1
  })
}