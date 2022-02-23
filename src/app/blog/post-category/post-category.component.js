import './post-category.component.scss';

export const PostCategoryComponent = {
	options: {
		url: '/blog/category/:cat_slug',
		state: 'post-category',
		template: require("./post-category.component.html"),
		controller: PostCategoryController.name,
		controllerAs: "vm",
		authenticate: false,
		resolve:{
			data:["$q", "$stateParams", "HttpService", function($q, $stateParams, HttpService){

			}]
		}
	},
	controller: ["$scope", "$rootScope", "$location", "SeoService", "$stateParams", "$sce", "data", "HttpService", PostCategoryController]
}

function PostCategoryController($scope, $rootScope, $location, SeoService, $stateParams, $sce, data, HttpService) {
	var vm = this;
	var appSettings = $rootScope.getCurrentEnvironment();
	$scope.posts = [];
	const url = appSettings.STORAGE_URL;

	HttpService.get("/categoriaspublicacao/get-posts/" + location.pathname.split('/')[3], {}).then(function (resp) {
		for (var i in resp.data.data.publicacao) {
			const e = document.createElement('div');
			e.innerHTML = resp.data.data.publicacao[i].conteudo;
			resp.data.data.publicacao[i].conteudo = e.innerText;

			resp.data.data.publicacao[i].cover = url + resp.data.data.publicacao[i].capa;
		}
		$scope.posts = resp.data.data;
		SeoService.generateTags({
			title: `Publicacoes da categoria ${$scope.posts.nome} no Blog`,
			description: `Publicacoes da categoria ${$scope.posts.nome} no Blog da Colibri Moveis`,
			image: $scope.posts.publicacao[0].cover,
			slug: $location.absUrl().split('?')[0],
			canonical: $location.absUrl().split('?')[0]
		});
	})

}
