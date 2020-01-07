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
  controller: ["$scope", "ngMeta", "MetaService", CatalogFindController]
}

function CatalogFindController($scope, ngMeta, MetaService) {
  var vm = this

  vm.width = window.innerWidth
  
  vm.colors = [
    { color : "#724040" },
    { color : "#d2c4b8" },
    { color : "#b3a37f" },
    { color : "#eaeaea" },
    { color : "#341515" },
    { color : "#9b9086" },
    { color : "#d7ba77" },
    { color : "#c9bebe" }
  ]
}