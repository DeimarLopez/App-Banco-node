$(document).ready(function(){
    $('.btneli').on('click',function(){
        let btn=$('.btneli').index(this);
        let doc=$('.doc').eq(btn);
        let usu=$('.usu').eq(btn);
        let cla=$('.cla').eq(btn);  
        let rol=$('.rol').eq(btn);  
        let est=$('.est').eq(btn);  
        let img=$('.img').eq(btn);  
        let d=doc.val();
        let u=usu.val();
        let c=cla.val();
        let r=rol.val();
        let e=est.val();
        let i=img.val();

        alert(d);
        $.ajax({
            type:"POST",
            url:'/eliminarUsu',
            data:{
                do:d,
                us:u,
                cl:c,
                ro:r,
                es:e,
                im:i
            },

            success:function(res){

            }
        });
    })
})