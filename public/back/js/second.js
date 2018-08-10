$(function(){
    var currentPage = 1;
    var pageSize = 5;
    render();
    function render(){
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            dataType: 'json',
            success: function (info) {
                //console.log(info);
                //把第一页数据线渲染出来
                var htmlStr = template('tmp', info);
                $('tbody').html(htmlStr);

                //分页插件
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: info.page,//当前页
                    totalPages: Math.ceil(info.total / info.size),//总页数
                    onPageClicked: function (event, originalEvent, type, page) {
                        console.log(page);
                        currentPage = page;
                        render();
                    }
                });


            }
        })
    }



    $('.addBtn').click(function(){
        $('#addModal').modal('show');
        //ul里面的li的数据渲染
        $.ajax({
            type:'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page:1,
                pageSize:100
            },
            dataType: 'json',
            success: function( info ){
                //console.log( info );
                var liStr = template('dropdownTpl',info);
                $('.dropdown-menu').html(liStr);

            }

        })
    })


    //通过实践委托，给li里面所有的a标签添加事件
    $('.dropdown-menu').on('click','a',function(){
        var txt = $(this).text();
        $('.categoryName').text(txt);

        var id = $(this).data('id');
        $('[name="categoryId"]').val(id);
        $('#addForm').data('bootstrapValidator').updateStatus("categoryId", "VALID");
    })


    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
          console.log(data.result.picAddr);
          var url = data.result.picAddr;
          $('.uploadImg').attr('src',url);
          $('[name="brandLogo"]').val(url); 
          $('#addForm').data('bootstrapValidator').updateStatus("brandLogo", "VALID");
        }
  });




  //表单验证
  $('#addForm').bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
       //3. 指定校验字段
        fields: {
          //校验用户名，对应name表单的name属性
          categoryId: {
            validators: {
              //不能为空
              notEmpty: {
                message: '请选择一级分类'
              },
            }
          },
          brandName: {
            validators: {
                //不能为空
                notEmpty: {
                  message: '请选择二级分类'
                },
              }
          },
          brandLogo: {
            validators: {
                //不能为空
                notEmpty: {
                  message: '请选择图片'
                }
              }
          }
        }
    
  })




  $("#addForm").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
        type: 'post',
        url: '/category/addSecondCategory',
        data: $('#addForm').serialize(),
        dataType: 'json',
        success: function( info ) {
            //console.log(info);
            if ( info.success){
                $('#addModal').modal('hide');
                currentPage = 1;
                render();
                $('#addForm').data('bootstrapValidator').resetForm(true);
                $('.categoryName').text('请选择一级分类');
                $('.uploadImg').attr('src','images/none.png');
            }
        }
    })
});

    


})