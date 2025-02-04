<template>
    <div>
        <h1>指令演示</h1>
        <!-- 文本指令 -->
        <h2>文本指令</h2>
        <p>hello {{username}} !</p>
        <p v-text="username"></p>
        <p v-html="password"></p>
        <p v-text="password"></p>
        <!-- v-show指令 -->
        <h3>v-show 指令</h3>
        <ul>
            <li>成都</li>
            <li v-show="status">北京</li>
            <li>上海</li>
        </ul>
        <!-- 事件绑定 -->
        <button @click="status=!status">显示/隐藏</button>
        <!-- 循环指令 -->
        <h3>循环指令</h3>
        <ul>
            <li v-bind:key="item" v-for="item in users">{{item}}</li>
        </ul>
        <table border="1">
            <thead>
                <tr>
                    <th>编号</th>
                    <th>名字</th>
                    <th>年龄</th>
                </tr>
            </thead>
            <tbody>
                <tr v-bind:key="element.id" v-for="(element) in students">
                    <td>{{element.id}}</td>
                    <td>{{element.name}}</td>
                    <td>{{element.age}}</td>
                </tr>
            </tbody>
        </table>
        <div>
            <a v-bind:key="item" v-for="item in 10" href="#">测试-{{item}}</a>
        </div>
        <h3>v-bind指令</h3>
        <div v-bind:index="username" class="as" :class="className" id="as">v-bind</div>
        <button @click="className='as2'">修改className</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username:"小王",
            password:"<a href=#''>小飞飞</a>",
            detail:"<div class='container'></div>",
            status:true,
            users:[
                "xiaowang","xiaofeifei","xiaowu"
            ],
            students:[
                {id:1,name:"李亦非",age:23},
                {id:2,name:"彭于晏",age:24}
            ],
            className:"as2"
        }
    }
}
</script>

<style>
.as{
    font-weight: 800;
}
.as2{
    color:green;
    font-size:30px
}
</style>