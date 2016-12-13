angular.module('myApp.cart_controller', ["ionic"])

.controller('cartController',function($scope,$stateParams,$rootScope,ENV,ArticleFactory,$ionicModal,threadPostFactory,Storage){

        $ionicModal.fromTemplateUrl('views/cart/newTopic.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.newTopicModal = modal;
        });

        $scope.showNewTopicModal = function() {

            // track view
            $scope.newTopicModal.show();
        };

        // close new topic modal
        $scope.closeNewTopicModal = function() {
            $scope.newTopicModal.hide();
        };




         $scope.name='ArticleCtrl';
        $scope.ENV=ENV;


        $scope.showloading=true;

        //获取服务器数据保存
        ArticleFactory.getTopTopics();
        //接收到刚才传过来的通知
        $scope.$on('PortalList.portalsUpdated', function() {
            $scope.portalListData=ArticleFactory.getArticles();


//            var timer = $timeout(  function() {
//                $scope.$broadcast('scroll.infiniteScrollComplete');
//            },  2000 );

            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.showloading=false;

            // 停止广播ion-refresher
         });


        //下拉更新
        $scope.doRefresh=function(){
            ArticleFactory.getTopTopics();
            $scope.$broadcast('scroll.refreshComplete');
        }

     //上拉更新
        $scope.loadMore=function(){

            console.log('加载更多数据');
            ArticleFactory.getMoreTopics();

        }


        $scope.hasNextPage = function() {
            //console.log(PortalsFactory.hasNextPage());
            return ArticleFactory.hasNextPage();
        };

        $scope.changeTab=function(cateid,index){
            var a=document.getElementById('sub_header_list').getElementsByTagName('a');
            for (var i = 0; i < 4; i++) {
                console.log(a[i].className);
                a[i].className = "button button-clear ";
            }
            //鎶婄偣鍑荤殑閭ｄ釜鏄剧ず鍑烘潵
            a[index].className = "button button-clear sub_button_select";
            //数据请求
            ArticleFactory.setArticleCateId(cateid);

        }

 })
.controller('content1Controller',function($scope,$rootScope,$stateParams,ArticleContentFactory){
        var aid=$stateParams['id'];
        console.log(aid);

        $scope.showloading=true;

        ArticleContentFactory.get(aid);
        $scope.$on('NewsContent.newsUpdated', function() {
            $scope.NewsContentData=ArticleContentFactory.getArticle();

            $scope.showloading=false;
            // 停止广播ion-refresher
        });


        $rootScope.hideTabs='tabs-item-hide';

        //页面刚加载
        $scope.$on('$ionicView.beforeEnter', function() {
            // get user settings
            //
            console.log('beforeEnter');

        });


//加载完成
        $scope.$on('$ionicView.afterEnter', function() {
            // get user settings
            console.log('afterEnter');

        });


        //页面销毁
        // $scope.$on('$destroy',function(){
        //     console.log('$destroy');
        //     $rootScope.hideTabs = '';
        // })
        $scope.$on('$ionicView.beforeLeave', function () {
          $rootScope.hideTabs = false;
        });


})