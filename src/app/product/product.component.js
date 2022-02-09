import './product.component.scss';

export const ProductComponent = {
	options: {
		url: '/produtos/:ambient/:category/:id/:slug',
		state: 'product',
		template: require("./product.component.html"),
		controller: ProductController.name,
		controllerAs: "vm",
		authenticate: false,
		resolve:{
			data:["$q", "$stateParams", "HttpService", function($q, $stateParams, HttpService){
				var deffered = $q.defer();

				HttpService.get("/produtos/get-produto/", { id: $stateParams.id }).then(function (response) {
					deffered.resolve(response.data.data);
				},function (err) {
					deffered.resolve()
				});

				return deffered.promise;
			}]
		}
	},
	controller: ["$scope", "$rootScope", "$location", "SeoService", "$stateParams", "$sce", "data", ProductController]
}

function ProductController($scope, $rootScope, $location, SeoService, $stateParams, $sce, data) {
	var vm = this;

	vm.produto = data.produto; 
	vm.produtos_relacionados = data.relacionados;
	vm.cor = null;
	vm.cores = [];
	$scope.maxColors = 0;
	$scope.currentIDX = 0;
	$scope.trslt = window.localStorage.getItem("NG_TRANSLATE_LANG_KEY") || "pt";
	$scope.trslt = $scope.trslt == 'en' ? 'us' : $scope.trslt

	if (vm.produto && vm.produto.link_youtube) {

		vm.produto.link_youtube = vm.produto.link_youtube.replace("watch?v=", "embed/")
		vm.produto.link_youtube = $sce.trustAsResourceUrl(vm.produto.link_youtube);
	}

	vm.checkSlugs = () => {
		vm.produto.categoriaproduto.ambiente.nome = vm.produto.categoriaproduto.ambiente["nome_" + $scope.trslt]
		vm.produto.categoriaproduto.nome = vm.produto.categoriaproduto["nome_" + $scope.trslt]
		if ($stateParams.category != vm.produto.categoriaproduto.slug || $stateParams.ambient != vm.produto.categoriaproduto.ambiente.slug || $stateParams.slug != vm.produto.slug) {
			return false;
		}
		return true;
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
	});

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
	}), 300);

	var slug = $location.absUrl().split('?')[0];
	SeoService.generateTags({
		title: vm.produto.nome,
		description:vm.produto.descricao,
		image:$rootScope.STORAGE_URL+vm.produto.imagem_capa,
		slug: slug,
		canonical: slug
	}); 


}
