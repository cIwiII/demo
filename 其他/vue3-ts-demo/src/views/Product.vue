<template>
    <div>
        <a-table :columns="columns" :data-source="state.data">
            <!-- #bodyCell获取这一行的数据 -->
            <template #bodyCell="{ column, record }">
                <template v-if="column.title === '操作'">
                    <a-button @click="deleteRow(record._id)">删除</a-button>
                </template>
                <template v-if="column.key === 'type'">
                    {{ record.type.name }}
                </template>
                <template v-if="column.key === 'state'">
                    <a-button v-if="record.state == 0" type="default">上架</a-button>
                    <a-button v-else>下架</a-button>
                </template>
            </template>
        </a-table>
        <a-button @click="addProduct">添加</a-button>
    </div>
</template>

<script lang='ts' setup>
import { reactive, ref, onMounted } from 'vue'
import { findAllProduct,addProductApi } from "../apis/productApi"
const columns = [
    {
        name: 'Name',
        title: "商品名字",
        dataIndex: 'name',
        key: 'name',
        width: "100px",
        align: "center"
    },
    {
        title: '商品描述',
        dataIndex: 'msg',
        key: 'age',
        width: "500px",
        align: "center"
    },
    {
        title: '商品价格',
        dataIndex: 'price',
        key: 'address',
        width: "100px",
        align: "center"
    },
    {
        title: '商品类型',
        key: 'type',
        dataIndex: 'type',
        width: "100px",
        align: "center"
    },
    {
        title: '商品状态',
        key: 'state',
        dataIndex: 'state',
        width: "100px",
        align: "center"
    },
    {
        title: '操作',
        width: "200px",
        align: "center"
    },
];
const state = reactive({
    data: [
        {
            _id: "5fbf756526420000dc005032",
            name: "IPhone12",
            title: "Iphone12搭载最新的处理器，双面玻璃材质",
            price: 5999,
            type: {
                _id: "5fbcd068ea6c0000ff007f41",
                name: "手机",
                parentId: "5fbccd4aea6c0000ff007f33",
                type: "二级分类",
                updateDate: null
            },
            imgSrc: "img/1.jpg",
            msg: "iPhone 12采用后置双摄像头，有紫色、白色、绿色、黄色、黑色、红色六种颜色。宽：75.7毫米，高：150.9毫米，厚：8.",
            delstate: 1,
            state: 1
        },
    ]
})

const deleteRow = (id: string) => {
    console.log(id);
}

onMounted(() => {
    fetchData()
})
const fetchData = async () => {
    // const result = await axios.get("http://127.0.0.1:8002/goods/findGoods")
    // // 更新data，让表格动态渲染
    // console.log(result);
    // state.data = result.data.data
    const res = await findAllProduct()
    state.data = res.data
}

const addProduct =async () => {
    const obj = {
        name: "小米耳机",
        title: "便宜好用",
        price: 1200,
        type: "5fbcd068ea6c0000ff007f41",
        imgSrc: "1.jpg",
        msg: "这是描述"
    }
    const res = await addProductApi(obj)
    console.log(res);
}
</script>

<style lang='less' scoped>
</style>