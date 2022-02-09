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
	controller: ["$scope", "SeoService", "$location", ContactController]
}

function ContactController($scope, SeoService, $location) {

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

	var slug = $location.absUrl().split('?')[0];
	SeoService.generateTags({
		title: "Entre em contato por um de nossos canais de atendimento.",
		titleConcat: true,
		slug: slug,
		canonical: slug
	});
}