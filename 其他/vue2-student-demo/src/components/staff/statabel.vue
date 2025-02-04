<template>
    <div class="tab">
        <table>
            <thead>
                <tr>
                    <th>
                        <input
                            type="checkbox"
                            v-model="allChiose"
                            @click="putAllStatu"
                        />
                    </th>
                    <th>编号</th>
                    <th>名字</th>
                    <th>部门</th>
                    <th>性别</th>
                    <th>年龄</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in renderArr" :key="i.id">
                    <td>
                        <input
                            type="checkbox"
                            name=""
                            id=""
                            v-model="i.status"
                            @click="$emit('parStatu', i.id)"
                        />
                    </td>
                    <td>{{ i.id }}</td>
                    <td>{{ i.name }}</td>
                    <td>{{ i.dept }}</td>
                    <td>{{ i.gender == 1 ? "男" : "女" }}</td>
                    <td>{{ i.age }}</td>
                    <td>
                        <button @click="$emit('parPut', i.id)">修改</button>
                        <button @click="$emit('parDel', i.id)">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="delAllStatu">删除选中</button>
    </div>
</template>

<script>
export default {
    props: ['staArr', 'filt', 'sear'],
    data() {
        return {
            allChiose: true
        }
    },
    methods: {
        //状态切换
        putAllStatu() {
            if (this.allChiose != true) {
                this.renderArr.forEach((v) => {
                    v.status = true
                });
                // this.$emit('parAllStatu',arr)
            } else {
                this.renderArr.forEach((v) => {
                    v.status = false
                });
            }
        },
        //删除选中
        delAllStatu() {
            let newArr = this.renderArr.filter((v) => {
                return v.status
            });
            let newIdArr=newArr.map((v)=>v.id)
            this.$emit('parAllStatu',newIdArr)
        }
    },
    watch: {
        renderArr: {
            handler() {
                if (this.renderArr.every((v) => v.status)) {
                    this.allChiose = true;
                } else {
                    this.allChiose = false;
                }

            },
            deep: true,
            immediate: true,
        }
    },
    computed: {
        renderArr() {
            if (this.filt == '编号') {
                return this.staArr.filter((v) => (v.id + '').includes(this.sear));
            } else if (this.filt == '名字') {
                return this.staArr.filter((v) => v.name.includes(this.sear));
            } else if (this.filt == '部门') {
                return this.staArr.filter((v) => v.dept.includes(this.sear));
            } else if (this.filt == '性别') {
                return this.staArr.filter((v) => v.gender == (this.sear == '1' ? 1 : 0));
            } else if (this.filt == '年龄') {
                return this.staArr.filter((v) => (v.age + '').includes(this.sear));
            } else {
                return this.staArr
            }

        }
    }
}
</script>

<style lang="scss" scoped>
.tab{
table {
    width: 600px;
    text-align: center;
}
>button{
  margin: 10px 0 20px 0px;
}
}

</style>