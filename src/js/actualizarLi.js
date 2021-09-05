$(document).ready(function(){
    $('.btnactli').on('click',function(){
        let btn=$('.btnactli').index(this);
        let doc=$('.cod').eq(btn);
        let nom=$('.nom').eq(btn);
        let monto=$('.monto').eq(btn);  
        let plazo=$('.plazo').eq(btn);   
        let d=doc.val();
        let n=nom.val();
        let m=monto.val();
        let p=plazo.val();

        alert(d);
        $.ajax({
            type:"POST",
            url:'/actualizarLi',
            data:{
                do:d,
                no:n,
                mo:m,
                pl:p
            },

            success:function(res){

            }
        });
    })
})