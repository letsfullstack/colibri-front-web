import './contact.component.scss';

export const ContactComponent = {
  options: {
    url: '/contact',
    selector: 'contact',
    template: require("./contact.component.html"),
    controller: ContactController.name,
    controllerAs: "vm",
    authenticate: false
  },
  controller: ["$scope", "ngMeta", "MetaService", ContactController]
}

function ContactController($scope, ngMeta, MetaService) {

}