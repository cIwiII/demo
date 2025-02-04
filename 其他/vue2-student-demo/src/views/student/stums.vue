<template>
    <div id="stums">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="类型">
                <el-select v-model="formInline.type" placeholder="请类型">
                    <el-option label="姓名" value="name"></el-option>
                    <el-option label="年龄" value="age"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="搜索内容">
                <el-input v-model="formInline.value" placeholder="搜索内容">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="$router.push('/home/add')" v-auth='[1]'>添加</el-button>
            </el-form-item>
          
        </el-form>
        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column fixed prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="60">
            </el-table-column>
            <el-table-column prop="classesId.name" label="班级" width="220">
            </el-table-column>
            <el-table-column prop="subjectsId.name" label="学科" width="120">
            </el-table-column>
            <el-table-column prop="gender" label="性别" width="100">
            </el-table-column>
            <el-table-column prop="imagePath" label="头像" width="120">
                <template slot-scope="scope">
                    <img :src="scope.row.imagePath" alt="暂无图片" width="50">
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text"
                               size="small">查看</el-button>
                    <el-button type="text" size="small" @click="$router.push('/home/stuPut?id='+scope.row._id)">修改</el-button>
                    <el-button type="text" size="small" @click="stuDele(scope.row._id)" v-auth="[1]">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="stufoot">
            <pagevue :total="total" 
            @changePage="changePage" 
            @changeSize="changeSize"
            :currentPage='formInline.currentPage'
            :pageSize='formInline.pageSize'></pagevue>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
import pagevue from '@/components/pageing.vue'
export default {
    components: {
        pagevue,
    },
    methods: {
        handleClick(row) {
            console.log(row);
        },
        onSubmit() {
            this.getData(this.formInline)
        },
         async stuDele(v) {
            let res = await this.$http.student.deleteStudent(v);
            if (res.code == 1) {
                console.log('删除执行');
                this.getData();
            } else { console.log('删除失败') }
        },
        async getData() {
            let res = await this.$http.student.getAllStudent(this.formInline);
            this.tableData = res.data.rows
            this.total = res.data.total  //分页组件使用
        },
        //改变页数
        changePage(v){
            this.formInline.currentPage=v
            this.getData();
        },
        //改变条数,页数重置为1
        changeSize(v){
            this.formInline.pageSize=v
            this.formInline.currentPage=1
            this.getData();
        }
    },
    data() {
        return {
            tableData: [],
            formInline: {
                value: '',
                type: '',
                pageSize:10,
                currentPage:1
            },total: 400,
        }
    },
    created() {
        this.getData()
    }
}
</script>

<style lang="scss" scoped>
#stums {
    margin: 20px 5px;
   .demo-form-inline{
        .el-select,.el-input{
            width: 120px;
        }
   }
    table tr td div{
        text-align: center;
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
