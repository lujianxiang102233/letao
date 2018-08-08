$(function(){
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
})


