    
var mySwiper = new Swiper ('.swiper-container', {
loop: true,
pagination: '.swiper-pagination',
autoplay: 3000,//可选选项，自动滑动
autoplayDisableOnInteraction : false,
})        
// 滚动轮播
var mySwiper = new Swiper ('.swiper-container1', {
loop: true,
pagination: '.swiper-pagination',
autoplay: 3000,//可选选项，自动滑动
direction: 'vertical'
})   
var mySwiper = new Swiper('.swiper-container2',{
slidesPerView : 4,
slidesPerGroup : 3,
prevButton:'.swiper-button-prev',
nextButton:'.swiper-button-next',
}) 

//搜索页
$(".search span").click(function(){
     self.location='search.html'; 
})
function city(){
    // 百度地图API功能
    var map = new BMap.Map("allmap");
    function myFun(result){
        var cityName = result.name;
        map.setCenter(cityName);
        alert("当前定位城市:"+cityName);
        $(".area").html(cityName);
        setCookie("cityName",cityName,1)
    }
    var myCity = new BMap.LocalCity();
    myCity.get(myFun);  
}
function setCookie(cname,cvalue,exdays){
  var d = new Date();
  d.setTime(d.getTime()+(exdays*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname+"="+cvalue+"; "+expires;
}
function getCookie(cname){
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}
function checkCookie(){
  var cityName=getCookie("cityName");
  if (cityName!=""){
    console.log(111);
    // $(".area").html(cityName);
    return "";
  }
  else {
    console.log(222)
    setCookie("cityName",cityName,1);
    city();
  }
}
checkCookie();




