

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


 // 基于准备好的dom，初始化echarts实例
 var echarts_1 = echarts.init(document.querySelector('.echarts_1'));

 // 指定图表的配置项和数据
 var option1 = {
     title: {
         text: '2017年注册人数'
     },
     tooltip: {},
     legend: {
         data:['人数']
     },
     xAxis: {
         data: ["一月","二月","三月","四月","五月","六月"]
     },
     yAxis: {},
     series: [{
         name: '人数',
         type: 'bar',
         data: [1050, 2000, 1360, 1000, 2110, 1720]
     }]
 };

 // 使用刚指定的配置项和数据显示图表。
 echarts_1.setOption(option1);



 var echarts_2 = echarts.init(document.querySelector('.echarts_2'));

 // 指定图表的配置项和数据
 option2 = {
    title : {
        text: '热门品牌销售',
        subtext: '2017年6月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','阿迪','新百伦','李宁','阿迪王']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:234, name:'新百伦'},
                {value:135, name:'李宁'},
                {value:1548, name:'阿迪王'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

 // 使用刚指定的配置项和数据显示图表。
 echarts_2.setOption(option2);



})



