import './blog.component.scss';

export const BlogComponent = {
	options: {
		url: '/blog',
		state: 'blog',
		template: require("./blog.component.html"),
		controller: BlogController.name,
		controllerAs: "vm",
		authenticate: false,
		resolve:{
			data:["$q", "$stateParams", "HttpService", function($q, $stateParams, HttpService){

			}]
		}
	},
	controller: ["$scope", "$rootScope", "$location", "SeoService", "$stateParams", "$sce", "data", "HttpService", BlogController]
}

function BlogController($scope, $rootScope, $location, SeoService, $stateParams, $sce, data, HttpService) {
	var vm = this;
	var appSettings = $rootScope.getCurrentEnvironment();
	$scope.posts = [];
	const url = appSettings.STORAGE_URL;

	HttpService.get("/publicacoes/get-posts", {}).then(function (resp) {
		for (var i in resp.data.data) {
			const e = document.createElement('div');
			e.innerHTML = resp.data.data[i].conteudo;
			resp.data.data[i].conteudo = e.innerText;

			resp.data.data[i].cover = url + resp.data.data[i].capa;
		}
		$scope.posts = resp.data.data;
	})

}
