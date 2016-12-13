angular.module('myApp.fenlei_controller', ["ionic"])

.controller('fenleiController',function($scope,$http,$stateParams,$ionicSlideBoxDelegate,Lists,$state) {
  $scope.show = function(subModalIndex){
    if(subModalIndex==1){
        $scope.isOne = true;
        $scope.isTwo = false;
        $scope.isThree= false;
        $scope.isFive=false;
        $scope.isFour=false;
    }else if(subModalIndex==2){
        $scope.isOne = false;
        $scope.isTwo = true;
         $scope.isThree= false;
        $scope.isFive=false;
        $scope.isFour=false;
    }
    else if(subModalIndex==3){
        $scope.isOne = false;
        $scope.isTwo = false;
         $scope.isThree= true;
        $scope.isFive=false;
        $scope.isFour=false;
    }
     else if(subModalIndex==4){
        $scope.isOne = false;
        $scope.isTwo = false;
         $scope.isThree= false;
        $scope.isFour=true;
        $scope.isFive=false;
    }else{
       $scope.isOne = false;
        $scope.isTwo = false;
         $scope.isThree= false;
        $scope.isFour=false;
        $scope.isFive=true;
    }
    $scope.tab = subModalIndex;
    };
    $scope.show(1);
    $scope.lists=Lists.all();
    $scope.Padlists=Lists.PadAll();
    $scope.Routelists=Lists.RouteAll();
    $scope.Peijianlists=Lists.PeijianAll();
    $scope.ceshi=Lists.ceshi().success(function(data){
            console.log(data);

        }).error(function(){
            alert('shibai ');
        });
    // console.log($scope.ceshi);

    var url="http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1&callback=JSON_CALLBACK";
    $http.jsonp(url).success(function(data){
      $scope.dataList=data;
          console.log($scope.dataList);
    })

  $scope.listDetailsClick = function (listdata) {  
        //将对象转化为字符串  
        var listDataAll = angular.toJson(listdata); 
        $state.go("tab.detail", {id:listDataAll});  

      };  


  })