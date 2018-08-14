$(function(){
   render();
   function render(){
    $.ajax({
        type: 'get',
        url: '/cart/queryCart',
        dataType: 'json',
        success: function(info){
            console.log(info);
            if( info.error === 400 ){
                location.href = 'login.html?retUrl=' + location.href;
            }
            var cartStr = template('cartTmp',{ list : info});
            $('.mui-table-view').html(cartStr);
        }
    })
   }

   //给模态框的尺寸添加选中功能
   $('body').on('click','.lt-size span',function(){
       $(this).addClass('current').siblings().removeClass('current');
   })

   
    //编辑
    $('.mui-table-view').on('tap', '.edit', function(){
        var obj = this.dataset;
        var id = obj.id;
        console.log(obj);
        var htmlStr = template('editTmp',obj);
        htmlStr = htmlStr.replace(/\n/g, '');
           // 手动初始化数字框
        mui(".mui-numbox").numbox();

        mui.confirm(htmlStr, '编辑商品', ['确认', '取消'], function(e){
            //console.log(e);
          if( e.index === 0) {
            var size = $('.lt-size span.current').text();
            var num = $('.num-ipt').val();
                $.ajax({
                    type: 'post',
                    url: '/cart/updateCart',
                    data: {
                        id: id,
                        num: num,
                        size: size
                    },
                    dataType: 'json',
                    success: function( info ){
                        console.log( info );
                        if( info.success ){
                            render();
                        }
                    }
                })
          }

        });
   
        mui(".mui-numbox").numbox();
    })

    //删除功能
    $('.mui-table-view').on('tap','.delete', function(){
        var id = $(this).data('id');
        console.log(id);
        $.ajax({
            type: 'get',
            url: '/cart/deleteCart',
            data: { id:[id]},
            success: function(info){
                console.log(info);
                if( info.success){
                    render();
                }
            }
        })
    })


    //计算价格的功能、
    $('.mui-table-view').on('click','.ck',function(){
        var orderPrice = 0;
        $('.ck:checked').each(function(index, ele){
            var obj = $(ele)[0].dataset;
             orderPrice += obj.price * obj.num;
        })
      orderPrice = orderPrice.toFixed(2);
      $('.totalPrice').text(orderPrice);
    
    })


})

