angular.module('myApp.detail_controller', ["ionic"])

.controller('detailController',function($scope,$stateParams,$ionicSlideBoxDelegate,Lists) {
	$scope.show = function(subModalIndex){
	  $scope.tab = subModalIndex;
	  if ($scope.tab==5) {
	  	$scope.tab1==100;
	  }else{
	  	$scope.tab1==101;
	  }
	};
	$scope.show(5);
	  //将字符串转化为对象
	$scope.list = angular.fromJson($stateParams.id);  
	$scope.imgList=$scope.list.imgList; 
	console.log($scope.list)
})



.controller('mdetailController',function($scope,$stateParams,$ionicSlideBoxDelegate,Lists) {
	$scope.show = function(subModalIndex){
	  $scope.tab = subModalIndex;
	  if ($scope.tab==5) {
	  	$scope.tab1==100;
	  }else{
	  	$scope.tab1==101;
	  }
	};
	$scope.show(5);
	//将字符串转化为对象
	$scope.list = angular.fromJson($stateParams.id); 
	$scope.imgList=$scope.list.imgList; 
	console.log($scope.list)

})
