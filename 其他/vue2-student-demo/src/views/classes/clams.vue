<template>
    <div id="clas">

        <span>班级管理</span>
        <!-- <router-link :to="$router.push('/home/addClas')">新增班级</router-link> -->

        <el-table :data="clasArr" border style="width: 100%;">
            <el-table-column fixed prop="_id" label="编号" width="220"
                             align='center'>
            </el-table-column>
            <el-table-column prop="name" label="班级" width="120" align='center'>
            </el-table-column>
            <el-table-column prop="subjectsId.name" label="所属专业" width="220"
                             align='center'>
            </el-table-column>
            <el-table-column prop="students.length" label="学生数量" width="120"
                             align='center'>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align='center'>
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text"
                               size="small">查看</el-button>
                    <el-button type="text" size="small"
                               @click="$router.push('/home/clasPut?id='+scope.row._id)">
                        修改</el-button>
                    <el-button type="text" size="small"
                               @click="deleClas(scope.row._id)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="ctrlPage">
            <pagevue :total="total" @changeSize="changeSize"
                     @changePage="changePage" :pageSize="searchObj.pageSize"
                     :currentPage="searchObj.currentPage">
            </pagevue>
        </div>

    </div>
</template>

<script>
import pagevue from '@/components/pageing.vue'
export default {
    data() {
        return {
            clasArr: [], total: 0,
            searchObj: { type: null, value: null, pageSize: 10, currentPage: 1 }
        }
    },
    components: {
        pagevue
    },
    methods: {
        async getClasses() {
            let res = await this.$http.classes.getClasses(this.searchObj);
            // console.log(res)
            this.clasArr = res.data.rows
            this.total = res.data.total


        },
        // async putClas(e) {
        //     console.log('执行')
        //     let s=$(e.target).html()
        //     console.log(s)
        // let res = await this.$http.classes.putClasses(id, name);

        // },
        async deleClas(id) {
            console.log('班级删除中');
            let res = await this.$http.classes.deleteClasses(id);
            console.log(res.message)
            if (res.code == 1) {
                this.getClasses();
            }
        },
        changePage(v) {

            this.searchObj.currentPage = v
            this.getClasses();
        },
        changeSize(v) {
            this.searchObj.currentPage = 1
            this.searchObj.pageSize = v
            // console.log(this.searchObj)
            this.getClasses();
        }

    },
    created() {
        // this.status = this.$route.path
        this.getClasses();

    }
}
</script>

<style lang="scss" scoped>
#clas {
    padding: 10px;
    h3 {
        text-align: left;
    }
    .ctrlPage {
        margin-top: 20px;
        // div{
        //     display: inline-block;
        //    width: 80px;
        //     margin: 0 5px;
        //     background-color: chocolate;
        // }
    }
    #addClas {
        margin: 10px;
    }
}
</style>