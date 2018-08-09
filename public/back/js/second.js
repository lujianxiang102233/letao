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
                console.log(info);
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
    })
})