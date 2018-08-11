$(function(){
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategory',
        dataType: 'json',
        success: function( info ) {
            //console.log( info );
            var leftStr = template('leftTmp',info);
            $('.leftUl').html(leftStr);
           
        }
    })

    render();
    $('.leftUl').on('click','a',function(){
        $('.leftUl a').removeClass('current');
        $(this).addClass('current');
        var id = $(this).data('id');
        console.log( id );
        render(id);
    })

   
    function render(id){
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategory',
            data:  { id:id || 1},
            dataType: 'json',
            success: function( info ) {
                console.log(info);
                var rightStr = template('rightTmp', info);
                $('.rightUl').html(rightStr);
            }
        })
    }
})