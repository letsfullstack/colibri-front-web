import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css'
import 'swiper/dist/css/swiper.css'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import '../styles.scss'

import angular from 'angular'
import ngResource from 'angular-resource'
import ngMeta from 'ng-meta'
import uiRouter from 'angular-ui-router'
import Swiper from 'swiper/dist/js/swiper.js';
import * as $ from 'jquery'
import Swal from 'sweetalert2'
import moment from 'moment';
import uiMask from 'angular-ui-mask';

import { Constant } from './app.constants'

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'

import { MetaService } from './services/meta.service'

import { FooterDiretive } from './footer/footer.diretive'
import { NavbarDiretive } from './navbar/navbar.diretive'

const MODULE_IMPORTS = [
    ngResource,
    'ui.router',
    'ngMeta',
    'ui.mask'
]

const COMPONENTS_IMPORTS = [
    HomeComponent
]

const SERVICES_IMPORTS = [
    MetaService
]

const DIRETIVES_IMPORTS = [
    FooterDiretive,
    NavbarDiretive
]

var app = angular.module(AppComponent.selector, MODULE_IMPORTS)

window.$ = $
window.Swal = Swal
window.Swiper = Swiper
window.moment = moment

app.component(AppComponent.selector, AppComponent)

app.constant("constants", Constant)

for (const SERVICE of SERVICES_IMPORTS)
    app.service(SERVICE.name, SERVICE.function)

for (const COMPONENT of COMPONENTS_IMPORTS)
    app.controller(COMPONENT.options.controller, COMPONENT.controller)

for (const DIRETIVE of DIRETIVES_IMPORTS)
    app.directive(DIRETIVE.element, DIRETIVE.options)

app.config(($logProvider, $stateProvider, $urlRouterProvider, $locationProvider, ngMetaProvider) => {

    $urlRouterProvider.otherwise('/')

    for (const COMPONENT of COMPONENTS_IMPORTS)
        $stateProvider.state(COMPONENT.options.url, COMPONENT.options)

    $locationProvider.html5Mode(true)

    $logProvider.debugEnabled(true)
    
    ngMetaProvider.setDefaultTitle('Fallback Title');

    ngMetaProvider.useTitleSuffix(true)
    
    ngMetaProvider.setDefaultTitleSuffix(' | Best Website on the Internet!')

    ngMetaProvider.setDefaultTag('author', 'John Doe')
    
    window.moment.locale('pt-BR');

}).run(['ngMeta', ConstructorModule])

function ConstructorModule(ngMeta) {
    ngMeta.init();
}