/**
 * Created by viv on २८-०८-२०१६.
 */
    var angular = require('angular');




var uirouter = require('angular-ui-router');
var gulpApp = angular.module('gulpApp',['ui.router']);

gulpApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    var mainCtr = require('./mainController');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            template: require('../views/home.html'),
            controller:mainCtr
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit
        });

});