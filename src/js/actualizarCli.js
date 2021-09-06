$(document).ready(function(){
    $('.btnActCli').on('click',function(){
        let btn=$('.btnActCli').index(this);
        let doc=$('.doc').eq(btn);
        let nom=$('.nom').eq(btn);
        let ape=$('.ape').eq(btn);  
        let email=$('.email').eq(btn);   
        let cel=$('.cel').eq(btn);   
        let genero=$('.genero').eq(btn);   
        let fecha=$('.fecha').eq(btn); 

        let d=doc.val();
        let n=nom.val();
        let a=ape.val();
        let e=email.val();
        let c=cel.val();
        let g=genero.val();
        let f=fecha.val();

        alert(d);
        $.ajax({
            type:"POST",
            url:'/actualizarCli',
            data:{
                do:d,
                no:n,
                ap:a,
                em:e,
                ce:c,
                ge:g,
                fe:f
            },

            success:function(res){

            }
        });
    })
})