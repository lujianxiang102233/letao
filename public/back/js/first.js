
$(function () {
    var currentPage = 1;
    var pageSize = 5;
    render();
    function render() {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
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


    //点击添加类，弹出模态框
    $('.addBtn').click(function () {
        $('#addModal').modal('show');
    })

    //验证表单的正确性
    $('#addForm').bootstrapValidator({
        excluded: [':disabled', ':hidden', ':not(:visible)'],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //校验用户名，对应name表单的name属性
            categoryName: {
                validators: {
                    // 不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    // 长度校验

                }
            },

        }
    })


    // $("#addForm").on('success.form.bv', function (e) {
    //     e.preventDefault();
    //     //使用ajax提交逻辑
    // });
    // $("#addForm").bootstrapValidator({
    //     //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    //     excluded: [':disabled', ':hidden', ':not(:visible)'],

    //     //2. 指定校验时的图标显示，默认是bootstrap风格
    //     feedbackIcons: {
    //       valid: 'glyphicon glyphicon-ok',
    //       invalid: 'glyphicon glyphicon-remove',
    //       validating: 'glyphicon glyphicon-refresh'
    //     },

    //     //3. 指定校验字段
    //     fields: {
    //       //校验用户名，对应name表单的name属性
    //       username: {
    //         validators: {
    //           //不能为空
    //           notEmpty: {
    //             message: '用户名不能为空'
    //           },
    //           //长度校验
    //           stringLength: {
    //             min: 6,
    //             max: 30,
    //             message: '用户名长度必须在6到30之间'
    //           },
    //           //正则校验
    //           regexp: {
    //             regexp: /^[a-zA-Z0-9_\.]+$/,
    //             message: '用户名由数字字母下划线和.组成'
    //           }
    //         }
    //       },
    //     }


    // })

})