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

		vm.params.title = resp.data.params.find(x => x.par_chave === 'title').par_valor;
		vm.params.subtitle = resp.data.params.find(x => x.par_chave === 'subtitle').par_valor;
	});

	$("navbar-diretive").addClass("invertido")
	window.addEventListener('scroll', function () {
		if ($state.current.state == "home") {
			// if ($(this).scrollTop() > 100) {
			// }
			// else {
			// 	$("navbar-diretive").removeClass("invertido")
			// }
		}
	})

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