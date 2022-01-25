import './product.component.scss';

export const ProductComponent = {
	options: {
		url: '/produtos/:ambient/:category/:slug/:id',
		state: 'product',
		template: require("./product.component.html"),
		controller: ProductController.name,
		controllerAs: "vm",
		authenticate: false
	},
	controller: ["$scope", "$rootScope", "$state", "$stateParams", "HttpService", "$sce", ProductController]
}

function ProductController($scope, $rootScope, $state, $stateParams, HttpService, $sce) {
	var vm = this;

	vm.produto = null; 
	vm.produtos_relacionados = null;
	vm.cor = null;
	vm.cores = [];
	$scope.maxColors = 0;
	$scope.currentIDX = 0;
	$scope.trslt = window.localStorage.getItem("NG_TRANSLATE_LANG_KEY") || "pt";
	$scope.trslt = $scope.trslt == 'en' ? 'us' : $scope.trslt

	if ($stateParams.id) {
		HttpService.get("/produtos/get-produto/", { id: $stateParams.id }).then(function (resp) {
			vm.produto = resp.data.data.produto;
			vm.produtos_relacionados = resp.data.data.relacionados;
			if (vm.produto && vm.produto.link_youtube) {

				vm.produto.link_youtube = vm.produto.link_youtube.replace("watch?v=", "embed/")
				vm.produto.link_youtube = $sce.trustAsResourceUrl(vm.produto.link_youtube);
			}
			if (!vm.checkSlugs()) {
				//$state.go("/");
			}
			vm.produto.produtocor.forEach(function (elm, idx) {
				if (elm.destaque) {
					vm.cor = idx;
					$scope.maxColors = vm.produto.produtocor[idx].produtoimagem.length
				}
				elm.cor.idx = idx
				vm.cores.push(elm.cor)

				// elm.imagemprincipal = {};
				// elm.produtoimagem.forEach(function(value, i){
				// 	if(value.principal){
				// 		elm.imagemprincipal = value;
				// 		delete elm.produtoimagem[i];
				// 	}
				// });
			});
		}, function (err) {
			$state.go("/");
			console.log(err);
		});
	}
	vm.checkSlugs = () => {
		vm.produto.categoriaproduto.ambiente.nome = vm.produto.categoriaproduto.ambiente["nome_" + $scope.trslt]
		vm.produto.categoriaproduto.nome = vm.produto.categoriaproduto["nome_" + $scope.trslt]
		if ($stateParams.category != vm.produto.categoriaproduto.slug || $stateParams.ambient != vm.produto.categoriaproduto.ambiente.slug || $stateParams.slug != vm.produto.slug) {
			return false;
		}
		return true;
	}

	$scope.changeColor = function (value) {
		$scope.maxColors = vm.produto.produtocor[value.idx].produtoimagem.length

		// ISSO AQUI TÁ MUITO FEIO MAS É UMA SOLUÇÃO TEMPORÁRIA TÁ BOM DEPOIS EU ARRUMO
		while($scope.currentIDX > 0) {
			document.getElementsByClassName('swiper-button-prev')[0].click()
		}
		let cor_images = vm.produto.produtocor[value.idx].produtoimagem.length
		while(document.getElementsByClassName('swiper-pagination-bullet').length != cor_images) {
			let bar = document.getElementsByClassName('swiper-pagination-bullet')
			let bar_parent = document.getElementsByClassName('swiper-pagination-bullets')[0]
			if(bar.length > cor_images) {
				bar_parent.removeChild(bar[bar.length-1])

			} else {
				let node = document.createElement("span");
				node.className = 'swiper-pagination-bullet'
				bar_parent.appendChild(node)

			}
		}
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
	}).on('slideChange', function () {
		if (this.activeIndex + 1 >=$scope.maxColors) {
			document.getElementsByClassName('swiper-button-next')[0].classList.add('swiper-button-disabled')

		} else {
			document.getElementsByClassName('swiper-button-next')[0].classList.remove('swiper-button-disabled')

		}
		$scope.currentIDX = this.activeIndex
		$('span.init').text(`0${this.activeIndex + 1}`)
		let bar = document.getElementsByClassName('swiper-pagination-bullet')
		bar[this.activeIndex].classList.add('swiper-pagination-bullet-active')
		bar[this.activeIndex - 1].classList.remove('swiper-pagination-bullet-active')
		bar[this.activeIndex + 1].classList.remove('swiper-pagination-bullet-active')
	}), 300)
}
