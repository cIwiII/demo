<template>
    <div>
        <!-- 存放星星的模块 -->
        <div @click="checkStar(index)" class="box4" v-for="(item,index) in stars" :key="item.id">
            <img v-if="item.type==1" src="../../assets/images/x1.png" alt="">
            <img v-else src="../../assets/images/x2.png" alt="">
        </div>
        <span>{{checkText}}</span>
        <!-- 渲染模块点击评价 -->
        <div>
            <div
            @click="checkBox(index)"
             class="wrapper" 
             :class="{checked:item.checked}" 
             v-for="(item,index) in list" :key="item.id">
            {{item.title}}
            </div>
        </div>
        <textarea @input="getTextAreaValue" name="" id="" cols="30" rows="10"></textarea>
        <span>还可以输入{{textLength}}个字</span>
        <button>提交</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            stars: [
            { id: 1, title: "极差", type: 1 },
                { id: 2, title: "较差", type: 1 },
                { id: 3, title: "中等", type: 1 },
                { id: 4, title: "一般", type: 1 },
                { id: 5, title: "好评", type: 1 },
            ],
            checkText:"",
            list:[
                {id:1,title:"交付准时",checked:true},
                {id:2,title:"效果明显",checked:false},
                {id:3,title:"数据分析准确",checked:false}
            ],
            introduce:""
        }
    },
    computed:{
        textLength(){
            return 140-this.introduce.length
        }
    },
    methods:{
        checkStar(index){
            // 数组截取
            // console.log(this.stars.slice(2,3));
            //  将所有type变成1，点击后再设置对应内为2
            this.stars.forEach(item=>item.type=1)
            this.stars.slice(0,index+1).forEach(item=>{
                item.type = 2
            })
            this.checkText = this.stars[index].title
        },
        checkBox(index){
            this.list[index].checked = !this.list[index].checked
        },
        getTextAreaValue(event){
            this.introduce = event.target.value
        }
    }
}
</script>

<style>
.box4{
    width: 24px;
    height: 24px;
}
.wrapper{
    width: 200px;
    height: 40px;
    border: 1px solid grey;
    text-align: center;
    line-height: 40px;
}
.wrapper.checked{
    border:1px solid tomato
}

</style>