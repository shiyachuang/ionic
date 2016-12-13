// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('myApp', ['ionic','myApp.controllers',
    'myApp.config',
    'myApp.services','myApp.directive','ngResource',
    'myApp.main_controller','myApp.cart_controller',
    'myApp.fenlei_controller','myApp.my_controller',
    "myApp.detail_controller",
    // 服务控制器
    'myApp.detailList'
  ])

.run(function($ionicPlatform,$rootScope,$ionicHistory,$state,$http,$ionicPopup,$location) {
  $ionicPlatform.ready(function($ionicPlatform,$rootScope,$ionicHistory,$state,$http,$ionicPopup,$location) {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
        //主页面显示退出提示框
  $ionicPlatform.registerBackButtonAction(function (e) {

       e.preventDefault();
      function showConfirm() {
          var confirmPopup = $ionicPopup.confirm({
              title: '<strong>退出应用<strong>',
              template: '你确定要退出菠菜商城吗?',
              okText: '退出',
              cancelText: '取消'
          });

          confirmPopup.then(function (res) {
              if (res) {
                  ionic.Platform.exitApp();
              } else {
                  // Don't close
              }
          });
      }
      if ($location.path() == '/tab/main' ) {
          showConfirm();
      }
      else if ($ionicHistory.backView() ) {
          $ionicHistory.goBack();
         } else {
           showConfirm();
         }
      return false;
  }, 101);
})

.directive('hideTabs', function ($rootScope) {
    return {
      restrict: 'A',
      link: function (scope, element, attributes) {
        scope.$on('$ionicView.beforeEnter', function () {
          scope.$watch(attributes.hideTabs, function (value) {
            $rootScope.hideTabs = value;
          });
        });
        scope.$on('$ionicView.beforeLeave', function () {
          $rootScope.hideTabs = false;
        });
      }
    };
  })

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

$ionicConfigProvider.platform.ios.tabs.style('standard'); 
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center'); 
  $ionicConfigProvider.platform.android.navBar.alignTitle('left');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-ios-arrow-left');        

  $ionicConfigProvider.platform.ios.views.transition('ios'); 
  $ionicConfigProvider.platform.android.views.transition('android');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract:true,
    templateUrl: "views/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.main', {
    url: '/main',
    views:{
        'tab-main':{
            templateUrl: "views/main/main.html",
            controller:'mainController'
        }
    }
  })
  .state('tab.fenlei', {
    url: '/fenlei',
    views:{
        'tab-fenlei':{
            templateUrl: "views/fenlei/fenlei.html",
            controller:'fenleiController'
        }
    }
  })
 
  .state('tab.cart', {
    url: '/cart',
    views:{
        'tab-cart':{
            templateUrl: "views/cart/cart.html",
            controller:'cartController'
        }
    }
  })
  .state('tab.my', {
    url: '/my',
    views:{
        'tab-my':{
            templateUrl: "views/my/my.html",
            controller:'myController'
        }
    }
  })
  .state('tab.content1', {
      url: '/content1/:id',
      views:{
          'tab-cart':{
              templateUrl: "views/cart/tab-content1.html",
              controller:'content1Controller'
          }
      }

  })
  .state('tab.detail', {
      url: '/detail/:id',
      views:{
          'tab-fenlei':{
              templateUrl: "views/detail/detail.html",
              controller:'detailController'
          }
      }
  })
   .state('tab.mdetail', {
      url: '/mdetail/:id',
      views:{
          'tab-main':{
              templateUrl: "views/detail/detail.html",
              controller:'mdetailController'

          }
      }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/main');

});
