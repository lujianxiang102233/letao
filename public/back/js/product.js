

$(function(){
    var currentPage = 1;
    var pageSize = 5;
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
            }
          } 
      },
      size: {
        validators: {
            //不能为空
            notEmpty: {
              message: '请输入商品尺码'
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




})
   



