$(function(){

  //要判断用户是否登录过，如果未登录过，则无法访问其他页面，需要条状到登录页面
  if( location.href.indexOf('login.html') == -1) {
      $.ajax({
          type: 'get',
          url: '/employee/checkRootLogin',
          dataType: 'json',
          success: function( info ){
              console.log(info);

              if(info.error == 400){
                  location.href = 'login.html';
              }
              if(info.success){
                  console.log('已经登录');
              }
          }
      })
  }



    //增加进度条
    $(document).ajaxStart(function(){
        NProgress.start();
    })

    $(document).ajaxStop(function(){
        NProgress.done();
    })


    //侧边栏二级菜单显示和隐藏
    $('.aside-nav .list').click(function(){
        $('.aside-nav .next-list').slideToggle();
    })

    //点击菜单按钮，侧边栏向左边滑入
    $('.menu').click(function(){
        $('.lt-aside').toggleClass('current');
        $('.lt-main .main-header').toggleClass('current');
        $('.lt-main').toggleClass('current');
    })

    //退出页面
    $('.logout').click(function(){
        $.ajax({
            type: 'get',
            url: '/employee/employeeLogout',
            dataType: 'json',
            success: function( info ){
                //console.log(info);
                if( info.success ){
                    location.href = 'login.html';
                }
            }
        })
    })
})


