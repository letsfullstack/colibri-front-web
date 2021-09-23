import './product.component.scss';

export const ProductComponent = {
	options: {
		url: '/produto/:ambient/:category/:slug/:id',
		state: 'product',
		template: require("./product.component.html"),
		controller: ProductController.name,
		controllerAs: "vm",
		authenticate: false
	},
	controller: ["$scope", "$rootScope", "$state", "ngMeta", "$stateParams", "HttpService", "$sce", ProductController]
}

function ProductController($scope, $rootScope, $state, ngMeta, $stateParams, HttpService, $sce) {
	var vm = this;

	vm.produto = null;
	vm.produtos_relacionados = null;
	vm.cor = null;
	vm.cores = [];
	$scope.trslt = window.localStorage.getItem("NG_TRANSLATE_LANG_KEY") || "pt";
	$scope.trslt = $scope.trslt == 'en' ? 'us' : $scope.trslt

	if($stateParams.id){
		HttpService.get("/produtos/get-produto/", {id: $stateParams.id}).then(function(resp){
			vm.produto = resp.data.data.produto;
			vm.produtos_relacionados = resp.data.data.relacionados;
			if (vm.produto && vm.produto.link_youtube){

				vm.produto.link_youtube = vm.produto.link_youtube.replace("watch?v=", "embed/")
				vm.produto.link_youtube = $sce.trustAsResourceUrl(vm.produto.link_youtube);
			}
			if(!vm.checkSlugs()){
				//$state.go("/");
			}
			vm.produto.produtocor.forEach(function(elm, idx){
				if(elm.destaque){
					vm.cor = idx;
				}

				vm.cores.push(elm.cor)

				// elm.imagemprincipal = {};
				// elm.produtoimagem.forEach(function(value, i){
				// 	if(value.principal){
				// 		elm.imagemprincipal = value;
				// 		delete elm.produtoimagem[i];
				// 	}
				// });
			});
		}, function(err){
			$state.go("/");
			console.log(err);
		});
	}
	vm.checkSlugs = () => {
		vm.produto.categoriaproduto.ambiente.nome = vm.produto.categoriaproduto.ambiente["nome_" + $scope.trslt]
		vm.produto.categoriaproduto.nome = vm.produto.categoriaproduto["nome_" + $scope.trslt]
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
