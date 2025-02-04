<template>
    <div>
        <!-- 动态渲染小星星 -->
        <ul class="oul">
            <li 
            class="star"
            v-for="(item,index) in state.stars"
            :key="item.id"
            @click="changeStar(index)"
            >
                <img v-if="item.type==1" src="../../assets/images/x1.png" alt="">
                <img v-else src="../../assets/images/x2.png" alt="">
            </li>
        </ul>
        <p>{{state.chooseText}}</p>
        <!-- 动态进行遍历我们评价模块 -->
        <div 
        class="box"
        :class="{checked:item.check}"
        v-for="item in state.comments"
        :key="item.id"
        @click="changeState(item.id)"
        >
            {{item.name}}
        </div>
        <textarea v-model="state.title" name="" id="" cols="30" rows="10"></textarea>
        <span>还剩{{state.totalText}}个字</span>
    </div>
</template>

<script lang='ts' setup>
import { reactive, ref,watchEffect } from 'vue'
// 评价的数据
const state = reactive({
    stars: [
        { id: 1, text: "极差", type: 1 }, //灰色1 type：2
        { id: 2, text: "较差", type: 1 },
        { id: 3, text: "中等", type: 1 },
        { id: 4, text: "一般", type: 1 },
        { id: 5, text: "好评", type: 1 },
    ],
    chooseText:"请选中",
    comments:[
        {id:1,name:"准时交付",check:false},
        {id:2,name:"效果明显",check:false},
        {id:3,name:"使用恰当",check:false},
        {id:4,name:"质量保证",check:false},
    ],
    totalText:140,
    title:""
})

watchEffect(()=>{
    state.totalText=140 - state.title.length
})

const changeStar = (index:number)=>{
    // 进入函数，默认将所有的type都设置为1
    state.stars.forEach(item=>item.type=1)
    state.stars.slice(0,index + 1).forEach(item=>{
        item.type = 2
    })
    state.chooseText = state.stars[index].text
}

const changeState = (id:number)=>{
    const item = state.comments.find(item=>item.id==id)
    if(item){
        item.check = !item.check
    }
}
</script>

<style lang='less' scoped>
.oul {
    list-style: none;
    display: flex;

    .star {
        width: 24px;
        height: 24px;
    }
}
.box{
    width: 130px;
    height: 25px;
    border: 1px solid gray;
    text-align: center;
    line-height: 25px;
    &.checked{
        border: 1px solid tomato;
    }
}
</style>