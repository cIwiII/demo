<template>
    <div class="add">
        <h3>添加员工</h3>
        <table>
            <tr>
                <td>用户名：</td>
                <td><input type="text" v-model="name" /></td>
            </tr>
            <tr>
                <td>部门：</td>
                <td>
                    <select v-model="dept">
                        <option value="--部门--">--部门--</option>
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
                    ><input id="boy" type="radio" value="1" v-model="gender" />
                    <label for="girl">女</label
                    ><input id="girl" type="radio" value="0" v-model="gender" />
                </td>
            </tr>
            <tr>
                <td>年龄：</td>
                <td><input type="text" v-model="age" /></td>
            </tr>
        </table>
        <button @click="sonAdd">添加</button>
    </div>
</template>

<script>
export default {
    props: ['depts'],
    data() {
        return {
            name: '', dept: '--部门--', gender: 1, age: 0,
        }
    },
    methods: {
        sonAdd() {
            if (this.name.length <= 0 || this.dept == '--部门--') {
                alert('请填写完整信息'); return
            }
            this.$emit('parAdd', this.name, this.dept, this.gender, this.age)
            this.name = ''; this.dept = '--部门--'; this.gender = 1; this.age = 0;
        }
    }

}
</script>

<style lang="scss" scoped>
.add {
    border: 1px solid rgb(153, 149, 149);

    padding-left: 30px;

    table {
        tr {
            td:nth-child(1) {
                width: 100px;
            }
            td:nth-child(2) {
                width: 470px;
                select {
                    width: 173px;
                }
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