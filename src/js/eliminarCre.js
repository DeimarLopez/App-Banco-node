$(document).ready(function(){
    $('.btnEliCre').on('click',function(){
        let btn=$('.btnEliCre').index(this);
        let cod=$('.cod').eq(btn);

        let c=cod.val();

        alert(c);
        $.ajax({
            type:"POST",
            url:'/eliminarCre',
            data:{
                co:c
            },

            success:function(res){

            }
        });
    })
})