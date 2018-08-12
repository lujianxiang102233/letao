$(function(){
   //获取本地存储的值

    render();   

    function getHistory(){
        var jsonArr = localStorage.getItem('search-list') || '[]';
        var arr = JSON.parse(jsonArr);
        return arr;
    }

 
    function render(){
        var arr = getHistory();
        var searchStr = template('historyTpl',{list:arr});
        $('.lt-history').html(searchStr);
    }

    //  var arr = ['社会鹏','萌萌','松松'];
    //  var jsonStr = JSON.stringify(arr);
    //  localStorage.setItem('search-list',jsonStr);

    //点击清空记录，删除历史记录
    $('.btn-del').click(function(){
        var arr = getHistory();
        arr.splice(0);
        console.log(arr);
        var jsonStr = JSON.stringify(arr);
        localStorage.setItem('search-list',arr);
        render();
    })


    //给每个历史记录li里面的x注册点击事件，删除信息
    $('.lt-history').on('click','.i-del',function(){
        var that = this;
       mui.confirm('你确定要删除该条记录吗？', '温馨提示', ['取消','确认'], function( e ) {
           //console.log( e );
           if( e.index === 1 ){
            var index = $(that).data('index');
            var arr = getHistory();
            arr.splice(index, 1);
            var jsonStr = JSON.stringify(arr);
            localStorage.setItem('search-list',jsonStr);
            render();
           }
       });
    })


    //点击搜索框，把input里面的内容添加到search-list中去
    $('.search-btn').click(function(){
        console.lo

        var txt = $('.search-input').val();
        if(txt.trim() === ''){
            mui.toast('请输入搜索关键字');
            return;
        }
        var arr = getHistory();
        if( arr.length >=10){
            arr.pop();
        }
        if(arr.indexOf(txt) > -1){
            arr.splice(arr.indexOf(txt),1);
        }
        arr.unshift(txt);
        var jsonStr = JSON.stringify(arr);
        localStorage.setItem('search-list',jsonStr);
        render();
        $('.search-input').val('');
        location.href = 'searchList.html?key='+ txt;
    })
   

  


})