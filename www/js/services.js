/**
 * Created by htzhanglong on 2015/8/2.
 */
angular.module('myApp.services', [])

    .factory('Storage', function() {
        return {
            set: function(key, data) {
                return window.localStorage.setItem(key, window.JSON.stringify(data));
            },
            get: function(key) {

                return window.JSON.parse(window.localStorage.getItem(key));
            },
            remove: function(key) {
                return window.localStorage.removeItem(key);
            }
        };
    })



    .factory('ArticleFactory',function($rootScope,$resource,ENV){


        var ApiUrl = ENV.api,
        // 用来存储话题类别的数据结构，包含了下一页、是否有下一页等属性
            topics = {},
            catid = 20;


        var resource = $resource(ApiUrl, {}, {
            query: {
                method: 'get',
                params: {
                    a:'getPortalList',
                    catid: '@catid',
                    page: '@page'

                },
                timeout: 20000
            }
        });


        return {

            //获取第一页的数据
            getTopTopics:function(){

                var hasNextPage = true;   //是否有下一页

                resource.query({
                    catid:catid,
                    page:1
                }, function (r) {

                    if (r.result.length < 20) {  //来判断是否有下一页数据
                        hasNextPage = false;
                    }
                    topics[catid]={

                        hasNextPage:hasNextPage,
                        'nextPage': 2,
                        'data': r.result
                    }
                    //在这里请求完成以后  通知controller


                    $rootScope.$broadcast('PortalList.portalsUpdated');

                })
            } ,
            //返回我们保存的数据
            getArticles:function(){
                if(topics[catid]===undefined){

                    return false
                }

              //  console.log(topics[catid].data);


                return topics[catid].data;

            },
            getMoreTopics:function(){

                //为了解决一步加载的时候数据还没有加载完成  然后请求loadMore的时候  找不到数据
                if(topics[catid]===undefined){
                    return false;
                }

                //获取以前的数据
                var hasNextPage=topics[catid].hasNextPage;
                var nextPage=topics[catid].nextPage;
                var moreTopicsData=topics[catid].data;

                //console.log(moreTopicsData);

                resource.query({
                    catid:catid,
                    page:nextPage
                }, function (r) {

                    nextPage++;

                    if (r.result.length < 20) {  //来判断是否有下一页数据
                        hasNextPage = false;
                    }
                    moreTopicsData=moreTopicsData.concat(r.result);
                    topics[catid]={
                        hasNextPage:hasNextPage,
                        'nextPage': nextPage,
                        'data': moreTopicsData
                    }

                    //在这里请求完成以后  通知controller


                    $rootScope.$broadcast('PortalList.portalsUpdated');

                })
            },
            setArticleCateId:function(cate_id){   //点击分类加载数据

                catid=cate_id;
                this.getTopTopics();

            },
            hasNextPage: function() {
                if (topics[catid] === undefined) {
                    return false;
                }
                return topics[catid].hasNextPage;
            }




        }


    })

    //文章详情
    .factory('ArticleContentFactory', function($resource, $rootScope,ENV) {


        var ApiUrl = ENV.api,
        // 用来存储话题类别的数据结构，包含了下一页、是否有下一页等属性
            topic = '';


        var resource = $resource(ApiUrl, {}, {
            query: {
                method: 'get',
                params: {
                    a:'getPortalArticle',
                    aid: '@aid'
                },
                timeout: 20000
            }
        });


        return {

            get: function(aid) {

                // console.log(aid);
                return resource.query({
                    aid: aid
                }, function(response) {
                    // console.log(response);
                    topic = response.result;


                    $rootScope.$broadcast('NewsContent.newsUpdated');
                });

            },
            getArticle: function() {
                return topic;
            }


        };


    })

//帖子列表
.factory('ThreadListFactory', function($resource, $rootScope,ENV) {
        var ApiUrl = ENV.api,
        // 用来存储话题类别的数据结构，包含了下一页、是否有下一页等属性
            topics = {},
            fid = 2;
        var resource = $resource(ApiUrl, {}, {

            query: {
                method: 'get',
                params: {
                    a:'getThreadList',
                    fid: '@fid',
                    page: '@page'
                },
                timeout: 20000
            }
        });


        return {
            fetchTopThreadList: function() {

                // console.log("currentTab: " + currentTab);
                var hasNextPage = true;   //是否有下一页

                resource.query({
                    fid: fid,
                    page: 1
                }, function(r) {
                    if (r.result.length < 20) {
                        hasNextPage = false;
                    }
                    topics[fid] = {
                        'nextPage': 2,
                        'hasNextPage': hasNextPage,
                        'data': r.result
                    };
                    $rootScope.$broadcast('ThreadList.threadsUpdated');

                });
            },
            getThreads: function() {

                if (topics[fid] === undefined) {
                    return false;
                }
                return topics[fid].data;
            },
            getCurrentFid: function() {
                return fid;
            },
            increaseNewThreads: function() {
                var nextPage = topics[fid].nextPage;
                var hasNextPage = topics[fid].hasNextPage;
                var portalsData = topics[fid].data;

                //console.log(nextPage)

                resource.query({
                    fid: fid,
                    page: nextPage

                }, function(r) {
                    // console.log(r);
                    nextPage++;
                    if (r.result.length < 20) {
                        hasNextPage = false;
                    }

                    //    console.log(r.result);

                    portalsData = portalsData.concat(r.result);
                    topics[fid] = {
                        'nextPage': nextPage,
                        'hasNextPage': hasNextPage,
                        'data': portalsData
                    };

                    $rootScope.$broadcast('ThreadList.threadsUpdated');

                });
            },
            hasNextPage: function() {
                if (topics[fid] === undefined) {
                    return false;
                }
                return topics[fid].hasNextPage;
            }
        };


    })
    /*
     *
     * http://www.phonegap100.com/appapi.php?a=getPortalCate 获取文章分类
     http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=2 获取文章列表
     http://www.phonegap100.com/appapi.php?a=getPortalArticle&aid=121 获取文章详情
     http://www.phonegap100.com/appapi.php?a=getThreadCate 获取帖子分类
     http://www.phonegap100.com/appapi.php?a=getThreadList&fid=2&page=1 获取帖子列表
     http://www.phonegap100.com/appapi.php?a=getThreadContent&tid=138 帖子详情以及回复的内容
     * */

//帖子详情
    .factory('ThreadContentFactory', function($resource, $rootScope,ENV) {
        var APIUrl = ENV.api ,
            topic;

        var resource = $resource(APIUrl, {}, {
            query: {
                method: 'get',
                params: {
                    a:'getThreadContent',
                    aid: '@tid'
                },
                timeout: 20000
            }
        });


        return {

            get: function(tid) {
                return resource.query({
                    tid: tid
                }, function(response) {
                    topic = response.result;

                    $rootScope.$broadcast('ThreadContent.threadUpdated');
                });

            },
            getThread: function() {
                return topic;
            },
            saveReply: function(topicId, replyData) {
                //发表帖子
            }


        };

    })

    //用户登录
    .factory('User', function($resource, $rootScope,ENV,Storage) {
        var APIUrl = ENV.api ,
            user;
        var storageKey='user';
        var resource = $resource(APIUrl+'?a=login2');

        return {
            login: function(username,password) {
                return resource.save({
                    username: username,
                    password: password
                }, function(response) {
                    //console.log(response);
                    user=response.result;
                    $rootScope.$broadcast('User.loginUpdated');
                });
            },
            logout: function() {
                user = {};
                Storage.remove(storageKey);
            },
            getCurrentUser: function(){
                return user;
            }


        };

    })


    .factory('threadPostFactory', function($resource, $rootScope,ENV,Storage) {
        var APIUrl = ENV.api ,
            post_rel;
        var resource = $resource(APIUrl+'?a=threadPost2');

        /*
         *
         $title=isset($d->title)?dhtmlspecialchars($d->title):'';
         $username=isset($d->username)?dhtmlspecialchars($d->username):'';
         $uid=isset($d->uid)?dhtmlspecialchars($d->uid):'';
         $content=isset($d->content)?dhtmlspecialchars($d->content):'';

         $fid=isset($d->fid)?dhtmlspecialchars($d->fid):'';

         $salt=isset($d->salt)?dhtmlspecialchars($d->salt):'';

         $sign=isset($d->sign)?dhtmlspecialchars($d->sign):'';
         * */

        return {
            add: function(uid,username,title,content,fid,salt,sign) {
                return resource.save({
                    uid:uid,
                    username: username,
                    title: title,
                    content:content,
                    fid:fid,
                    salt:salt,
                    sign:sign

                }, function(response) {
                    console.log(response);
                    $rootScope.$broadcast('threadPost.Updated');
                });
            },
            getResult: function(){
                return post_rel;
            }


        }
    })
;

