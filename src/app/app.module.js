import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css'
import 'swiper/dist/css/swiper.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../styles.scss'

import 'ng-meta'
import 'angular-ui-router'
import 'angular-ui-mask';
import 'angular-sanitize'
import angular from 'angular'
import ngResource from 'angular-resource'
import Swiper from 'swiper/dist/js/swiper.js';
import * as $ from 'jquery'
import Swal from 'sweetalert2'
import moment from 'moment';

import Constants from './app.constants'

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { SubComponent } from './sub/sub.component'

import { NewsDiretive } from './newsletter/newsletter.diretive'
import { CatalogBlogDiretive } from './catalog-blog/catalog-blog.diretive'
import { CatalogProductDiretive } from './catalog-product/catalog-product.diretive'
import { FooterDiretive } from './footer/footer.diretive'
import { NavbarDiretive } from './navbar/navbar.diretive'

import MetaService from './services/meta.service'

const MODULE_IMPORTS = [
    ngResource,
    'ui.router',
    'ngMeta',
    'ui.mask',
    'ngSanitize'
]

const COMPONENTS_IMPORTS = [
    HomeComponent,
    SubComponent
]

const SERVICES_IMPORTS = [
    MetaService
]

const DIRETIVES_IMPORTS = [
    NewsDiretive,
    FooterDiretive,
    NavbarDiretive,
    CatalogBlogDiretive,
    CatalogProductDiretive
]

var app = angular.module(AppComponent.selector, MODULE_IMPORTS)

window.$ = $
window.Swal = Swal
window.Swiper = Swiper
window.moment = moment

app.component(AppComponent.selector, AppComponent)

app.constant("constants", Constants)

for (const SERVICE of SERVICES_IMPORTS)
    app.service(SERVICE.name, SERVICE.service)

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