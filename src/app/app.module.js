import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css'
import 'swiper/dist/css/swiper.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../styles.scss'

import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/js/bootstrap.bundle';

import 'ng-meta'
import 'angular-ui-router'
import 'angular-ui-mask';
import 'angular-sanitize'
import 'angular-cookies';
import angular from 'angular'
import ngResource from 'angular-resource'
import Swiper from 'swiper/dist/js/swiper.js';

import * as $ from 'jquery'
import Swal from 'sweetalert2'
import moment from 'moment';
import slider from 'angularjs-slider';
import 'bootstrap';
import 'angular-translate';
import 'angular-translate-storage-cookie';
import 'angular-translate-storage-local';

import 'swangular';

import TranslateFilePT from "../translate/pt.json"
import TranslateFileES from "../translate/es.json"
import TranslateFileEN from "../translate/en.json"

import { HttpWebService } from './services/http.service'

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { SubComponent } from './sub/sub.component'
import { ContactComponent } from './contact/contact.component'
import { CatalogFindComponent } from './catalog-find/catalog-find.component'
import { ProductComponent } from './product/product.component'
import { ModalContatoComponent } from './modals/contato/contato.component'
import { ModalLeadComponent } from './modals/lead/lead.component'

import Constants from './app.constants'

import { NewsDiretive } from './newsletter/newsletter.diretive'
import { CatalogBlogDiretive } from './catalog-blog/catalog-blog.diretive'
import { CatalogProductDiretive } from './catalog-product/catalog-product.diretive'
import { FooterDiretive } from './footer/footer.diretive'
import { NavbarDiretive } from './navbar/navbar.diretive'
import { PhraseDiretive } from './phrase/phrase.diretive'

import MetaService from './services/meta.service'

const MODULE_IMPORTS = [
    ngResource,
    slider,
    'ui.router',
    'ngCookies',
    'ngMeta',
    'ui.mask',
    'ngSanitize',
    'pascalprecht.translate',
    'swangular'
]

const COMPONENTS_IMPORTS = [
    HomeComponent,
    SubComponent,
    ContactComponent,
    CatalogFindComponent,
    ProductComponent,
    ModalContatoComponent,
    ModalLeadComponent
]

const SERVICES_IMPORTS = [
    MetaService,
    HttpWebService
]

const DIRETIVES_IMPORTS = [
    NewsDiretive,
    FooterDiretive,
    NavbarDiretive,
    PhraseDiretive,
    CatalogBlogDiretive,
    CatalogProductDiretive
]

// angular.module('yourApp', [])

var app = angular.module(AppComponent.selector, MODULE_IMPORTS)

window.$ = $
window.Swal = Swal
window.swal = Swal
window.Swiper = Swiper
window.moment = moment

app.component(AppComponent.selector, AppComponent)

app.constant("constants", Constants)


for (const SERVICE of SERVICES_IMPORTS)
    app.service(SERVICE.name, SERVICE.function)

// for (const COMPONENT of COMPONENTS_IMPORTS)
//     app.controller(COMPONENT.options.controller, COMPONENT.controller)

for (const COMPONENT of COMPONENTS_IMPORTS) {
    if (COMPONENT.controller) {
        app.controller(COMPONENT.options.controller, COMPONENT.controller)
    }
}

for (const DIRETIVE of DIRETIVES_IMPORTS)
    app.directive(DIRETIVE.element, DIRETIVE.options)

app.config(($logProvider, $stateProvider, $urlRouterProvider, $locationProvider, ngMetaProvider, $translateProvider) => {

    $urlRouterProvider.otherwise('/')

    for (const COMPONENT of COMPONENTS_IMPORTS)
        if (COMPONENT.options.state) $stateProvider.state(COMPONENT.options.state, COMPONENT.options)
        
    $locationProvider.html5Mode(true)

    $logProvider.debugEnabled(true)

    ngMetaProvider.setDefaultTitle('Colibri');

    ngMetaProvider.useTitleSuffix(true)

    // ngMetaProvider.setDefaultTitleSuffix(' | Best Website on the Internet!')

    ngMetaProvider.setDefaultTag('author', 'Lets Comunicação')

    window.moment.locale('pt-BR');

    $translateProvider.translations('en', TranslateFileEN);
    $translateProvider.translations('es', TranslateFileES);
    $translateProvider.translations('pt', TranslateFilePT);

    $translateProvider.preferredLanguage('pt');
    $translateProvider.useLocalStorage();

}).run(['ngMeta', '$transitions', 'constants', '$rootScope', 'swangular', ConstructorModule])

function ConstructorModule(ngMeta, $transitions, constants, $rootScope, swangular) {
    $rootScope.getCurrentEnvironment = () => {
        if (ENV === "development") {
            return constants.dev;
        } else if (ENV === "production") {
            return constants.production;
        }
    }

    $rootScope.SERVER_URL = $rootScope.getCurrentEnvironment().SERVER_URL;

    ngMeta.init();

    $transitions.onSuccess({}, (s) => {
        s.promise.then(res => setTimeout(() => {
            window.scrollTo(0, 0)
            if (res.name === '/') {
                $('navbar-diretive').removeClass('invert')
                $("main").css("margin-top", "0px")
                $(window).scroll(function () {
                    if ($(this).scrollTop() > 200)
                        $('navbar-diretive').addClass('invert')
                    else
                        $('navbar-diretive').removeClass('invert')
                })
            }
            else if (res.name !== '/' && res.name !== '') {
                $(window).off("scroll")
                $('navbar-diretive').addClass('invert')
                $("main").css("margin-top", "90px")
            }
            $("body, main").css({ "opacity": "1", "overflow": "auto", "transition": "opacity 300ms" })
        }, 500))
    })

    $transitions.onExit({}, () => {
        $("main").css({ "opacity": "0", "overflow": "hide", "transition": "none" })
    })

    $rootScope.modalContato = () => {
        swangular.open({
            html: require("./modals/contato/contato.component.html"),
            controller: 'ModalContatoController',
            showConfirmButton: false,
            showCloseButton: true,
            customClass: "swal-modal-contato",
            animation: true
        });
    }
    $rootScope.modalLead = () => {
        swangular.open({
            html: require("./modals/lead/lead.component.html"),
            controller: 'ModalLeadController',
            showConfirmButton: false,
            showCloseButton: true,
            customClass: "swal-modal-lead",
            animation: true
        });
    }
}