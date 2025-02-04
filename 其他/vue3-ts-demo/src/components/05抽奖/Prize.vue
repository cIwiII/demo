<template>
    <div>
        <h2>抽奖作业</h2>
        <h3>中奖名单</h3>
        <ul>
            <li @click="choosePrize(item.id)" :class="{ as: item.check }" v-for="item in prizeUser.users"
                :key="item.id">
                <!-- 名字 -->
                <span>{{ item.name }}</span>
                &nbsp;&nbsp;&nbsp;
                <!-- 电话 -->
                <span v-if="item.check">{{ item.phone }}</span>
                <span v-else>{{ filter(item.phone) }}</span>
            </li>
        </ul>
        <button @click="begin">{{ status == -1 ? "开始" : "暂停" }}</button>
        <Button type="primary">antd</Button>
        <a-button type="primary">Primary Button</a-button>
        <a-button>Default Button</a-button>
        <a-button type="dashed">Dashed Button</a-button>
        <a-button type="text">Text Button</a-button>
        <a-button type="link">Link Button</a-button>
        <div class="wrapper">
            <span>蜗牛</span>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue'
import { IState } from "../../types/PrizeInterface"
import { Button } from 'ant-design-vue';
const state = reactive<IState>({
    users: [
        { id: 1, name: "xiaowang", phone: "12354545", check: false },
        { id: 2, name: "xiaozhang", phone: "12354545", check: false },
        { id: 3, name: "xiaomei", phone: "12354545", check: false },
        { id: 4, name: "xiaofei", phone: "12354545", check: false },
        { id: 5, name: "xiaoliu", phone: "12354545", check: false },
        { id: 6, name: "xiaowu", phone: "12354545", check: false },
        { id: 7, name: "xiaoqiang", phone: "12354545", check: false },
        { id: 8, name: "xiaoyi", phone: "12354545", check: false },
    ]
})
const prizeUser = reactive<IState>({
    users: []
})
// timmer默认值
const status = ref(-1)

/**
 * 第一次进来，先判断定时器是否为-1.没有开启定时器
 */
const begin = () => {
    if (status.value == -1) {
        status.value = setInterval(() => {
            getPrizeValue()
        }, 500)
    } else {
        clearInterval(status.value)
        status.value = -1
    }

    // console.log(123);

}
const getPrizeValue = () => {
    const { users } = state
    const newArray = []
    while (newArray.length < 4) {
        // 构造每次中奖
        let index = parseInt(Math.random() * users.length + "")
        // 判断不存在
        if (newArray.indexOf(users[index]) == -1) {
            newArray.push(users[index])
        }
    }

    prizeUser.users = newArray
}
// Vue中目前没有提供过滤器
const filter = (val: string) => {
    return val.replace(val.substring(3, 7), "***")
}

const choosePrize = (id: number) => {
    const item = prizeUser.users.find(item => item.id == id)
    // 检测你对undefined进行处理
    if (item) {
        item.check = !item.check
    }
}

</script>

<style lang='scss' scoped>
.as {
    width: 200px;
    height: 25px;
    border: 1px solid red;
}
.wrapper{
    span{
        color: tomato;
    }
}
</style>