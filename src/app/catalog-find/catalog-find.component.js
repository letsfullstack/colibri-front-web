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
  controller: ["$scope", "ngMeta", "MetaService", "$timeout", CatalogFindController]
}

function CatalogFindController($scope, ngMeta, MetaService, $timeout) {
  var vm = this

  vm.width = window.innerWidth

  $timeout(function () {
    $scope.$broadcast('rzSliderForceRender');
  }, 1000);

  vm.colors = [
    { color: "#724040" },
    { color: "#d2c4b8" },
    { color: "#b3a37f" },
    { color: "#eaeaea" },
    { color: "#341515" },
    { color: "#9b9086" },
    { color: "#d7ba77" },
    { color: "#c9bebe" }
  ]
  $scope.tabSliders = {
    slider1: {
      minValue: 100,
      maxValue: 2000,
      options: {
        floor: 100,
        ceil: 2000,
        draggableRange: true,
        translate: function (value, sliderId, label) {
          return value + 'mm';
        }
      }
    },
    slider2: {
      minValue: 100,
      maxValue: 2000,
      options: {
        floor: 100,
        ceil: 2000,
        draggableRange: true,
        translate: function (value, sliderId, label) {
          return value + 'mm';
        }
      }
    },
    slider3: {
      minValue: 100,
      maxValue: 2000,
      options: {
        floor: 100,
        ceil: 2000,
        draggableRange: true,
        translate: function (value, sliderId, label) {
          return value + 'mm';
        }
      }
    }
  }
}