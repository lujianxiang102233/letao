

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
                },
                callback: {
                    message: '用户名不存在'
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
                },
                callback: {
                    message: '密码错误'
                }
            }
        }
    }
   })

//validator.resetForm() 重置表单,把图标重置掉
   $('.reset').on('click', function() {
       $('#form').data('bootstrapValidator').resetForm();
   })

})


//表单验证成功事件
$('#form').on('success.form.bv', function (e) {
    //submit会提交表单，需要阻止默认行为
  e.preventDefault();
  //console.log('成功');

  $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function ( info ) {
          //console.log(info);

          if( info.success ){
              location.href = "index.html";
          }
          if( info.error === 1000 ) {
              $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
          }
          if( info.error === 1001) {
              $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
          }

      }
  })
})


