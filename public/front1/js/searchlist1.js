$(function(){
   
    var key = getSearch('key');
    //console.log(key);
    $('.search-input').val(key);
   
   
    render();
   
    function render(){
       $('.lt-product').html('<div class="lazy"></div>');
       var params = {};
       params.proName = $('.search-input').val();
       params.page = 1;
       params.pageSize = 100
   
      var $current = $('.lt-sort a.current');
       if( $current.length > 0){
           var type = $current.data('type');
           var sortValue = $current.find('i').hasClass('fa-angle-down')  ? 2 : 1;
           //var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;
         
           params[type] = sortValue;
           console.log( params[type]);
       }
      
       
      setTimeout(function(){
       $.ajax({
           type: 'get',
           url: '/product/queryProduct',
           data: params,
           success: function( info ){
               console.log( info );
              //渲染到产品模块
              var proStr = template('proTmp', info);
              $('.lt-product').html(proStr);
           }
       })
      },500)
    }
   
   
   //  把地址栏的值赋值到Input框中
   
    $('.search-btn').click(function(){
       
      //用户可能直接在input中搜索，所以要把里面的字放到localStorage中
      key = $('.search-input').val();
      var arr = getHistory();
      if( key.trim() === ''){
          mui.toast('请输入搜索关键字');
      }
      //如果有重复的，需要删除之前的，再追加到前面
      if( arr.indexOf(key) > -1){
          arr.splice(arr.indexOf(key),1);
      }
   
      //如果arr的长度已经等于10,那么要先删除最后一个，再放进去
      if( arr.length >= 10 ){
          arr.pop();
      }
   
      arr.unshift( key );
      var jsonStr = JSON.stringify(arr);
      localStorage.setItem('search-list', jsonStr);
       render()
    })
   
   //点击价格或者库存，升序或者降序，同事箭头要切换
   $('.lt-sort a[data-type]').click(function(){
      //有类就切换箭头方向
      if($(this).hasClass('current')){
       $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
      }else {
          //没有就添加类并排它
       $(this).addClass('current').siblings().removeClass('current');
      }
     
     render();
   })
   
   
   
   
   })