<template>
    <div class="az1">
        <div class="flex">
            <div v-on:click="status = 'show1'"
                 :class="{ se: status == 'show1' }">
                推荐电影
            </div>
            <div v-on:click="status = 'show2'"
                 :class="{ se: status == 'show2' }">
                高分电影
            </div>
            <div v-on:click="status = 'show3'"
                 :class="{ se: status == 'show3' }">
                热门电影
            </div>
        </div>
        <div class="az">
            <components v-bind:is="status" class="asc"></components>
            dcvvas
        </div>
    </div>
</template>

<script>
import show1 from './show1.vue'
import show2 from './show2.vue'
import show3 from './show3.vue'
export default {
    components: {
        show1,
        show2,
        show3
    },
    data() {
        return {
            status: 'show1'
        }
    }
}
</script>

<style lang="scss">
.az1 {
    .flex {
        width: 1200px;
        margin: 0 auto;
        background-color: aquamarine;
        display: flex;
        justify-content: space-between;
        div {
            margin: 5px 15px;
        }
        .se {
            border-bottom: 2px solid red;
        }
    }
    .az {
        width: 1200px;
        margin: 0 auto;
        margin-top: 30px;
        text-align: center;
    }
}
</style>