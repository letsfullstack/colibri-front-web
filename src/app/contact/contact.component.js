import './contact.component.scss';

export const ContactComponent = {
  options: {
    url: '/contato',
    state: 'contact',
    template: require("./contact.component.html"),
    controller: ContactController.name,
    controllerAs: "vm",
    authenticate: false
  },
  controller: ["$scope", "ngMeta", "MetaService", ContactController]
}

function ContactController($scope, ngMeta, MetaService) {


  $scope.showChat = () => {
    zE('webWidget', 'open');
  }

  // var map, marker, myLatLng = { lat: -23.4583392, lng: -51.426856 };

  // (function initMap() {
  //   map = new google.maps.Map(document.getElementById('maps'), {
  //     center: myLatLng,
  //     zoom: 19
  //   });

  //   marker = new google.maps.Marker({
  //     position: myLatLng,
  //     map: map
  //   });
  // })()
}