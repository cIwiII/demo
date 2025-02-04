<template>
    <div id="fivestar">
        <h2>给“新闻订单”的评价</h2>
        <hr>
        <p>请严肃认真对待此次评价哦！您的评价对我们真的真的非常重要！</p>
        <span>
            <a-rate v-model:value="value" :tooltips="desc" />
            <span class="ant-rate-text">{{ desc[value - 1] }}</span>
        </span>
        <div class="mmt">本次交易，乖，摸摸头 给您留下了什么印象呢？</div>
        <div class="disfix" @click="changeCheck">
            <div v-for="item of state.list" :dataId="item.id" :class="{ check: item.check }">
                {{ item.title }}
                <div></div>
            </div>
        </div>
        <div>
            <a-textarea class="textarea" v-model:value="value2" show-count :maxlength="300" />
        </div>
        <div class="over">
            <div class="over1" @click="over">评价完成</div>

        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, computed } from 'vue';
// import { IStar,IStarTatol,Iapp } from "../../types/ReactiveIterface"

interface IStar {
    id: number;
    title: string;
    check: boolean
}
interface IStarTatol {
    list: IStar[];

}
//提交对象接口
interface Iapp {
    appra: any,
    AppraLIst: IStar[],
    value: string
}
const value = ref<number>(3);
const desc = ref<string[]>(['很差', '较差', '一般', '好', '很好']);
const value2 = ref<string>('test value');

const state = reactive<IStarTatol>({
    list: [
        { id: 1, title: '专业水平高', check: false },
        { id: 2, title: '交付准时', check: false },
        { id: 3, title: '效果明显', check: false },
        { id: 4, title: '数据分析准确', check: true },
        { id: 5, title: '能力待提高', check: false },
        { id: 6, title: '工期延误', check: false }
    ]
})
//别选中的评价
const AppraLIst = computed(() => {
    let arr = state.list.filter((v: IStar) => v.check)
    return arr
})
//事件委托点击选中
const changeCheck = (event: any) => {
    const id: number = event.target.getAttribute('dataid')
    const obj: IStar | undefined = state.list.find(item => item.id == id)
    if (obj) {
        obj.check = !obj.check
    }
}
//提交评价
const over = () => {
    const obj: Iapp = {
        appra: desc.value[value.value - 1],
        AppraLIst: AppraLIst.value,
        value: value2.value
    }
    console.log(obj);


}
</script>

<style lang='scss' scoped>
#fivestar {
    margin: 0 auto;
    width: 70rem;
    // min-width: max-content;
    padding: 2rem;
    border: 1px solid red;

    h3 {
        margin-top: 2rem;
        font-weight: 700;
        border-bottom: 1px dashed #aaa7a7;

    }

    p {
        margin-top: 3rem;
        color: rgb(180, 182, 181);
    }

    .mmt {
        padding: 1.5rem 0.5rem;
        background-color: #d5d4d4;
        margin: 1.5rem 0;
    }

    .disfix {
        display: flex;
        flex-wrap: wrap;

        >div {
            width: 13rem;
            padding: 1rem 0;
            text-align: center;
            margin: 0 2rem 1.5rem 0;
            border: 1px solid #d5d4d4;


        }

        .check {
            border: 1px solid red;
            position: relative;

            div {
                position: absolute;
                width: 1rem;
                height: 1.5rem;
                border: 1px solid red;
                right: 0;
                bottom: 0;
            }
        }
    }

    .textarea {
        height: 15rem;
    }

    .over {
        overflow: hidden;
        margin-top: 3rem;

        .over1 {
            float: right;
            width: 12rem;
            padding: 1rem 1.5rem;
            text-align: center;
            border-radius: 5px;
            background-color: rgb(244, 143, 96);
            color: #fff;
        }
    }

}
</style>