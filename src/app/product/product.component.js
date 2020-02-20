import './product.component.scss';

export const ProductComponent = {
	options: {
		url: '/produto/:ambient/:category/:slug/:id',
		selector: 'product',
		template: require("./product.component.html"),
		controller: ProductController.name,
		controllerAs: "vm",
		authenticate: false
	},
	controller: ["$scope", "$rootScope", "$state", "ngMeta", "$stateParams", "HttpService", ProductController]
}

function ProductController($scope, $rootScope, $state, ngMeta, $stateParams, HttpService) {
	var vm = this;

	vm.produto = null;
	vm.produtos_relacionados = null;
	vm.cor = null;

	if($stateParams.id){
		HttpService.get("/produtos/get-produto/", {id: $stateParams.id}).then(function(resp){
			vm.produto = resp.data.data.produto;
			vm.produtos_relacionados = resp.data.data.relacionados;

			if(!vm.checkSlugs()){
				$state.go("/");
			}
			vm.produto.produtocor.forEach(function(elm, idx){
				if(elm.destaque){
					vm.cor = idx;
				}
				elm.imagemprincipal = {};
				elm.produtoimagem.forEach(function(value, i){
					if(value.principal){
						elm.imagemprincipal = value;
						delete elm.produtoimagem[i];
					}
				});
				elm.produtoimagem = array.filter(function (el) {
					return el != null;
				});
			});
		}, function(err){
			$state.go("/");
			console.log(err);
		});
	}

	vm.checkSlugs = () => {
		if($stateParams.category != vm.produto.categoriaproduto.slug || $stateParams.ambient != vm.produto.categoriaproduto.ambiente.slug || $stateParams.slug != vm.produto.slug){
			return false;
		}
		return true;
	}

	setTimeout(() => new Swiper('#product .swiper-container', {
		slidesPerView: 1,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
		}
	}).on('slideChange', function () { $('span.init').text(`0${this.activeIndex + 1}`) }), 300)
}