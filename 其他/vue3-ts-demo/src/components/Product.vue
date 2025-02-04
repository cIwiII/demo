<template>
    <div>

        <a-card title="添加商品" style="width:100%">
            <template #extra>
                <div class="addUser" @click="showModal">添加
                    <a-modal v-model:visible="visible" title="添加商品" footer>
                        <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
                            <a-form-item label="商品名字">
                                <a-input v-model:value="state.addProductObj.name" />
                            </a-form-item>
                            <a-form-item label="商品的描述">
                                <a-input v-model:value="state.addProductObj.title" />
                            </a-form-item>
                            <a-form-item label="商品的价格">
                                <a-input-number v-model:value="state.addProductObj.price" :min="1" :max="9999999" />
                                <a-button type="primary" @click="state.addProductObj.price = 99">Reset</a-button>

                            </a-form-item>
                            <a-form-item label="商品的分类">
                                <a-cascader v-model:value="state.addProductObj.type" :options="state.cateData"
                                            expand-trigger="hover" placeholder="Please select" />
                            </a-form-item>
                            <a-form-item label="上传图片">
                                <a-input v-model:value="state.addProductObj.imgSrc" />
                            </a-form-item>
                            <a-form-item label="商品的详情">
                                <a-input v-model:value="state.addProductObj.msg" />
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
                        <a-button @click="deleteRow(record.key)">删除</a-button>
                    </template>
                    <template v-if="column.key === 'tags'">
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
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import { findGoods, addGoods, findAllCategroy,findCategroy } from '../../apis/index'
import { string } from 'vue-types';
// import {message} from 'antd'
const columns = [
    {
        name: 'Name',
        title: "商品名字",
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '商品描述',
        dataIndex: 'title',
        key: 'age',
    },
    {
        title: '价格',
        key: 'tags',
        dataIndex: 'price',
    },
    {
        title: '商品类型',
        dataIndex: 'type',
        key: 'address',
        width: 200,
        customRender: (type: any) => {
            // console.log('abcd',type)
            return type.value.name
        }
    },
    {
        title: '操作'
    },
];
const state = reactive({
    data: [{ name: '', _id: '',type:{name:''} }], cateData: [{ value: '', label: '' }],
    addProductObj: {
        name: '', title: '', price: 99, type: '', imgSrc: '', msg: ''
    },
})

const deleteRow = (id: string) => {
    console.log(id);
}

onMounted(() => {
    fetchData()
})
const fetchData = async () => {
    // const result = await axios.get("http://127.0.0.1:8002/goods/findGoods")
    const result = await findGoods()
    // console.log('产品数据返回→',result);
    // console.log(123);
    if (result.data.code === 1) {
        state.data = result.data.data
    }
}
//添加用户
const visible = ref<boolean>(false);
const showModal = () => {
    visible.value = true;
    //点开模态发送请求
    getCate()
};
//获取联级分类
const getCate = async () => {
    const res = await findAllCategroy()
    // debugger
    if (res.data.code == 1) {
        state.cateData = res.data.data
    }
}
//清空
const resetFields = () => {
    state.addProductObj = {
        name: '', title: '', price: 99, type: '', imgSrc: '', msg: ''
    }
}
//确认添加
const onSubmit = async () => {
    console.log(state.addProductObj);
    const obj = state.addProductObj
    const name = obj.type[0]
    const res1=await findCategroy()
    if(res1.data.code!=1){return}
    const pro = res1.data.data.data.find((v:{name:string})=> v.name == name)
    if (pro) {
        obj.type =pro._id
        const res = await addGoods(obj)
        if (res.data.code === 1) {
            fetchData()
            visible.value = false;
        }
    }else{
        console.log('未找对对应产品分类')
    }


}
</script>

<style lang='less' scoped>
</style>