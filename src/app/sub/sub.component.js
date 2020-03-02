import './sub.component.scss';

export const SubComponent = {
  options: {
    url: '/sub',
    state: 'sub',
    template: require("./sub.component.html"),
    controller: SubController.name,
    controllerAs: "vm",
    authenticate: false
  },
  controller: ["$scope", "ngMeta", "MetaService", SubController]
}

function SubController($scope, ngMeta, MetaService) {
  var vm = this

  $scope.home = "HOME"

  vm.products = [
    { name: "Bancada", location: "Astúrias", img: "https://w1.ezcdn.com.br/abouthome/fotos/grande/9922fg1/bancada-gourmet-dobravel-para-cozinha-bliv-castanho-e-branco.jpg" },
    { name: "Home Suspenso", location: "Salinas", img: "https://a-static.mlcdn.com.br/618x463/painel-home-suspenso-greco-para-tv-ate-65-polegadas-dj-moveis/trilar/6789/6165500bbde2ade854012b7af006b5ae.jpg" },
    { name: "Roupeiro", location: "Recife", img: "https://moveissimonetti.vteximg.com.br/arquivos/ids/7378918-1000-1000/56665.jpg?v=636582783658400000" },
    { name: "Bancada", location: "Ilhabela", img: "https://w1.ezcdn.com.br/abouthome/fotos/grande/9922fg1/bancada-gourmet-dobravel-para-cozinha-bliv-castanho-e-branco.jpg" }
  ]

  $(document).ready(() => {
    new Swiper('.products .mid .swiper-container')
  })
}