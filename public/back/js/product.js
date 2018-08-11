

$(function(){
    var currentPage = 1;
    var pageSize = 5;
    var picArr = [];



    render();
 function render() {
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetailList',
        data: {
           page: currentPage,
           pageSize: pageSize
        },
        dataType: 'json',
        success:function(info) {
            //console.log(info);
            var htmlStr = template('tbTmp',info);
            $('tbody').html(htmlStr);
   
            $("#pagintor").bootstrapPaginator({
               bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
               currentPage: info.page ,//当前页
               totalPages: Math.ceil( info.total / info.size ),//总页数
               size:"small",//设置控件的大小，mini, small, normal,large
               onPageClicked:function(event, originalEvent, type,page){
                 //为按钮绑定点击事件 page:当前点击的按钮值
                 //console.log( page );
                 currentPage = page;
                 render(currentPage);
               },
               itemTexts: function(type,page, current){
                //console.log(type + page + current);
                switch(type){
                    case 'first':
                    return '首页';
                    case 'prev':
                    return '上一页';
                    case 'next':
                    return '下一页';
                    case 'last':
                    return '尾页';
                    case 'page':
                    return page;
                }
                
               }
             });
        }
    })
 }





 //点击添加类，弹出模态框,绚烂下拉列表的li内容
 $('.addBtn').click(function(){
     $('#addModal').modal('show');

     $.ajax({
        type: 'get',
        url: '/category/querySecondCategoryPaging',
        data: {
           page: 1,
           pageSize: 100
        },
        dataType: 'json',
        success:function( info ){
           // console.log(info);
            var ulStr = template('ulTmp',info);
            $('.dropdown-menu').html( ulStr );
        }
     })
 })


 $('.dropdown-menu').on('click','a',function(){
     var txt = $(this).html();
     //console.log(txt);
     $('#dropdownText').text(txt);
     var id = $(this).data('id');
     $('[name="brandId"]').val(id);
     $('#addForm').data("bootstrapValidator").updateStatus("brandId", "VALID");
 })

  //表单验证
  $('#addForm').bootstrapValidator({
     excluded: ["hidden"],

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      
        brandId: {
        validators: {
            //不能为空
            notEmpty: {
              message: '请选择二级分类'
            }
          }
      },
      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      proDesc: {
        validators: {
            //不能为空
            notEmpty: {
              message: '请输入商品描述'
            }
          }
      },
      num: {
        validators: {
            //不能为空
            notEmpty: {
              message: '请输入商品库存'
            },
            regexp: {
              regexp: /^[1-9]\d*$/,
              message: '商品库存必须是非零开头的数字'
            }
          } 
      },
      size: {
        validators: {
            //不能为空
            notEmpty: {
              message: '请输入商品尺码'
            },
            regexp: {
              regexp: /^\d{2}-\d{2}$/,
              message: '商品尺码必须是xx-xx的格式，例如，32-40'
            }
          } 
      },
      oldPrice: {
        validators: {
            //不能为空
            notEmpty: {
              message: '请输入商品原价'
            }
          } 
      },
      price: {
        validators: {
            //不能为空
            notEmpty: {
              message: '请输入商品现价'
            }
          }
      },
      picStatus: {
        validators: {
            //不能为空
            notEmpty: {
              message: '请上传三张图片'
            }
          }
      }
    }


})



//图片上传，获取上传后图片的地址$("#fileupload").fileupload({
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data.result);
      picArr.unshift(data.result);
      //console.log(picArr);

      var picUrl = data.result.picAddr;
      $('#imgBox').prepend('<img src="' + picUrl+  ' " width="100">');

      if(picArr.length > 3) {
        picArr.pop();
        $('#imgBox img:last-of-type').remove();
      }

      if( picArr.length === 3){
        $('#addForm').data("bootstrapValidator").updateStatus("picStatus", "VALID");
      }


    }
});

//表单验证成功

$("#addForm").on('success.form.bv', function (e) {
  e.preventDefault();
  //使用ajax提交逻辑
  var paramstar = $('#addForm').serialize();
  paramstar +=  "&picAddr1=" + picArr[0].picAddr + "&picName1=" + picArr[0].picName;
  paramstar +=  "&picAddr2=" + picArr[1].picAddr + "&picName2=" + picArr[1].picName;
  paramstar +=  "&picAddr3=" + picArr[2].picAddr + "&picName3=" + picArr[2].picName;
  $.ajax({
    type: 'post',
    url: '/product/addProduct',
    data: paramstar,
    dataType: 'json',
    success: function (info) {
      //console.log(info);
      if( info.success){
        $('#addModal').modal('hide');
        $('#imgBox img').remove();
        picArr = [];
        currentPage = 1;
        render();
        $("#addForm").data('bootstrapValidator').resetForm(true);
        $('#dropdownText').text('请选择二级分类');
      }
    }
  })
});



})
   



