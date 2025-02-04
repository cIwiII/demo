<template>
    <div id="stuPut">
        <div>
            姓名：<input type="text" v-model="stuobj.name">
        </div>
        <div>
            年龄：<input type="text" v-model="stuobj.age">
        </div>
        <div>
            性别：
            <label for="b">男</label>
            <input type="radio" v-model="stuobj.gender" id="b" value="男">
            <label for="g">女</label>
            <input type="radio" v-model="stuobj.gender" id="g" value="女">
        </div>
        <div>

        </div>
        <div @click="putData">确认修改</div>
        <div @click="$router.push('/home/stums')">取消</div>
    </div>
</template>

<script>
export default {
    name: 'stuPut',
    data() {
        return {
            stuobj: {

            }
        }
    },
    methods: {
        async getAStuData(id) {
            let res = await this.$http.student.getAStudent(id)

            // console.log(res)
            this.stuobj = res.data.data
        },
        async putData(){
            let res=await this.$http.student.putStudent(this.stuobj)
            
            alert(res.data.message)
            if(res.data.code==1){
// console.log(res)
                this.$router.push('/home/stums')
            }
        }
    },
    created() {
        const id = this.$route.query.id
        // console.log(this.$router)
        // console.log(this.$route)
        this.getAStuData(id)
    }
}
</script>

<style lang="scss" scoped>
#stuPut {
    margin: 10px;
    padding: 10px;
    background-color: rgba(255, 127, 80, 0.562);
}
</style>