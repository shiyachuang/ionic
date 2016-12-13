/**
 * Created by htzhanglong on 2015/8/30.
 */
/**
 * Created by htzhanglong on 2015/8/2.
 */
var directiveMod=angular.module("myApp.directive", []);


directiveMod.directive('hideTabs',function($rootScope){
    return {
        restrict:'AE',
        link:function($scope){
            $rootScope.hideTabs = 'tabs-item-hide';
            $scope.$on('$destroy',function(){
                $rootScope.hideTabs = '';
            })
        }
  }

    // return {
    //   restrict: 'A',
    //   link: function (scope, element, attributes) {
    //     scope.$on('$ionicView.beforeEnter', function () {
    //       scope.$watch(attributes.hideTabs, function (value) {
    //         $rootScope.hideTabs = value;
    //       });
    //     });
    //     scope.$on('$ionicView.beforeLeave', function () {
    //       $rootScope.hideTabs = false;
    //     });
    //   }
    // };

   })


