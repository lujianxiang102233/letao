$(function(){
    var currentPage = 1;
    var pageSize = 5;
    var currentId;
    var isDelete;
    render();
function render(){
    $.ajax({
        type: 'get',
        url: '/user/queryUser',
        data: {
            page: currentPage,
            pageSize: pageSize,
        },
        dataType: 'json',
        success: function (info) {
            //console.log(info);
            //把第一页数据线渲染出来
            var htmlStr = template('tmp',info);
            $('tbody').html(htmlStr);



        //分页插件
        $("#pagintor").bootstrapPaginator({
            bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
            currentPage: info.page,//当前页
            totalPages: Math.ceil( info.total / info.size ),//总页数
            onPageClicked:function(event, originalEvent, type,page){
             console.log(page);
             currentPage = page;
             render();
            }
          });


        }
    })
}



// 修改状态,由于tbody里面的数据是动态渲染，需要用到时间委托
//点击操作，模态框弹出
$('tbody').on('click','.btn',function(){
    $('#amend').modal('show');
   currentId = $(this).parent().data('id');
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1 ;
    // console.log(currentId);
    // console.log(isDelete);
    // console.log($(this));
    // console.log($(this).parent());
})

//点击模态框的确认按钮，tbody里面的状态改变
$('.confirm').click(function(){
   
    $.ajax({
        type: 'post',
        url: '/user/updateUser',
        data: {
            id: currentId,
            isDelete: isDelete
        },
        dataType: 'json',
        success: function( info ){
            //console.log( info );
            $('#amend').modal('hide');
            render();
        }

    })
})



})