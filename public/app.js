
require('angular');
require('angular-ui-router');
require('./services/ng-map.min.js');

var gulpApp = angular.module('gulpApp',['ui.router','ngMap'])
    .service('loadData', require('./services/loadData.js'));


gulpApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    var mainCtr = require('./components/mainController');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            params:{
                name:'',
                index:''
            },
            resolve: {
              $fourSquareData: [ '$stateParams', 'loadData', function ($stateParams, loadData) {
                    $stateParams.name = $stateParams.name == '' ? 'montreal' : $stateParams.name;
                    return  loadData.retrieveFourSquare($stateParams.name);
                }]/*,
                $yelpData: [ '$stateParams', 'loadData', function ($stateParams, loadData) {
                    $stateParams.name = $stateParams.name == '' ? 'montreal' : $stateParams.name;
                    var index = $stateParams.index == '' ? 0 : $stateParams.index;
                    var callbackId = 'angular.callbacks._'+ index.toString();
                    return  loadData.retrieveYelp($stateParams.name,callbackId);
                }]*/
            },
            template: require('./components/home.html'),
            controller:mainCtr
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit
        });

});