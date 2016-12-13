/**
 * Created by htzhanglong on 2015/8/2.
 */
var configMod=angular.module("myApp.config", []);


configMod.constant("ENV", {
    // "name": "production",
    "debug": false,
    "api": "http://www.phonegap100.com/appapi.php",
    'siteUrl':"http://www.phonegap100.com",
    'imgUrl':"http://www.phonegap100.com/data/attachment/",
    'version':'1.0.1'
});

