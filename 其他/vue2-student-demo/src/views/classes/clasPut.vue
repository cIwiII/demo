<template>
    <div id="clasPut">
        <h3>班级修改</h3>
        
            <div class="clasname">
                <input type="text" v-model="clasObj.name">
            </div>
            <select name="" id="" v-model="clasObj.subjectsId">
                <option v-for="v in subjectsArr" :key="v._id" :value="v._id">
                    {{v.name}}</option>
            </select>
                <div @click="sruePut">确认修改</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            clasObj: { name: '小王' },
            subjectsArr: []
        }
    },
    methods: {
        //一个班级数据
        async getAData(id) {
            let res = await this.$http.classes.getAClasses(id)
            
            this.clasObj = res.data.data.data
        },
        //所有专业科目数据
        async getAllclasses() {
            let res = await this.$http.subjects.getSubjects();
            this.subjectsArr = res.data.data.rows
        },
        //确认修改
        async sruePut(){
            let res=await this.$http.classes.putClasses(this.clasObj)
            //  console.log(res)
            alert('一条数据获取成功')
        }
    },
    created() {
        const id = this.$route.query.id
        this.getAData(id);
        this.getAllclasses();
    }
}
</script>

<style lang="scss" scoped>
.clasname{
    margin-bottom: 20px;
}
</style>