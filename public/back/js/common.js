
//侧边栏点击下拉伸缩
$(function(){

    //判断用户是否登录过，如果没有登录过，需要跳转到登录页面
    if(location.href.indexOf('login.html') == -1) {
        $.ajax({
            type:'get',
            url:'/employee/checkRootLogin',
            dataType:'json',
            success:function(info){
                 console.log(info);
               if( info.error == 400 ){
                   location.href = 'login.html';
               }
               if( info.success ){
                   console.log('跳转成功');
               }
            }
        })
    }




    $('.list').click(function(){
        console.log(123);
        $('.in').slideToggle();
    })

//菜单栏点击，侧边栏隐藏
    $('.icon-menu').click(function(){
        $('.lt-aside').toggleClass('current');
        $('.it-main').toggleClass('current');
        $('.it-main .it-topbar').toggleClass('current');
    })

    //退出功能

    $('.out').click(function(){
        //console.log(1234);
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            dataType:'json',
            success:function(info){
                //console.log(info);
                if(info.success){
                    location.href = "login.html";
                }
            }
        })
    })


    //进度条
    $(document).ajaxStart(function(){
        //console.log('请求开始');
        NProgress.start();

    })

    $(document).ajaxStop(function(){
        setTimeout(function(){
            //console.log('请求结束');
            NProgress.done();
        },1000);
    })




})