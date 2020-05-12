export const CatalogProductDiretive = {
  options: function () {
    return {
      restrict: 'E',
      template: require("./catalog-product.diretive.html"),
      scope: {
        title: "@",
        description: "@",
        products: "="
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

  setTimeout(() => new Swiper('catalog-product-diretive .swiper-container', {
    slidesPerView: 2,
    spaceBetween: 20,
    breakpoints: {
      576 : {
        slidesPerView: 1.4,
        spaceBetween: 20
      }
    }
  }), 300);
}