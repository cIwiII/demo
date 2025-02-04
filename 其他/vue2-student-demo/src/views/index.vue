<template>
    <div>
        <h3> 首页内容</h3>

        <button
                @click="$store.commit('changeCount',1)">+</button>{{$store.state.count2}}
        <button @click="$store.commit('changeCount',-1)">-</button>
        <div>
            {{format}}
        </div>
        <div @click="getString">时间输出</div>
    </div>

</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            format: '213',
        }
    },
    methods: {
        datePut() {

        },
        getString() {
            console.log(Date())
            // return format;
        }
    }
}
</script>

<style>
</style>