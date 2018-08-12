$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005,
        indicators: false, //是否显示滚动条 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });


    var gallery = mui('.mui-slider');
        gallery.slider({
          interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
        });
})

function getSearch(key){
    var search = location.search;
    var str = decodeURI(search);
    var str1 = str.slice(1);
    var arr = str1.split('&');
    var obj = {};
    arr.forEach(function(v,i,arr){
        var key = v.split('=')[0];
        var value = v.split('=')[1];
        obj[key] = value;
  
    })
    return obj[key];
  }


  function getHistory(){
    var jsonArr = localStorage.getItem('search-list') || '[]';
    var arr = JSON.parse(jsonArr);
    return arr;
}



  