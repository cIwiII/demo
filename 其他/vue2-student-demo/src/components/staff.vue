<template>
    <div id="sta">
        <staadd @parAdd="parAdd" :depts="depts"></staadd>
        <stasearch @putfilt="putfilt"></stasearch>
        <staput :depts="depts" :obj="obj" @parPut2="parPut2"></staput>
        <statabel :staArr="staArr" @parPut="parPut" @parDel="parDel" @parStatu="parStatu" :filt="filt" :sear="sear" @parAllStatu="parAllStatu"></statabel>
    </div>
</template>

<script>
import staadd from './staff/staadd.vue'
import staput from './staff/staput.vue'
import stasearch from './staff/stasearch.vue'
import statabel from './staff/statabel.vue'

export default {
    data(){
        return {
            staArr:[
                {id:1,name:'张三',dept:'咨询部',gender:1,age:23 ,status:false},
                {id:2,name:'李四',dept:'市场部',gender:0,age:20,status:false}
            ],
            depts:[
                {id:1,name:'咨询部',status:true},
                {id:2,name:'市场部',status:true},
                {id:3,name:'研发部',status:true},
                {id:4,name:'渠道部',status:true},
                {id:5,name:'教学部',status:true}
                ],
            num:3,filt:'',sear:'',obj:null
        }
    },
    methods:{
        //表格中的修改删除
        parPut(v){
            this.obj=this.staArr.find((b)=>b.id==v)
        },
        parDel(v){
            this.staArr=this.staArr.filter((b)=>b.id!=v)
        },
        parAdd(name,dept,gender,age){
            this.staArr.push( {id:this.num,name,dept,gender,age} );
            this.num++
        },
        putfilt(a,b){
            console.log('搜索条件改变')
            this.filt=a;
            this.sear=b;
        },
        //确认修改
        parPut2(name,dept,gender,age){
            this.obj.name=name;
            this.obj.dept=dept;
            this.obj.gender=gender;
            this.obj.age=Number(age);
            this.obj=null;
        },
        //修改状态
        parStatu(v){
            let vc=this.staArr.find((c)=>c.id==v);
            vc.status=!vc.status
        },
        //批量删除
        parAllStatu(arr){
            this.staArr=this.staArr.filter((v)=>{
                return !(arr.includes(v.id))
            })
        }
    },

    components: {
        staadd,
        staput,
        stasearch,
        statabel
    }
}
</script>

<style lang="scss">
#sta{
    margin: 0 auto;
    width: 1200px;
    // background-color: rgb(163, 94, 113);
    div{
        margin: 10px auto;
        width: 600px;

        
    }
}
</style>