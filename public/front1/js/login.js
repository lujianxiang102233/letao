$(function(){
    $('.btn-confirm').click(function(){
          // 获取用户名和密码
    var username = $('#username').val();
    var password = $('#password').val();
    

    if ( username.trim() === "" ) {
      mui.toast("请输入用户名");
      return;
    }
    if ( password.trim() === "" ) {
      mui.toast("请输入密码");
      return;
    }
        $.ajax({
            type: 'post',
            url: '/user/login',
            data: {
                username : username,
                password: password
            },
            dataType: 'json',
            success: function(info){
                    console.log(info);
                    if(info.error == 403){
                        mui.toast('用户名或者密码错误');
                     }
                    if(info.success){
                        if(location.search.indexOf('retUrl') > -1 ){
                            var retUrl = location.search;
                            var str1 = retUrl.slice(8);
                            location.href = str1;
                        }else{
                            // location.href = 'user.html';
                            location.href = 'user.html';
                        }
                    }
            }
        })
    })
})