<template>
  <div>
    <table border="1">
        <tr>
             <th>
                <input type="checkbox" @change="allCheckStatus" v-model="allChecked">
             </th>
            <th>编号</th>
            <th>名字</th>
            <th>操作</th>
        </tr>
        <tr v-for="item in list" :key="item.id">
            <td>
                <input type="checkbox" v-model="item.checked">
            </td>
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td><button>删除</button></td>
        </tr>
    </table>
    <button>反选</button>
    <button>删除</button>
  </div>
</template>

<script>

export default {
    data(){
        return{
            list:[
                {id:1,name:"小米",checked:true},
                {id:2,name:"华为",checked:false},
                {id:3,name:"魅族",checked:true},
                {id:4,name:"oppo",checked:false}
            ],
            allChecked:true
        }
    },
    methods:{
        allCheckStatus(){
            this.allChecked = !this.allChecked
            // 获取到list中所有的数据，进行遍历判断是否设置为truefalse
        }
    },
    watch:{
        list:{
            handler(){
                const bool = this.list.every(item=>item.checked)
                this.allChecked = bool
            },
            deep:true,
            immediate:true
        }
    }
}
</script>

<style>

</style>