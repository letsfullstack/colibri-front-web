export const CatalogBlogDiretive = {
  options: function () {
    return {
      restrict: 'E',
      template: require("./catalog-blog.diretive.html"),
      scope: {
        title : "@",
        description : "@"
      },
      controller: ["$scope",  "HttpService", "$rootScope", CatalogBlogController],
      controllerAs: "vm",
      bindToController: true
    }
  },
  element: "catalogBlogDiretive"
}

function CatalogBlogController($scope, HttpService, $rootScope) {
  	var vm = this

	var appSettings = $rootScope.getCurrentEnvironment();

	HttpService.get("/publicacoes/get-posts", {limit:4}).then(function (resp) {
		for (var i in resp.data.data) {
			resp.data.data[i].image = appSettings.STORAGE_URL + resp.data.data[i].capa;
		}
		vm.posts = resp.data.data;
	})

	setTimeout(() => new Swiper('catalog-blog-diretive .swiper-container', {
		slidesPerView: 2,
		spaceBetween: 20,
		breakpoints: {
			576 : {
				slidesPerView: 1.5,
				spaceBetween: 0
			}
		}
	}), 300);
}
