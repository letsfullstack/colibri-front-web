export const AppComponent = {
    selector: 'root',
    template: require("./app.component.html"),
    sass: require('./app.component.scss'),
    controllerAs: 'main',
    controller: ["$state",  AppComponentController]
}

function AppComponentController($state) {

    
}