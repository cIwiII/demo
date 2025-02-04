<template>
    <div id="stums">
        <!-- <keep-alive>
            <component :is="page" @putPage="putPage" :parThArr="parThArr"></component>
        </keep-alive> -->
        <div class=" fil">
            <select v-model="se" @change="inVal=''">
                <option v-for="i in filArr" :key="i.id" :value="i.name">
                    {{i.name}}</option>
            </select>
            <input type="text" v-model="inVal">
            <button v-on:click="search">搜索</button>
            <button @click="$router.push('/home/add')">
                添加
            </button>
        </div>
        <table>
            <thead>
                <tr>
                    <th v-for="n in parThArr" :key="n.id">{{n.title}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in arr" :key="i._id">
                    <td>
                        <div>{{i.name}}</div>
                    </td>
                    <td>
                        <div>{{i.age?i.age:'没有age'}}</div>
                    </td>
                    <td>{{i.classesId?i.classesId.name:'暂无班级'}}</td>
                    <td>{{i.subjectsId?i.subjectsId.name:'牛鼻'}}</td>
                    <td>{{i.gender?i.gender:'未选'}}</td>
                    <td>
                        <img :src="i.imagePath" alt="暂无头像">
                        {{i.head}}
                    </td>
                    <td>
                        <span v-on:click="stuPut(i._id)">修改</span>
                        <span v-on:click="stuDele(i._id,-1)">删除</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="stufoot">
            <pagevue :pages="pages" @pageing="getData" :size="size"></pagevue>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
import pagevue from '@/components/pageing.vue'
export default {
    props: ['parThArr'],
    data() {
        return {
            arr: [], se: '姓名', inVal: '', pages: 0, page: 0, size: 10,
            //刷选option
            filArr: [
                { id: 1, name: '姓名' },
                { id: 2, name: '年龄' },
                { id: 3, name: '科目' },
                { id: 4, name: '班级' }
            ]
        }
    },
    components: {
        pagevue
    },
    methods: {
        async stuDele(v,b) {
            let dele = await this.$http.student.deleteStudent(v);
            if (dele.data.code == 1) {
                console.log('删除执行'); console.log(dele)
                //保证筛选情况下删除后更新数据
                this.getData(this.page, this.size,b);
            } else { console.log('删除失败') }
        },
        async search() {
            console.log('搜索执行')
            let pp = await this.$http.student.getAllStudent();
            let ps = pp.data.data.rows //每次搜索从后端数据库取

            if (this.se == '姓名') {
                this.arr = ps.filter((el) => {
                    if (el.name) { return el.name.includes(this.inVal) }
                    return false
                })
            } else if (this.se == '年龄') {
                this.arr = ps.filter((el) => {
                    if (el.age) { return el.age.includes(this.inVal) }
                    return false
                })
            } else if (this.se == '科目') {
                this.arr = ps.filter((el) => {
                    if (el.subjectsId) { return (el.subjectsId.name.includes(this.inVal)) }
                    return false
                })
            } else if (this.se == '班级') {
                this.arr = ps.filter((el) => {
                    if (el.classesId) { return el.classesId.name.includes(this.inVal) }
                    return false
                })
            } else { }
        },
        stuPut(v){
            this.$router.push('/home/stuPut?id='+v)
        },
        async getData(p, s,b) {
            if(b==-1|| p != this.page) {
                let data = await this.$http.student.getAllStudent(p, s);
                // console.log(data.data.data)
                this.page = p;
                this.arr = data.data.data.rows
                this.pages = data.data.data.pages  //分页组件使用
            }

        }
    },
    created() { this.getData(1, 10); }
}
</script>

<style lang="scss" scoped>
#stums {
    margin: 20px 5px;
    .fil {
        text-align: left;
        margin-bottom: 20px;
        > button {
            margin: 0 5px;
            cursor: pointer;
        }
    }
    table,
    th,
    td {
        border: 1px solid rgb(168, 165, 165);
    }
    table {
        width: 900px;
        border-collapse: collapse;
        tr {
            height: 30px;
        }
        td {
            width: 50px;
            img {
                width: 50px;
                height: 50px;
            }
        }
        td:nth-child(1) div {
            width: 100px;
        }
        td:nth-child(2) div {
            width: 50px;
        }
        td:last-child {
            width: 70px;
            span {
                padding: 2px 5px;
                display: inline-block;
                margin: 0 5px;
            }
        }
    }
    .stufoot {
        margin-top: 10px;
        text-align: left;
        button {
            padding: 0px 5px;
            margin: 0px 3px;
            text-align: center;
            cursor: pointer;
        }
    }
}
</style>
