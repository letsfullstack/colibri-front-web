export const CatalogBlogDiretive = {
  options: function () {
    return {
      restrict: 'E',
      template: require("./catalog-blog.diretive.html"),
      scope: {
        title : "@",
        description : "@"
      },
      controller: ["$scope", "$element", "$http", "$rootScope", CatalogBlogController],
      controllerAs: "vm",
      bindToController: true
    }
  },
  element: "catalogBlogDiretive"
}

function CatalogBlogController($scope, $element, $http, $rootScope) {
  	var vm = this

	vm.posts = null;

	$http.get($rootScope.getCurrentEnvironment().BLOG_URL+"/feed/json").then(function(resp){
		vm.posts = resp.data.items.splice(0, 2);
		console.log(vm.posts);
	});

	vm.open = (url) => {
		window.open(url);
	}
  
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