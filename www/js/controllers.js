/**
 * Created by htzhanglong on 2015/8/2.
 */
angular.module('myApp.controllers', [])

    .controller('HomeCtrl', function($scope,ENV) {

        console.log(ENV.api);

        $scope.name='HomeCtrl';
    })

    //ArticleCtrl

    .controller('ArticleCtrl', function($scope,ArticleFactory,ENV,$timeout) {
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
            for (var i = 0; i < 8; i++) {
                a[i].className = "button button-clear ";
            }
            //鎶婄偣鍑荤殑閭ｄ釜鏄剧ず鍑烘潵
            a[index].className = "button button-clear sub_button_select";
            //数据请求
            ArticleFactory.setArticleCateId(cateid);

        }

    })
    //文章详情
    .controller('NewsContentCtrl', function($scope,$rootScope,$stateParams,ArticleContentFactory) {

        var aid=$stateParams['aid'];

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
        $scope.$on('$destroy',function(){
            console.log('$destroy');
            $rootScope.hideTabs = '';
        })


    })


    //帖子列表
    .controller('ThreadCtrl', function($scope,$rootScope,ENV,ThreadListFactory,$ionicModal,threadPostFactory,Storage) {
        $scope.showloading=true;
        $scope.ENV=ENV;
        // 获取数据
        ThreadListFactory.fetchTopThreadList();


        $scope.$on('ThreadList.threadsUpdated', function() {
            //console.log( ThreadListFactory.getThreads());
            // $timeout(function() {
            $scope.threadlListData = ThreadListFactory.getThreads();
            $scope.showloading=false

            // }, 100);
        });

        $scope.doRefresh = function() {
            ThreadListFactory.fetchTopThreadList();
            $scope.$broadcast('scroll.refreshComplete');
        };

        $scope.loadMore = function() {
            // console.log("loadMore");
            ThreadListFactory.increaseNewThreads();
            $scope.$broadcast('scroll.infiniteScrollComplete');

        };
        $scope.moreDataCanBeLoaded = function() {
            //console.log(PortalsFactory.hasNextPage());
            return ThreadListFactory.hasNextPage();
        };

        //


        $ionicModal.fromTemplateUrl('templates/thread/newTopic.html', {
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




        //发表帖子


        $scope.newTopicData={
            title:'',
            content:''
        }
        $scope.saveNewTopic=function(){

            var storageKey='user';
            if(Storage.get(storageKey)&&Storage.get(storageKey).username!=''){

                $scope.userInfo=Storage.get(storageKey);

                $scope.newTopicModal.hide();

                var fid=58;


                var md5=function(s){function L(k,d){return(k<<d)|(k>>>(32-d));}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H);}if(I|d){if(x&1073741824){return(x^3221225472^F^H);}else{return(x^1073741824^F^H);}}else{return(x^F^H);}}function r(d,F,k){return(d&F)|((~d)&k);}function q(d,F,k){return(d&k)|(F&(~k));}function p(d,F,k){return(d^F^k);}function n(d,F,k){return(F^(d|(~k)));}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F);}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F);}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F);}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F);}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]|(G.charCodeAt(H)<<d));H++;}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa;}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2);}return k;}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x);}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128);}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128);}}}return d;}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g);}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase();};

                // console.log(md5('小丸子'));

                var sign=md5($scope.userInfo.uid+$scope.userInfo.username+$scope.userInfo.salt+'phonegap100');

                // add: function(uid,username,title,content,fid,salt,sign) {
                //  console.log('zhixing');
                threadPostFactory.add( $scope.userInfo.uid,$scope.userInfo.username,$scope.newTopicData.title,$scope.newTopicData.content,fid,$scope.userInfo.salt,sign);

            }else{
                alert('您还没有登录');
            }



        }



    })
    //帖子详情
    .controller('ThreadContentCtrl', function($scope,$rootScope,$stateParams,ThreadContentFactory) {



        var tid=$stateParams.tid;

        ThreadContentFactory.get(tid);

        console.log(tid);

        $scope.$on('ThreadContent.threadUpdated', function() {
            // $timeout(function() {
            $scope.thread = ThreadContentFactory.getThread();
            $scope.showloading=false
            console.log( $scope.thread[0]['message']);
            //   $scope.$broadcast('scroll.refreshComplete');
            // }, 100);
        });


    })



    .controller('UserCtrl', function($scope,Storage) {
        var storageKey='user';
        console.log(Storage.get('user'));

        //每次加载前 判断是否登录
        $scope.$on('$ionicView.beforeEnter', function() {
            if(Storage.get(storageKey)&&Storage.get(storageKey).username!=''){

                $scope.userInfo=Storage.get(storageKey);
                console.log($scope.userInfo);
            }else{
                $scope.userInfo='';

            }
        });


    })




    //用户登录
    .controller('LoginCtrl', function($scope,$state,$ionicLoading,User,Storage) {


      var storageKey='user';

//一定要注意定义 我们的ng-model的对象 数据
        $scope.user={
            username:'syc',
            password:'123456'
        }
        $scope.signIn=function(){
            //console.log($scope.user);
            User.login($scope.user.username,$scope.user.password);

        }

        $scope.$on('User.loginUpdated', function() {

            var userRel = User.getCurrentUser();

            if(userRel.success==false){//登陆失败
                //    alert(userRel.message);
                $ionicLoading.show({
                    noBackdrop: true,
                    template: userRel.message,
                    duration: 1500
                });
            }else{
                Storage.set(storageKey,userRel);
                $state.go('tab.user');  //路由跳转

            }

        });

    })



    .controller('PersonalCtrl', function($scope,$state,$ionicActionSheet,$timeout,Storage,User,$rootScope) {
        console.log('PersonalCtrl');
        var storageKey='user';
        if(Storage.get(storageKey)&&Storage.get(storageKey).username!=''){

            $scope.userInfo=Storage.get(storageKey);
            console.log($scope.userInfo);
        }else{//没有登录的话跳转到 user

            $state.go('tab.user');  //路由跳转
        }

        //退出登录

        $scope.logout=function(){
            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({

                destructiveText: '退出登录',
                titleText: '确定退出当前登录账号么？',
                cancelText: '取消',
                cancel: function() {
                    // add cancel code..
                },
                destructiveButtonClicked: function() {
                    logout();
                    return true;
                }
            });

            // For example's sake, hide the sheet after two seconds
            $timeout(function() {
                // hideSheet();
            }, 2000);


        }
        //退出登录的方法
        var logout=function(){
            console.log('logout');
            User.logout();
            $state.go('tab.user');  //路由跳转


        }


    })



;
