<template>
    <div>
        <table border="1">
            <thead>
                <tr>
                    <th>编号</th>
                    <th>名字</th>
                    <th>价格</th>
                    <th>数量</th>
                </tr>
            </thead>
            <tbody>
                <tr v-bind:key="index" v-for="(val, index) in phone" v-show="val.status=!val.status">
                    <td>{{val.id}}</td>
                    <td>{{val.name}}</td>
                    <td :class="val.className" :style="'color'==val.className">{{val.price}}</td>
                    <td>{{val.num}}</td>
                </tr>
            </tbody>
        </table>
        <!-- <button @click=""></button> -->
    </div>

</template>

<script>
export default {
    data() {
        return {phone:[
            { id: 1, name: "小米", price: 2300, num: 20, status: true, className: 'red' },
            { id: 2, name: "华为", price: 2300, num: 20, status: false, className: 'red'},
            { id: 3, name: "华为", price: 2300, num: 20, status: true, className: 'green' }
        ]}
    }
}
</script>

<style>
.red{
color: red;
}
.green{
color: green;}
</style>