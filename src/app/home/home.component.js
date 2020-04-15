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
	controller: ["$scope", "ngMeta", "MetaService", "HttpService", "$http", "$rootScope", HomeController]
}

function HomeController($scope, ngMeta, MetaService, HttpService, $http, $rootScope) {
	var vm = this;

	vm.most_viewed = [];

	HttpService.get("/resources/get-home-data/", {}, {}).then(function(resp){
		vm.most_viewed = resp.data.most_viewed;
	});

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
	}).on('slideChange', function () { $('span.init').text(`0${this.activeIndex + 1}`) }), 300)

}