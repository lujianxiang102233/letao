

$(function(){

    //用户名和密码长度校验
    $('#form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators:{
                    notEmpty: {
                        message:'用户名不能为空'
                    },
                    stringLength: {
                        min:2,
                        max:6,
                        message:'用户名长度必须在2到6之间'
                    },
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message:'密码不能为空'
                    },
                    stringLength: {
                        min:6,
                        max:12,
                        message: '密码长度必须在6到12之间'
                    },
                    callback: {
                        message: '密码错误'
                    }

                }
            }
        }
    })

    //图标重置
    $('.resetBtn').click(function(){
        $('#form').data('bootstrapValidator').resetForm();
    })


    //注册表单验证成功事件
    $('#form').on('success.form.bv', function( e ) {
        //阻止表单的自动提交
        e.preventDefault();
      //ajax验证用户登录请求
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $('#form').serialize(),
            dataType: 'json',
            success: function( info ) {
                console.log(info);
                if( info.error === 1000) {
                    $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
                }
                if( info.error === 1001 ){
                    $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
                }
                if( info.success ){
                    location.href = 'index.html';
                }
         
            }
        })
    })
 




    
})