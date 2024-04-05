import './home.component.scss';

export const HomeComponent = {
	options: {
		url: '/',
		state: 'home',
		template: require("./home.component.html"),
		controller: HomeController.name,
		controllerAs: "vm",
		authenticate: false
	},
	controller: ["$scope", "HttpService", "$sce", "$state", "SeoService", HomeController]
}

function HomeController($scope, HttpService, $sce, $state, SeoService) {
	var vm = this;

	vm.most_viewed = [];
	vm.images = [];

	$scope.leadValid = {}

	var currentLanguage = window.localStorage.getItem("NG_TRANSLATE_LANG_KEY") || "pt";

	vm.trustAsHtml = function(string) {
		return $sce.trustAsHtml(string);
	};

	vm.params = {};
	HttpService.get("/resources/get-home-data/", {}, {}).then(function (resp) {
		vm.viewable = true;
		vm.most_viewed = resp.data.most_viewed;
		vm.images = resp.data.images[0];
		if (vm.images) {
			vm.images.link_youtube = vm.images.link_youtube.replace("watch?v=", "embed/")

			vm.images.link_youtube = vm.images.link_youtube.replace(".be/", "be.com/embed/")

			vm.images.link_youtube = $sce.trustAsResourceUrl(vm.images.link_youtube);
		}

		if (currentLanguage=='en'){
			vm.params.title = resp.data.params.find(x => x.par_chave === 'title').par_valor_en;
			vm.params.subtitle = resp.data.params.find(x => x.par_chave === 'subtitle').par_valor_en;
			vm.params.catalog_title = resp.data.params.find(x => x.par_chave === 'catalog_title').par_valor_en;
			vm.params.catalog_link = $sce.trustAsResourceUrl(resp.data.params.find(x => x.par_chave === 'catalog_link').par_valor_en);
			
		}else if (currentLanguage=='es'){
			vm.params.title = resp.data.params.find(x => x.par_chave === 'title').par_valor_es;
			vm.params.subtitle = resp.data.params.find(x => x.par_chave === 'subtitle').par_valor_es;
			vm.params.catalog_title = resp.data.params.find(x => x.par_chave === 'catalog_title').par_valor_es;
			vm.params.catalog_link = $sce.trustAsResourceUrl(resp.data.params.find(x => x.par_chave === 'catalog_link').par_valor_es);

		}else{
			vm.params.title = resp.data.params.find(x => x.par_chave === 'title').par_valor;
			vm.params.subtitle = resp.data.params.find(x => x.par_chave === 'subtitle').par_valor;
			vm.params.catalog_title = resp.data.params.find(x => x.par_chave === 'catalog_title').par_valor;
			vm.params.catalog_link = $sce.trustAsResourceUrl(resp.data.params.find(x => x.par_chave === 'catalog_link').par_valor);
		}

		
	});

	$("navbar-diretive").addClass("invertido")


	setTimeout(() => new Swiper('.banner .swiper-container', {
		slidesPerView: 1,
		pagination: {
			el: '.banner .swiper-pagination',
			type: 'bullets',
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		}
	}).on('slideChange', function () { $('span.init').text(`0${this.activeIndex + 1}`) }), 300);


	SeoService.generateTags();

}
