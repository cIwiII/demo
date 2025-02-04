<template>
    <div id='addClas'>

        <label for="">选择专业</label>
        <select name="" id="" v-model="obj.subjectsId">
            <option value="未选择专业">未选择专业</option>
            <option v-for="v in subjects" :key="v._id" :value="v._id">{{v.name}}
            </option>
        </select>
        <label for="">班级名称</label><input type="text" v-model="obj.name"
               placeholder="请输入班级名字">
        <div>
            <button v-on:click="postClas">确认新增</button>
            <button v-on:click="cancel">取消</button>
        </div>

    </div>
</template>

<script>
export default {
    name: 'addClas',
    data() {
        return {
            subjects: [], obj: { name: '', subjectsId: '未选择专业' }
        }
    },
    methods: {
        async postClas() {
            if (this.obj.name.length == 0) {
                alert('班级不能为空'); return
            }
            if (this.obj.subjectsId == '未选择专业') {
                alert('请选择一个专业'); return
            }
            let res = await this.$http.classes.postClasses(this.obj);
            if (res.code == 1) {
                this.$message.success(res.message)
                this.$router.push('/home/clams');
            }else{
                alert(res.message)
            }
        },
        async getSub() {
            let res = await this.$http.subjects.getSubjects();
            console.log(res)
            if (res.code == 1) {
                this.subjects = res.data.rows
            }
        },
        cancel() {
            this.$router.push('/home/clams');
        }
    },
    created() {
        this.getSub();
    },
    //销毁前
    beforeDestroy() {
        console.log('销毁');
        this.cancel();
    }
}
</script>

<style lang="scss" scoped>
</style>