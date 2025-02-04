<template>
    <div id="add">
        <table>
            <tr>
                <td>学生名字:</td>
                <td><input class="wid175" type="text" v-model="student.name"
                           placeholder="请输入学生姓名">
                </td>
            </tr>
            <tr>
                <td>学生年龄:</td>
                <td><input type="text" v-model="student.age" class="wid175">
                </td>
            </tr>
            <tr>
                <td>学生性别:</td>
                <td class="gen">
                    <label for="b">男</label>
                    <input type="radio" id="b" v-model="student.gender"
                           value="男">
                    <label for="g">女</label>
                    <input type="radio" id="g" v-model="student.gender"
                           value="女">
                </td>
            </tr>
            <tr>
                <td>学生专业:</td>
                <td>
                    <select name="" id="" v-model="student.subjectsId">
                        <option :value="v._id" v-for="v in subject"
                                :key="v._id">{{v.name}}</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>学生班级:</td>
                <td>
                    <select name="" id="" v-model="student.classesId">
                        <option :value="v._id" v-for="v in clas" :key="v._id">
                            {{v.name}}</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>学生头像:</td>
                <td>
                    <fileUpdata fileName="file"
                                action="http://47.98.128.191:3000/images/uploadImages"
                                @onSuccess="upload">
                    </fileUpdata>
                </td>
            </tr>
        </table>
        <div><button @click="adds">添加</button></div>
    </div>
</template>

<script>
import fileUpdata from "@/components/fileUpdata.vue";
export default {
    name: 'add',
    data() {
        return {
            student: {
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
            this.student.imagePath = path;
        },
        async adds() {
            let a = await this.$http.student.postStudent(this.student)
            console.log(a)
            if (a.data.code == 1) {
                this.student = {
                    name: '',
                    age: '',
                    gender: '男',
                    imagePath: '',
                    subjectsId: '',
                    classesId: ''
                }
            } else { alert('失败') }
        },
        //班级数据获取
        async getClass() {
            let ss = await this.$http.classes.getClasses();
            this.clas = ss.data.data.rows
        },
        //专业获取
        async getSub() {
            let s = await this.$http.subjects.getSubjects();
            this.subject = s.data.data.rows
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
    table {
        tr {
            height: 30px;
            td {
                &:nth-child(1) {
                    width: 80px;
                }
                .wid175,
                select {
                    width: 175px;
                }
            }
        }
    }
    div {
        margin: 30px 0 0 20;
        button {
            padding: 5px 20px;
        }
    }
}
</style>
