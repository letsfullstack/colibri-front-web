import './product.component.scss';

export const ProductComponent = {
  options: {
    url: '/product',
    selector: 'product',
    template: require("./product.component.html"),
    controller: ProductController.name,
    controllerAs: "vm",
    authenticate: false
  },
  controller: ["$scope", "ngMeta", ProductController]
}

function ProductController($scope, ngMeta) {
  var vm = this

  vm.products = [
    { name : "Bancada", location : "Astúrias", img : "https://w1.ezcdn.com.br/abouthome/fotos/grande/9922fg1/bancada-gourmet-dobravel-para-cozinha-bliv-castanho-e-branco.jpg" },
    { name : "Home Suspenso", location : "Salinas", img : "https://a-static.mlcdn.com.br/618x463/painel-home-suspenso-greco-para-tv-ate-65-polegadas-dj-moveis/trilar/6789/6165500bbde2ade854012b7af006b5ae.jpg" },
    { name : "Roupeiro", location : "Recife", img : "https://moveissimonetti.vteximg.com.br/arquivos/ids/7378918-1000-1000/56665.jpg?v=636582783658400000" },
    { name : "Bancada", location : "Ilhabela", img : "https://w1.ezcdn.com.br/abouthome/fotos/grande/9922fg1/bancada-gourmet-dobravel-para-cozinha-bliv-castanho-e-branco.jpg" },
  ]

  vm.colors = [
    { color : "#724040" },
    { color : "#d2c4b8" },
    { color : "#b3a37f" },
    { color : "#eaeaea" }
  ]
  
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