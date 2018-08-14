$(function(){

   

    var urlStr = location.search; //"?productId=1"
    var str = urlStr.slice(1);
    var id = str.split('=')[1];

    var size;
   render();
   function render(){
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data: { id :id },
        dataType: 'json',
        success: function(info){
            console.log(info);
            var detailStr = template('detailTmp', info);
            $('.mui-scroll').html(detailStr);


            var gallery = mui('.mui-slider');

            //初始化轮播图
            gallery.slider({
              interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
            });

            //初始化数字输入框
            mui('.mui-numbox').numbox();


        
        }

    })
   }
    //点击尺码，然被点中的尺码高亮
    
    $('.mui-scroll').on('click','.lt-size span', function(){
        $(this).addClass('current').siblings().removeClass('current');
    })


    $('.add-btn').click(function(){
        var size = $('.lt-size span.current').data('size');
        var num = $('.lt-num .num-ipt').val();
       
        if(!size){
            mui.toast('请选择商品尺码！');
        }else{
            mui.confirm('添加成功','温馨提示',['去购物车','继续浏览'],function(e){
                //console.log(e);
                if(e.index == 0){
                    $.ajax({
                        type: 'post',
                        url: '/cart/addCart',
                        data: {
                            size:size,
                            num:num,
                            id:id
                        },
                        dataType: 'json',
                        success: function (info) {
                            console.log(info);
                            if( info.success){
                             location.href = 'cart.html';
                            }
                        }
                    })
                }
            })
        }
      
    })
  




})

