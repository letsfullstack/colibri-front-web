import './sub.component.scss';

export const SubComponent = {
	options: {
		url: '/sobre',
		state: 'sub',
		template: require("./sub.component.html"),
		controller: SubController.name,
		controllerAs: "vm",
		authenticate: false
	},
	controller: ["$scope", "HttpService", "$rootScope", "SeoService", "$location", SubController]
}

function SubController($scope, HttpService, $rootScope, SeoService, $location) {
	var vm = this

	$scope.home = "HOME"

	vm.params = {};
	vm.images = [];

	vm.url = $rootScope.getCurrentEnvironment().STORAGE_URL;

	var currentLanguage = window.localStorage.getItem("NG_TRANSLATE_LANG_KEY") || "pt";

	HttpService.get("/resources/get-home-data/", {}, {}).then(function (resp) {
		vm.viewable = true;
		vm.most_viewed = resp.data.most_viewed;
		vm.images = resp.data.images[0];

		if (currentLanguage=='en'){
			vm.params.title_1 = resp.data.params.find(x => x.par_chave === 'about_sub_1').par_valor_en;
			vm.params.subtitle_1 = resp.data.params.find(x => x.par_chave === 'about_cont_1').par_valor_en;
			vm.params.title_2 = resp.data.params.find(x => x.par_chave === 'about_sub_2').par_valor_en;
			vm.params.subtitle_2 = resp.data.params.find(x => x.par_chave === 'about_cont_2').par_valor_en;

		}else if (currentLanguage=='es'){
			vm.params.title_1 = resp.data.params.find(x => x.par_chave === 'about_sub_1').par_valor_es;
			vm.params.subtitle_1 = resp.data.params.find(x => x.par_chave === 'about_cont_1').par_valor_es;
			vm.params.title_2 = resp.data.params.find(x => x.par_chave === 'about_sub_2').par_valor_es;
			vm.params.subtitle_2 = resp.data.params.find(x => x.par_chave === 'about_cont_2').par_valor_es;

		}else{
			vm.params.title_1 = resp.data.params.find(x => x.par_chave === 'about_sub_1').par_valor;
			vm.params.subtitle_1 = resp.data.params.find(x => x.par_chave === 'about_cont_1').par_valor;
			vm.params.title_2 = resp.data.params.find(x => x.par_chave === 'about_sub_2').par_valor;
			vm.params.subtitle_2 = resp.data.params.find(x => x.par_chave === 'about_cont_2').par_valor;
		}
	});

	vm.products = [
		{ name: "Bancada", location: "Astúrias", img: "https://w1.ezcdn.com.br/abouthome/fotos/grande/9922fg1/bancada-gourmet-dobravel-para-cozinha-bliv-castanho-e-branco.jpg" },
		{ name: "Home Suspenso", location: "Salinas", img: "https://a-static.mlcdn.com.br/618x463/painel-home-suspenso-greco-para-tv-ate-65-polegadas-dj-moveis/trilar/6789/6165500bbde2ade854012b7af006b5ae.jpg" },
		{ name: "Roupeiro", location: "Recife", img: "https://moveissimonetti.vteximg.com.br/arquivos/ids/7378918-1000-1000/56665.jpg?v=636582783658400000" },
		{ name: "Bancada", location: "Ilhabela", img: "https://w1.ezcdn.com.br/abouthome/fotos/grande/9922fg1/bancada-gourmet-dobravel-para-cozinha-bliv-castanho-e-branco.jpg" }
	]

	$(document).ready(() => {
		new Swiper('.products .mid .swiper-container')
	});

	var slug = $location.absUrl().split('?')[0];
	SeoService.generateTags({
		title: "Sobre",
		titleConcat: true,
		slug: slug,
		canonical: slug
	});
}