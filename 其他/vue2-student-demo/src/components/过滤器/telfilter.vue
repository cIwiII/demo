<template>
  <div>
    <table>
        <tr v-for="i in telObj" :key=i.id>
            <td>姓名:{{i.name}}</td>
            <td>
                手机号：{{i.tel | telfilter}}
            </td>

        </tr>
    </table>
  </div>

</template>

<script>
export default {
    data(){
        return{
            telObj:[
                {id:1,name:'a',tel:'13613615057'}
            ]
        }
    },
    filters:{
        telfilter(val){
            // return val.slice(0,3)+"****"+val.slice(7,11)
            // return val.substr(0,3)+"****"+val.substr(7,4)
            return val.substring(0,3)+"****"+val.substring(7,11)
        }
    }

}
</script>

<style>

</style>