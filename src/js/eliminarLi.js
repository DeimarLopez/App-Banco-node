$(document).ready(function(){
    $('.btnelili').on('click',function(){
        let btn=$('.btnelili').index(this);
        let doc=$('.cod').eq(btn); 
        let d=doc.val();

        alert(d);
        $.ajax({
            type:"POST",
            url:'/eliminarLi',
            data:{
                do:d
            },

            success:function(res){

            }
        });
    })
})