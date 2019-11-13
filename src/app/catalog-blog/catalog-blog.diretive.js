export const CatalogBlogDiretive = {
  options: function () {
    return {
      restrict: 'E',
      template: require("./catalog-blog.diretive.html"),
      scope: {
        title : "@",
        description : "@"
      },
      controller: ["$scope", "$element", CatalogBlogController],
      controllerAs: "vm",
      bindToController: true
    }
  },
  element: "catalogBlogDiretive"
}

function CatalogBlogController($scope, $element) {
  var vm = this
  
  new Swiper($element.children().children().children()[2],{
    slidesPerView : 1
  })
}