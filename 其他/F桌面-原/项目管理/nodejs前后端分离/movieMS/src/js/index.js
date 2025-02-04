// index主js文件

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
$('#log').on('click',login);
function login(event){
 event.preventDefault();
 let acc=$('#acc').val(),pwd=$('#pwd').val();
 $.ajax({
    url:`/users/${acc}/${pwd}`,
    type:'get',
    success:function(data){
        alert(data.message);
        if(data.code==200){
            location.href='./user.html'
        }
    }
    
 })
}