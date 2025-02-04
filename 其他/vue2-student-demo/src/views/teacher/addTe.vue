<template>
    <div id="addTe">
        <div>姓名：<input type="text" v-model="teObj.name"></div>
        <div>教授课程：
            <select v-model="teObj.subjectsId">
                <option v-for="v in subArr" :key="v._id" :value="v._id">
                    {{v.name}}</option>
            </select>
        </div>
        <div @click="addTe">确认添加</div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            teObj: {
                name: '',
                subjectsId: '',
            },
            subArr: [],
        }
    },
    methods: {
        async getAllSub() {
            let res = await this.$http.subjects.getSubjects()

            this.subArr = res.data.data.rows
        },
        async addTe() {
            // let arr='JavaScript中,对象是引用类型的数据,当多个实例,引用同一个对象时,只要一个实例,对这个对象进行操作,其他实例中的数据,也会发生变化,而在Vue中,更多的是想要复用组件,那就需要每个组件,都有自己的数据,这样组件之间,才不会相互干扰'
            // arr=arr.split(',').reverse()
            // for (let i = 0; i < arr.length; i++) {
            //     this.teObj.name = arr[i]
            //     this.teObj.subjectsId=this.subArr[parseInt(Math.random()*12)]._id
                let res = await this.$http.teacher.addTeacher(this.teObj)
                alert(res.data.message)
            // }

            if (res.data.code == 1) {
                this.teObj = { name: '', subjectsId: '', }
            }
        }
    },
    created() {
        this.getAllSub();
    }
}
</script>
<style lang="scss" scoped>
#addTe {
    margin-top: 20px;
}
</style>