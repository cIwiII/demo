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
            头像：
            <fileUpdata fileName="file"
                        action="http://47.98.128.191:3000/images/uploadImages"
                        @onSuccess="upload">
            </fileUpdata>
        </div>
        <div @click="putData">确认修改</div>
        <div @click="$router.push('/home/stums')">取消</div>
    </div>
</template>

<script>
import fileUpdata from "@/components/fileUpdata.vue";
export default {
    name: 'stuPut',
    components: {
        fileUpdata
    },
    data() {
        return {
            stuobj: {

            }
        }
    },
    methods: {
        //图片对象存到data中
        upload(path) {
            this.stuobj.imagePath = path;
        },
        async getAStuData(id) {
            let res = await this.$http.student.getAStudent(id)

            // console.log(res)
            this.stuobj = res.data
        },
        async putData() {
            // console.log(this.stuobj)
            let res = await this.$http.student.putStudent(this.stuobj)
            this.$message.success(res.message)
            if (res.code == 1) {
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