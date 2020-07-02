import './catalog-find.component.scss';

export const CatalogFindComponent = {
	options: {
		url: '/produtos',
		state: 'catalogFind',
		template: require("./catalog-find.component.html"),
		controller: CatalogFindController.name,
		controllerAs: "vm",
		authenticate: false
	},
	controller: ["$scope", "ngMeta", "MetaService", "$timeout", "HttpService", "$stateParams", CatalogFindController]
}

function CatalogFindController($scope, ngMeta, MetaService, $timeout, HttpService, $stateParams) {
	var vm = this
	vm.most_viewed = []

	vm.resultProd = true;

	$scope.currentLanguage = window.localStorage.getItem("NG_TRANSLATE_LANG_KEY") || "pt";

	HttpService.get("/resources/get-home-data/", {}, {}).then(function (resp) {
		vm.most_viewed = resp.data.most_viewed;
		
	});

	vm.width = window.innerWidth;

	vm.filter = {};

	vm.filter.ambiente = [];
	vm.filter.categoria = [];

	vm.filters = {};
	vm.products = [];

	vm.filter.lancamentos = false;
	vm.filter.offset = 0;
	$scope.tabSliders = {};
	
	if ($stateParams.busca && $stateParams.busca != "all"){
		vm.filter.busca = $stateParams.busca;
	}

	if ($stateParams.ambiente && $stateParams.ambiente != "all"){
		// vm.filter.ambiente = parseInt($stateParams.ambiente);
		vm.filter.ambiente.push($stateParams.ambiente)
	}

	if ($stateParams.tipo && $stateParams.tipo != "all"){
		vm.filter.categoria.push($stateParams.tipo);
	}

	HttpService.get("/produtos/get-atributos-busca/", {id: $stateParams.id}).then(function(resp){
		vm.filters = resp.data;
		vm.setSliders();
		vm.filters[0].forEach((elm) => {
			if ($scope.currentLanguage == "pt") {
				elm.nome = elm.nome_pt
			} else if ($scope.currentLanguage == "en") {
				elm.nome = elm.nome_us
			} else if ($scope.currentLanguage == "es") {
				elm.nome = elm.nome_es
			}
			elm.categoriaproduto.forEach(el => {
				if ($scope.currentLanguage == "pt") {
					el.nome = el.nome_pt
				} else if ($scope.currentLanguage == "en") {
					el.nome = el.nome_us
				} else if ($scope.currentLanguage == "es") {
					el.nome = el.nome_es
				}
			});
		})
		$timeout(function () {
			$scope.$broadcast('rzSliderForceRender');
			vm.filtrar();
		}, 1000);
	});
	
	vm.clickAmbiente = (uncheckAll) => {
		$('.type').slideUp();
		setTimeout(() => {
			vm.filtersTipo = [];
			if(vm.filter.ambiente.length > 0){
				$('.type').slideDown();
				vm.filters[0].forEach(element => {
					if(vm.filter.ambiente.includes(element.slug)){
						vm.filtersTipo = vm.filtersTipo.concat(element.categoriaproduto);
						$scope.$digest()
					}
				});
			}
		}, 100);
		
		if(uncheckAll){
			$('[name=optionsAmbiente]').prop('checked', false);
			$('.type').slideUp();
		}
	}

	vm.selectAllAmbiente = () => {
		if($("[name='optionsAmbiente']").is(":checked")){
			vm.filter.ambiente = vm.filters[0].map(function(idx) {
				return idx.id;
			});
			vm.clickAmbiente(false);
		} else {
			vm.filter.ambiente = [];
			vm.filter.categoria = [];
			$('.type').slideUp();
		}
	}

	vm.filtrar = function(){
		$(".list").fadeOut();
		$(".container-loader").show();
		vm.filter.largura = $scope.tabSliders.slider1;
		vm.filter.altura = $scope.tabSliders.slider2;
		vm.filter.profundidade = $scope.tabSliders.slider3;
		vm.filter.offset = 0;
		HttpService.post("/produtos/buscar/", vm.filter, {}).then(function(resp){
			$("html, body").animate({ scrollTop: 0 }, "slow");
			vm.products = resp.data;
			if (vm.products.length < 1){
				vm.resultProd = false;
			}
			setTimeout(function(){
				$(".container-loader").hide();
				$(".list, .more").fadeIn();
			}, 400);
		});
	}

	vm.loadMore = () => {
		vm.filter.offset += 10;
		$(".container-loader").fadeIn();
		HttpService.post("/produtos/buscar/", vm.filter, {}).then(function(resp){
			vm.products = vm.products.concat(resp.data);
			if (vm.products.length < 1){
				vm.resultProd = false;
			}
			setTimeout(function(){
				$(".container-loader").hide();
				$(".list, .more").fadeIn();
			}, 400);
		});
	}

	vm.setSliders = function(){
		let medidas = vm.filters[2][0];

		$scope.tabSliders = {
			slider1: {
				minValue: parseInt(medidas.largura_min),
				maxValue: parseInt(medidas.largura_max),
				options: {
					floor: parseInt(medidas.largura_min),
					ceil: parseInt(medidas.largura_max),
					step: 10,
					draggableRange: false,
					pushRange: false,
					translate: function (value, sliderId, label) {
						return value + 'mm';
					},
					minRange: parseInt(medidas.largura_min),
					maxRange: parseInt(medidas.largura_max)
				}
			},
			slider2: {
				minValue: parseInt(medidas.altura_min),
				maxValue: parseInt(medidas.altura_max),
				options: {
					floor: parseInt(medidas.altura_min),
					ceil: parseInt(medidas.altura_max),
					step: 10,
					draggableRange: false,
					pushRange: false,
					translate: function (value, sliderId, label) {
						return value + 'mm';
					},
					minRange: parseInt(medidas.altura_min),
					maxRange: parseInt(medidas.altura_max)
				}
			},
			slider3: {
				minValue: parseInt(medidas.profundidade_min),
				maxValue: parseInt(medidas.profundidade_max),
				options: {
					floor: parseInt(medidas.profundidade_min),
					ceil: parseInt(medidas.profundidade_max),
					step: 10,
					draggableRange: false,
					pushRange: false,
					translate: function (value, sliderId, label) {
						return value + 'mm';
					},
					minRange: parseInt(medidas.profundidade_min),
					maxRange: parseInt(medidas.profundidade_max)
				}
			}
		}
	}
}

export const CatalogFindAmbienteComponent = {
	options: {
		url: '/produtos/:ambiente',
		state: 'catalog-find-ambiente',
		template: require("./catalog-find.component.html"),
		controller: "CatalogFindController",
		controllerAs: "vm",
		authenticate: false
	}
}

export const CatalogFindTipoComponent = {
	options: {
		url: '/produtos/:ambiente/:tipo',
		state: 'catalog-find-tipo',
		template: require("./catalog-find.component.html"),
		controller: "CatalogFindController",
		controllerAs: "vm",
		authenticate: false
	}
}

export const CatalogFindBuscaComponent = {
	options: {
		url: '/produtos/:ambiente/:tipo/:busca',
		state: 'catalog-find-busca',
		template: require("./catalog-find.component.html"),
		controller: "CatalogFindController",
		controllerAs: "vm",
		authenticate: false
	}
}