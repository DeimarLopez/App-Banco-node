$(document).ready(function(){
    $('.btnEliCli').on('click',function(){
        let btn=$('.btnEliCli').index(this);
        let doc=$('.doc').eq(btn);

        let d=doc.val();

        alert(d);
        $.ajax({
            type:"POST",
            url:'/eliminarCli',
            data:{
                do:d
            },

            success:function(res){

            }
        });
    })
})