<template>
    <div>
        <a-card title="用户列表" style="width:100%">
            <template #extra>
                <div class="addUser" @click="showModal">添加
                    <a-modal v-model:visible="visible" title="添加用户" footer>
                        <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
                            <a-form-item label="用户名">
                                <a-input v-model:value="state.addUserObj.account" />
                            </a-form-item>
                            <a-form-item label="密码">
                                <a-input v-model:value="state.addUserObj.password" />
                            </a-form-item>
                            <a-form-item label="邮箱">
                                <a-input v-model:value="state.addUserObj.email" type="email" />
                            </a-form-item>
                            <a-form-item label="角色">
                                <a-select v-model:value="state.addUserObj.role" placeholder="请选择角色">
                                    <a-select-option v-for="item in state.roleData" :value="item._id">{{item.name}}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item :wrapper-col="{ span: 14, offset: 6 }">

                                <a-button style="margin-left: 10px" @click="resetFields">重置</a-button>
                                <a-button type="primary" @click.prevent="onSubmit">确认添加</a-button>
                            </a-form-item>
                        </a-form>
                    </a-modal>
                </div>
            </template>
            <a-table :columns="columns" :data-source="state.data">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.title === '操作'">
                        <a-button @click="deleteRow(record._id)">删除</a-button>
                    </template>
                    <template v-else>
                        <a href="#" :key="item" v-for="item in record.tags">
                            {{ item }}
                        </a>
                    </template>
                </template>
            </a-table>
        </a-card>

    </div>
</template>

<script lang='ts' setup>
import { reactive, ref, onMounted } from 'vue'
import {message} from 'ant-design-vue'
import { IUserState, IUserAdd } from '../.../../../types/project'
import { login, getAccountList, accountadd, deleteUser, findRoles } from '../../apis/index'
onMounted(() => {
    fetchData()
})

const columns = [
    {
        name: 'Name',
        title: "用户名字",
        dataIndex: 'account',
        key: 'name',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'age',
    },
    {
        title: '角色',
        dataIndex: 'role',
        key: 'address',
        width: 200,
        customRender: (role: any) => {
            // console.log('abcd',type)
            return role.value.name
        }
    },
    {
        title: '操作'
    },
];
const state = reactive<IUserState>({
    data: [], roleData: [],
    addUserObj: {
        account: '', password: '', email: '', role: ''
    }

})
//添加用户
const visible = ref<boolean>(false);
const showModal = () => {
    visible.value = true;
    //点开模态发送请求
    getAllRole()
};
//清空
const resetFields = () => {
    state.addUserObj = {
        account: '', password: '', email: '', role: ''
    }
}

//确认添加
const onSubmit = async () => {
    message.success('This is a success message');
    const res=await accountadd(state.addUserObj)
    if(res.data.code===1){
        message.success(res.data.msg)
        fetchData()
        visible.value = false;
    }
    
}

//删除用户
const deleteRow = async (id: string) => {
    // console.log(id);
    const res = await deleteUser(id)
    // console.log(res)
    if(res.data.code===1){
        // message.success(res.data.msg)
        fetchData()
    }
}


const fetchData = async () => {
    const result = await getAccountList()
    if (result.data.code === 1) {
        state.data = result.data.data
    }
}
const getAllRole = async () => {
    const res = await findRoles()
    if (res.data.code === 1) {
        state.roleData = res.data.data
    }
}
</script>

<style lang='less' scoped>
.addUser {
    padding: 0.5rem 2rem;
    background-color: rgb(90, 157, 201);
    border-radius: 5px;
    color: aliceblue;

    &:hover {
        color: rgb(13, 9, 213);
    }
}
</style>