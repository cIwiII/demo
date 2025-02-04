<template>
    <div id="putTe">
        <h3>修改</h3>
        <div>
            姓名：<input type="text" v-model="aTeObj.name">
        </div>
        <div>
            教授科目：
            <select name="" id="" v-model="aTeObj.subjectsId">
                <option v-for="v in allSubArr" :key="v._id" :value="v._id">
                    {{v.name}}
                </option>
            </select>
        </div>
        <div @click="putTe">确认修改</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            aTeObj: {
                name: '', subjectsId: '',
            },
            allSubArr: [],
            //             _id	是	string	教师 _id
            // name	是	string	教师名称
            // subjectsId
        }
    },
    methods: {
        //修改对象获取
        async getATeData(id) {
            let res = await this.$http.teacher.getATeacher(id);

            this.aTeObj = res.data.data
        },
        //所有科目获取
        async getAllSub() {
            let res = await this.$http.subjects.getSubjects();

            this.allSubArr = res.data.data.rows
        },
        async putTe() {
            let res = await this.$http.teacher.putTeacher(this.aTeObj)
            console.log(res)
            alert('确认修改')
            if (res.data.code == 1) {
                this.aTeObj = {
                    name: '', subjectsId: '',
                }
            }
        }
    },
    created() {
        const id = this.$route.query.id
        this.getATeData(id)
        this.getAllSub();

    }
}
</script>
<style lang="scss" scoped>
#putTe {
    margin-top: 20px;
}
</style>