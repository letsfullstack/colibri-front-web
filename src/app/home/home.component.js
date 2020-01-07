import './home.component.scss';

export const HomeComponent = {
  options: {
    url: '/',
    selector: 'home',
    template: require("./home.component.html"),
    controller: HomeController.name,
    controllerAs: "vm",
    authenticate: false
  },
  controller: ["$scope", "ngMeta", "MetaService", HomeController]
}

function HomeController($scope, ngMeta, MetaService) {
  var vm = this

  vm.products = [
    { name: "Bancada", location: "Astúrias", img: "https://w1.ezcdn.com.br/abouthome/fotos/grande/9922fg1/bancada-gourmet-dobravel-para-cozinha-bliv-castanho-e-branco.jpg" },
    { name: "Home Suspenso", location: "Salinas", img: "https://a-static.mlcdn.com.br/618x463/painel-home-suspenso-greco-para-tv-ate-65-polegadas-dj-moveis/trilar/6789/6165500bbde2ade854012b7af006b5ae.jpg" },
    { name: "Roupeiro", location: "Recife", img: "https://moveissimonetti.vteximg.com.br/arquivos/ids/7378918-1000-1000/56665.jpg?v=636582783658400000" },
    { name: "Bancada", location: "Ilhabela", img: "https://w1.ezcdn.com.br/abouthome/fotos/grande/9922fg1/bancada-gourmet-dobravel-para-cozinha-bliv-castanho-e-branco.jpg" },
    { name: "Bancada", location: "Recife", img: "https://w1.ezcdn.com.br/abouthome/fotos/grande/9922fg1/bancada-gourmet-dobravel-para-cozinha-bliv-castanho-e-branco.jpg" },
    { name: "Home Suspenso", location: "Ilhabela", img: "https://a-static.mlcdn.com.br/618x463/painel-home-suspenso-greco-para-tv-ate-65-polegadas-dj-moveis/trilar/6789/6165500bbde2ade854012b7af006b5ae.jpg" },
    { name: "Roupeiro", location: "Astúrias", img: "https://moveissimonetti.vteximg.com.br/arquivos/ids/7378918-1000-1000/56665.jpg?v=636582783658400000" },
    { name: "Bancada", location: "Salinas", img: "https://w1.ezcdn.com.br/abouthome/fotos/grande/9922fg1/bancada-gourmet-dobravel-para-cozinha-bliv-castanho-e-branco.jpg" },
  ]

  setTimeout(() => new Swiper('.banner .swiper-container', {
    slidesPerView: 1,
    pagination: {
      el: '.banner .swiper-pagination',
      type: 'bullets',
    }
  }).on('slideChange', function () { $('span.init').text(`0${this.activeIndex + 1}`) }), 300)

}