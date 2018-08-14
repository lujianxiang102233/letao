$(function(){
    $.ajax({
        type: 'get',
        url: '/user/queryUserMessage',
        dataType: 'json',
        success:function(info){
            console.log(info);
            if( info.error === 400){
                location.href = 'login.html';
            }
            var htmlStr = template('userTmp',info);
            $('.user-info').html(htmlStr);
        }
    })


    $('.logoutBtn').click(function(){
        $.ajax({
            type: 'get',
            url: '/user/logout',
            dataType: 'json',
            success:function(info){
                console.log(info);
                if( info.success){
                    console.log('退出成功');
                    location.href = 'login.html';
                }
            }
        })
    })
})