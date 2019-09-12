export const AppComponent = {
    selector: 'root',
    template: require("./app.component.html"),
    controllerAs: 'main',
    controller: AppComponentController()
}

function AppComponentController() {
    console.log("asd")
}