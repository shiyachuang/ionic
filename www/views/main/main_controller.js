angular.module('myApp.main_controller', ["ionic"])

.controller('mainController',function($scope,Lists,$state,ENV){
	 console.log(ENV.api);
	$scope.lists=Lists.all();
	$scope.Padlists=Lists.PadAll();
	$scope.Routelists=Lists.RouteAll();
	$scope.Peijianlists=Lists.PeijianAll();
 	
 	$scope.listDetailsClick = function (listdata) {  
        //将对象转化为字符串  
        var listDataAll = angular.toJson(listdata); 
        console.log(listDataAll);
        $state.go("tab.mdetail", {id:listDataAll});  

      };  


 })