<template>
    <div id="add">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="姓名">
                <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
                <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.gender">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="头像">
                <fileUpdata fileName="file"
                            action="http://47.98.128.191:3000/images/uploadImages"
                            @onSuccess="upload">
                </fileUpdata>
            </el-form-item>
            <el-form-item label="专业">
                <el-select v-model="form.subjectsId" placeholder="请选择专业">
                    <el-option v-for="v in subject" :key="v._id" :label="v.name"
                               :value="v._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="班级">
                <el-select v-model="form.classesId" placeholder="请选择班级">
                    <el-option v-for="v in clas" :key="v._id" :label="v.name"
                               :value="v._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import fileUpdata from "@/components/fileUpdata.vue";
export default {
    name: 'add',
    data() {
        return {
            form: {
                name: '',
                age: '',
                gender: '男',
                imagePath: '',
                subjectsId: '',
                classesId: ''
            },
            subject: [], clas: []
        }
    },
    components: {
        fileUpdata
    },
    methods: {
        //图片对象存到data中
        upload(path) {
            this.form.imagePath = path;
        },
        async onSubmit() {
            let a = await this.$http.student.postStudent(this.form)

            if (a.code == 1) {
                this.$message.success(a.message)
                this.$router.push('/home/stums')
            } else { alert('添加失败') }
        },
        //班级数据获取
        async getClass() {
            let ss = await this.$http.classes.getClasses();
            this.clas = ss.data.rows
        },
        //专业获取
        async getSub() {
            let s = await this.$http.subjects.getSubjects();
            this.subject = s.data.rows
        }
    },
    created() {
        this.getClass(); this.getSub();
    }
}
</script>
<style lang="scss" scoped>
#add {
    box-shadow: 0 0 15px 3px rgb(170, 167, 167);
    width: 300px;
    padding: 20px;
}
</style>
