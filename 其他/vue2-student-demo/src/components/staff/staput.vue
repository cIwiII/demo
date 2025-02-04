<template>
    <div class="put">
        <h3>修改员工</h3>
        <table>
            <tr>
                <td>用户名：</td>
                <td><input type="text" v-model="name" /></td>
            </tr>
            <tr>
                <td>部门：</td>
                <td>
                    <select v-model="dept">
                        <option v-for="d in depts" :key="d.id" :value="d.name">
                            {{ d.name }}
                        </option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>性别：</td>
                <td>
                    <label for="boy">男</label
                    ><input id="boy" type="radio" value=1 v-model="gender" />
                    <label for="girl">女</label
                    ><input id="girl" type="radio" value=0 v-model="gender" />
                </td>
            </tr>
            <tr>
                <td>年龄：</td>
                <td><input type="number" value="0" v-model="age" /></td>
            </tr>
        </table>
        <button @click="sonPut">修改</button>
    </div>
</template>

<script>
export default {
    props: ['depts', 'obj'],
    data() {
        return {
            name: '', dept: '', gender: '', age: ''
        }
    },
    watch: {
        obj: {
            handler() {
                 console.log(this.obj)
                if (this.obj != null) {
                    this.name = this.obj.name; this.dept = this.obj.dept;
                    this.gender = this.obj.gender; this.age = this.obj.age;
                } else {
                    this.name = ''; this.dept = ''; this.gender = ''; this.age = ''
                }
            },
            deep: true,
            immediate: true,
        }
    },
    methods:{
        sonPut(){
            this.$emit('parPut2', this.name,this.dept,this.gender,this.age);

        }
    }
}
</script>

<style lang="scss" scoped>
.put {
    border: 1px solid rgb(153, 149, 149);
    padding-left: 30px;
    table {
        tr {
            td:nth-child(1) {
                width: 100px;
            }
            td:nth-child(2) {
                width: 470px;
                #boy,#girl{
                    margin-right: 10px;
                }
            }
        }
    }
    button {
        color: #fff;
        padding: 5px 15px;
        background-color: rgb(28, 112, 4);
    }
}
</style>