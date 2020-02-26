import './catalog-find.component.scss';

export const CatalogFindComponent = {
	options: {
		url: '/catalog',
		selector: 'catalogFind',
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
	vm.filter.lancamentos = false;

	vm.filters = {};
	vm.ambienteSelected = null;

	$scope.tabSliders = {};

	HttpService.get("/produtos/get-atributos-busca/", {id: $stateParams.id}).then(function(resp){
		vm.filters = resp.data;

		vm.setSliders();
		
		$timeout(function () {
			$scope.$broadcast('rzSliderForceRender');
		}, 1000);
	});
	

	$scope.$watch('vm.ambienteSelected', function(newValue, oldValue) {
		//console.log(newValue);
	});

	vm.setIdxAmbiente = function(idx){
		vm.ambienteSelected = idx;
	}

	vm.filtrar = function(){
		console.log(vm.filter);
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