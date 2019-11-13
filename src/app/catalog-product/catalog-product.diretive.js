export const CatalogProductDiretive = {
  options: function () {
    return {
      restrict: 'E',
      template: require("./catalog-product.diretive.html"),
      scope: {
        title : "@",
        description : "@",
        products: "@"
      },
      controller: ["$scope", "$element", CatalogProductController],
      controllerAs: "vm",
      bindToController: true
    }
  },
  element: "catalogProductDiretive"
}

function CatalogProductController($scope, $element) {
  var vm = this
  
  console.log(vm.products)
}