import './catalog-find.component.scss';

export const CatalogFindComponent = {
	options: {
		url: '/produtos/:ambiente/:tipo',
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

	vm.width = window.innerWidth;

	vm.filter = {};
	vm.filters = {};
	vm.products = [];

	vm.filter.lancamentos = false;
	vm.ambienteSelected = null;
	vm.filter.offset = 0;
	$scope.tabSliders = {};
	
	if ($stateParams.ambiente != "all"){
		vm.filter.ambiente = parseInt($stateParams.ambiente);
	}

	if ($stateParams.tipo != "all"){
		vm.filter.categoria = parseInt($stateParams.tipo);
	}

	$scope.$watch("vm.filter.ambiente", function(newValue, oldValue){
		if(newValue <= -1){
			vm.filter.categoria = null;
		}
	});

	HttpService.get("/produtos/get-atributos-busca/", {id: $stateParams.id}).then(function(resp){
		vm.filters = resp.data;
		vm.setSliders();

		$timeout(function () {
			$scope.$broadcast('rzSliderForceRender');
			vm.filtrar();
		}, 1000);
	});
	
	vm.setIdxAmbiente = function(idx){
		vm.ambienteSelected = idx;
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
			debugger
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
					draggableRange: true,
					translate: function (value, sliderId, label) {
						return value + 'mm';
					}
				}
			},
			slider2: {
				minValue: parseInt(medidas.altura_min),
				maxValue: parseInt(medidas.altura_max),
				options: {
					floor: parseInt(medidas.altura_min),
					ceil: parseInt(medidas.altura_max),
					draggableRange: true,
					translate: function (value, sliderId, label) {
						return value + 'mm';
					}
				}
			},
			slider3: {
				minValue: parseInt(medidas.profundidade_min),
				maxValue: parseInt(medidas.profundidade_max),
				options: {
					floor: parseInt(medidas.profundidade_min),
					ceil: parseInt(medidas.profundidade_max),
					draggableRange: true,
					translate: function (value, sliderId, label) {
						return value + 'mm';
					}
				}
			}
		}
	}
}