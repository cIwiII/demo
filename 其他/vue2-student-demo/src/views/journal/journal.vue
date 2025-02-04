<template>
    <div>
        <h3>日志信息</h3>
        <div>
            <table>
                <tr v-for="v in $store.state.journal" :key="v.id">
                    <td>用户:{{v.name}}</td>
                    <td>点击了:{{v.pathName}}</td>
                    <td>--{{v.time}}</td>
                    <td @click="$store.commit('deleteJour',v.id)">&nbsp;&nbsp;&nbsp;删除</td>
                </tr>
            </table>
        </div>
    </div>

</template>

<script>
export default {

}
</script>

<style>
</style>