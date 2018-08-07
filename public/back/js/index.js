

//登录功能
$(function(){
   $('#form').bootstrapValidator({
       //校验图标
       feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'lyphicon glyphicon-refresh'
       },


    fields: {
        username: {
            validators: {
                //校验是否为空
                notEmpty: {
                    message:'用户名不能为空'
                },
                //校验长度
                stringLength: {
                    min:2,
                    max:6,
                    message: '用户名长度必须在2到6之间'
                }
            }
        },
        password:{
            validators: {
                notEmpty: {
                    message: '密码不能为空'
                },
                stringLength: {
                    min:6,
                    max:12,
                    message: '密码长度必须在6到12之间'
                }
            }
        }
    }
   })

//validator.resetForm() 重置表单
   $('.reset').on('click', function() {
       $('#form').data('bootstrapValidator').resetForm();
   })

})