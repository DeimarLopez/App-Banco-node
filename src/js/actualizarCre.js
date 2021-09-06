$(document).ready(function(){
    $('.btnActCre').on('click',function(){

        let btn=$('.btnActCre').index(this);
        let cod=$('.cod').eq(btn);
        let doc=$('.doc').eq(btn);
        let codL=$('.codL').eq(btn);
        let nom=$('.mon').eq(btn);
        let fecha=$('.fecha').eq(btn);  
        let plazo=$('.plazo').eq(btn);   

        let d=doc.val();
        let c=cod.val();
        let cl=codL.val();
        let n=nom.val();
        let f=fecha.val();
        let p=plazo.val();

        alert(c);
        $.ajax({
            type:"POST",
            url:'/actualizarCre',
            data:{
                do:d,
                co:c,
                col:cl,
                no:n,
                fe:f,
                pl:p
            },

            success:function(res){
            }
        });
    })
})