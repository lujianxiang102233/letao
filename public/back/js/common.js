
//侧边栏点击下拉伸缩
$(function(){
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
    console.log(1234);
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



})