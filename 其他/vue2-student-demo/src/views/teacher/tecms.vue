<template>
    <div>
        <h3>教师管理</h3>
        <div>搜索：<input type="text" v-model="searchVal">&nbsp;&nbsp;&nbsp;&nbsp;
            <button>确认搜索</button>&nbsp;&nbsp;&nbsp;
            <button @click="addTe">添加教师</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>编号</th>
                    <th>姓名</th>
                    <th>教授科目</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="v in tearchArr" :key="v._id">
                    <td>{{v._id}}</td>
                    <td>{{v.name}}</td>
                    <td>{{v.subjectsId?v.subjectsId.name:'无'}}</td>
                    <td>
                        <router-link :to="'/home/putTe?id='+v._id" tag="button">修改</router-link>&nbsp;&nbsp;&nbsp;
                        <!-- <button @click="$router.push('/home/putTe?id='+v._id)">修改</button>&nbsp;&nbsp;&nbsp; -->
                        <button @click="deleTe(v._id)">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tearchArr: [], searchVal: '',
        }
    },
    methods: {
        async getAllData() {
            let res = await this.$http.teacher.getTeacher()
            this.tearchArr = res.data.data.rows
        },
        teSearch() {
            console.log('搜索')
        },
        //删除
        async deleTe(id) {
            let res = await this.$http.teacher.delTeacher(id);
            if (res.data.code == 1) {
                this.getAllData();
            }

        },
        addTe(){
          this.$router.push('/home/addTe')
        },

    },
    created() {
        this.getAllData()
    }
}
</script>

<style lang="scss" scoped>
table,
th,
td {
    border: 1px solid rgb(168, 165, 165);
}
table {
    margin-top: 30px;
    width: 900px;
    border-collapse: collapse;
}
</style>