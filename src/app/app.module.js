import angular from 'angular';
import ngResource from 'angular-resource';
import ngMeta from 'ng-meta';
import uiRouter from '@uirouter/angularjs';

import '../styles.scss';

import 'animate.css'

import { Constant } from './app.constants'

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'

import { MetaService } from './services/meta.service'

const MODULE_IMPORTS = [
    ngResource,
    uiRouter,
    'ngMeta'
]

const COMPONENTS_IMPORTS = [
    HomeComponent
]

const SERVICES_IMPORTS = [
    MetaService
]

var app = angular.module(AppComponent.selector, MODULE_IMPORTS)

app.component(AppComponent.selector, AppComponent)

for (const key in Constant) 
    app.constant(key, Constant[key])

for (const SERVICE of SERVICES_IMPORTS)
    app.service(SERVICE.name, SERVICE.function)

for (const COMPONENT of COMPONENTS_IMPORTS)
    app.controller(COMPONENT.options.controller, COMPONENT.controller)

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
}).run(['ngMeta', ConstructorModule])

function ConstructorModule(ngMeta) {
    ngMeta.init();
}