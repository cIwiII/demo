<template>
    <h5>中奖</h5>
    <div v-for="(item, index) in newList">{{ index + 1 }}、姓名：{{ item.name }}-
    <span v-if="item.check">-电话：{{item.tel}}</span>
    <span v-else  @click="showTel(item.id)">-电话：{{ filters(item.tel) }}</span>
    </div>
    <!-- <div @click="startend">
        <div v-if="state.status">停止</div>
        <div v-else>开始</div>
    </div> -->
    <div  @click="startend" >{{state.status?'停止':'开始'}}</div>
</template> 

<script lang='ts' setup>
import { reactive, ref, computed } from 'vue'
import { IList, Isuij } from "../../types/ReactiveIterface"
const state: any = reactive<Isuij>({
    list: [
        { id: 1, name: '斯蒂芬妮1', tel: '152**991253',  check:false},
        { id: 2, name: '斯蒂芬妮2', tel: '152**991253',  check:false},
        { id: 3, name: '斯蒂芬妮3', tel: '152**991253',  check:false},
        { id: 4, name: '斯蒂芬妮4', tel: '152**991253',  check:false},
        { id: 5, name: '斯蒂芬妮5', tel: '152**991253',  check:false},
        { id: 6, name: '斯蒂芬妮6', tel: '152**991253',  check:false},
        { id: 7, name: '斯蒂芬妮7', tel: '152**991253',  check:false},
        { id: 8, name: '斯蒂芬妮8', tel: '152**991253',  check:false},
        { id: 9, name: '斯蒂芬妮9', tel: '152**991253',  check:false},
        { id: 10, name: '斯蒂芬妮10', tel: '15299**1253',  check:false}

    ],
    status: false,
    listing: [1, 3],
    timer: null
})
const newList = computed(() => {
    let arr = state.list.filter((v: IList) => {
        return state.listing.includes(v.id)
    })
    return arr
})
const startend = () => {
    state.status = !state.status
    if (state.status) {
        state.timer = setInterval(() => {
            state.listing = []
            while (state.listing.length<2) {
                let a = Math.floor(Math.random() * (state.list.length))+1
                if (!state.listing.includes(a)) {
                    state.listing.push(a)
                }
            }
        }, 100)
    } else {
        clearInterval(state.timer)
    }
}
//隐藏好吗
const filters=(str:string)=>{
    return str.replace(str.substring(3,7),'****')
}
//点击显示好吗
const showTel=(id:number)=>{
    const items:IList=state.list.find((item:IList)=>item.id==id)
    items.check=true
}




</script>

<style lang='less' scoped>
</style>