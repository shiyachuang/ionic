angular.module('myApp.detailList', [])

.factory('Lists', function($http) {
  // Might use a resource here that returns a JSON array
  // // Some fake testing data
  var Phonelists = [{
    id: 0,
    name: '华为畅想6',
    price:'1299',
    Text: '轻薄机身，充沛电力，指纹识别，4G全网通',
    img: 'phone1.jpg',
    imgList:[
     {img:"huaweiC6-1.jpg"} ,
     {img:"huaweiC6-2.jpg"} ,
     {img:"huaweiC6-3.jpg"} ,
     {img:"huaweiC6-4.jpg"} 
    ]
  }, {
    id: 1,
    name: 'HUAWEI nova',
    price:'2399',
    Text: '一指美拍，十级美颜，4K高清拍摄，开启“玩”美时代~',
    img: 'phone2.jpg',
     imgList:[
     {img:"huaweiNova-1.jpg"} ,
     {img:"huaweiNova-2.jpg"} ,
     {img:"huaweiNova-3.jpg"} ,
     {img:"huaweiNova-4.jpg"} 
    ]

  }, {
    id: 2,
    name: 'HUAWEI P9',
    price:'3639',
    Text: '精致外观、后置1200万徕卡双摄像头，大光圈拍摄，麒麟955芯片，指纹识别！',
    img: 'phone3.jpg',
     imgList:[
     {img:"huaweiP9-1.jpg"} ,
     {img:"huaweiP9-2.jpg"} ,
     {img:"huaweiP9-3.jpg"} ,
     {img:"huaweiP9-4.jpg"} 
    ]
  }];
  var Padlists = [{
    id: 0,
    name: '华为平板M3',
    price:'2688',
    Text: '8.4 英寸+2K高清屏幕、麒麟950、高品质HI-FI音效、指纹识别、免费正版office。',
    img: 'pad1.jpg',
     imgList:[
     {img:"huaweiM3-1.jpg"} ,
     {img:"huaweiM3-2.jpg"} ,
     {img:"huaweiM3-3.jpg"} ,
     {img:"huaweiM3-4.jpg"} 
    ]
  }, {
    id: 1,
    name: '华为平板M2',
    price:'1488',
    Text: '【11.11 直降100元】',
    img: 'pad2.jpg',
     imgList:[
     {img:"huaweiM2-1.jpg"} ,
     {img:"huaweiM2-2.jpg"} ,
     {img:"huaweiM2-3.jpg"} ,
     {img:"huaweiM2-4.jpg"} 
    ]
  }, {
    id: 2,
    name: '华为手环 B3',
    price:'1199',
    Text: '【11.11 直降100元】',
    img: 'pad3.jpg',
     imgList:[
     {img:"huaweiB3-1.jpg"} ,
     {img:"huaweiB3-2.jpg"} ,
     {img:"huaweiB3-3.jpg"} ,
     {img:"huaweiB3-4.jpg"} 
    ]
  },{
    id: 3,
    name: 'HUAWEI WATCH',
    price:'3288',
    Text: '【11.11 直降100元】',
    img: 'pad4.jpg',
     imgList:[
     {img:"WATCH-1.jpg"} ,
     {img:"WATCH-2.jpg"} ,
     {img:"WATCH-3.jpg"} ,
     {img:"WATCH-4.jpg"} 
    ]
  }
  ];
  var Routelists = [{
    id: 0,
    name: '华为WS550 无线路由器',
    price:'159',
    Text: '【11.11 直降100元】',
    img: 'luyou.jpg',
     imgList:[
     {img:"luyouWS550-1.jpg"} ,
     {img:"luyouWS550-2.jpg"} ,
     {img:"luyouWS550-3.jpg"} ,
     {img:"luyouWS550-4.jpg"} 
    ]
  }, {
    id: 1,
    name: '华为WS832  无线路由器',
    price:'799',
    Text: '1200M',
    img: 'luyou1.jpg',
     imgList:[
     {img:"luyouWS832-1.jpg"} ,
     {img:"luyouWS832-2.jpg"} ,
     {img:"luyouWS832-3.jpg"} ,
     {img:"luyouWS832-4.jpg"} 
    ]
  }, {
    id: 2,
    name: '华为盒子',
    price:'299',
    Text: '华为最新款盒子',
    img: 'luyou2.jpg',
     imgList:[
     {img:"huaweihezi-1.jpg"} ,
     {img:"huaweihezi-2.jpg"} ,
     {img:"huaweihezi-3.jpg"} ,
     {img:"huaweihezi-4.jpg"} 
    ]
  },{
    id: 3,
    name: '华为随行WIFI',
    price:'599',
    Text: '支持联通/电信双4G和联通3G，9600mAh充电宝，支持32G Micro SD卡扩展，支持华为HiLink APP智能管理，商旅出行上网好助手！',
    img: 'luyou3.jpg',
     imgList:[
     {img:"huaweiWIFI-1.jpg"} ,
     {img:"huaweiWIFI-2.jpg"} ,
     {img:"huaweiWIFI-3.jpg"} ,
     {img:"huaweiWIFI-4.jpg"} 
    ]
  }
  ];
   var Peijianlists = [{
    id: 0,
    name: '华为排插 快充版',
    price:'149',
    Text: '支持联通/电信双4G和联通3G，9600mAh充电宝，支持32G Micro SD卡扩展，支持华为HiLink APP智能管理，商旅出行上网好助手！',
    img: 'peijian1.jpg',
     imgList:[
     {img:"huaweiCP-1.jpg"} ,
     {img:"huaweiCP-2.jpg"} ,
     {img:"huaweiCP-3.jpg"} ,
     {img:"huaweiCP-4.jpg"} 
    ]
  }, {
    id: 1,
    name: 'nova皮质保护壳',
    price:'69',
    Text: '8英寸平板电脑',
    img: 'peijian2.jpg',
     imgList:[
     {img:"nova-1.jpg"} ,
     {img:"nova-2.jpg"} ,
     {img:"nova-3.jpg"} ,
     {img:"nova-4.jpg"} 
    ]
  }, {
    id: 2,
    name: '华为 主动降噪耳机 AM185',
    price:'599',
    Text: '主动降噪，动圈动铁带来好音质，连续降噪8小时，支持Mate8、MateS、P8、Mate7、荣耀7、荣耀6plus等手机直充，倍感舒适的佩戴体验，静享时光，聆听美好。',
    img: 'peijian3.jpg',
     imgList:[
     {img:"erji-1.jpg"} ,
     {img:"erji-2.jpg"} ,
     {img:"erji-3.jpg"} ,
     {img:"erji-4.jpg"} 
    ]
  },{
    id: 3,
    name: '移动电源',
    price:'69',
    Text: '华为最新手表',
    img: 'peijian4.jpg',
     imgList:[
     {img:"chongdianbao-1.jpg"} ,
     {img:"chongdianbao-2.jpg"} ,
     {img:"chongdianbao-3.jpg"} ,
     {img:"chongdianbao-4.jpg"} 
    ]
  }
  ];

  return {
    all: function() {
      return Phonelists;
    },
    PadAll: function() {
      return Padlists;
    },
    RouteAll: function() {
      return Routelists;
    },
    PeijianAll: function() {
      return Peijianlists;
    },
    ceshi:function(){
          var  myUrl ="http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1&callback=JSON_CALLBACK";
        return $http.jsonp(myUrl,{cache:true});
    },
    
    padAll:function(){
      return Padlists;
    },
    remove: function(list) {
      Phonelists.splice(Phonelists.indexOf(list), 1);
    },
    get: function(listId) {
      for (var i = 0; i < Phonelists.length; i++) {
        if (Phonelists[i].id === parseInt(listId)) {
          return Phonelists[i];
        }
      }
      return null;
    }
  };
});
