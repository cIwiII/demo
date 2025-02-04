<template>
    <div class="vx">
        <div class="vx1">
            <div
                class="radio"
                v-for="v in arr"
                v-bind:key="v.id"
                v-bind:class="{ radioss: status == v.vu }"
                v-on:click="putReg(v.vu)"
            >
                <div>{{ v.id }}</div>
                <div>{{ v.title }}</div>
            </div>
            <div class="hr"></div>
        </div>
        <keep-alive include="vxs1,vxs2,vxs3">
            <component v-bind:is="status" @parStaPut="parStaPut"></component>
        </keep-alive>
    </div>
</template>

<script>
import vxs1 from './vxs1.vue'
import vxs2 from './vxs2.vue'
import vxs3 from './vxs3.vue'
export default {
    components: {
        vxs1, vxs2, vxs3
    },
    data() {
        return {
            status: 'vxs1',
            arr: [
                { id: 1, title: '填写基本信息', sta: false, vu: 'vxs1' },
                { id: 2, title: '邮箱激活', sta: false, vu: 'vxs2' },
                { id: 3, title: '完善开发者资料', sta: false, vu: 'vxs3' },
            ],
            arr1: ['vxs1']
        }
    },
    methods: {
        //发送到子组件的方法，通过验证，组件添加到数组
        parStaPut(v) {
            this.status = v;
            //已存在不可添加
            if (!this.arr1.includes(v)) {
                this.arr1.push(v)
            }
        },
        //后续内容是否可进入
        putReg(v) {
            if (this.arr1.includes(v)) {
                this.status = v
            }
        },



    }
}
</script>

<style lang="scss" scoped>
.vx {
    width: 1000px;
    margin: 20px auto;

    .vx1 {
        background-color: gray;
        display: flex;
        justify-content: center;
        justify-content: space-between;
        padding: 20px 40px;
        position: relative;
        // z-index: -1;
        .radio {
            position: relative;
            z-index: 1;
            div:nth-child(1) {
                width: 20px;
                margin: 0 auto;

                background-color: rgb(195, 191, 191);
                border-radius: 30px;
                text-align: center;
                color: #fff;
            }
        }
        .radioss {
            color: rgb(35, 187, 50);
            div:nth-child(1) {
                background-color: rgb(35, 187, 50);
            }
        }
        .hr {
            position: absolute;
            z-index: 0;
            top: 28px;
            left: 80px;
            width: 820px;
            height: 0;
            border: 2px solid rgb(195, 191, 191);
        }
    }
}
</style>