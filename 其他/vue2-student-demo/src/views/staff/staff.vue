<template>
    <div>
        <h3>
            员工信息
        </h3>
        <div>
            <table border="1">
                <thead>
                    <tr>
                        <th>编号</th>
                        <th>姓名</th>
                        <th>年龄段</th>
                        <th>部门</th>
                        <th>出生日期</th>
                        <th>入职时长（月）</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="v in staffArr" :key="v.id">
                        <td>{{v.id}}</td>
                        <td @click="puts(v.id)">
                            <input v-if="status==v.id" type="text" :value="v.name"  @blur="okput($event,v.id)" autofocus="autofocus">
                            <span v-else>{{v.name}}</span>
                        </td>
                        <td>{{ageFliter(v.age)}}</td>
                        <td>{{v.dept}}</td>
                        <td :class="{tomato:toma(v.bir)}">{{v.bir}}</td>
                        <td>{{dataPut(v.time)}}前</td>
                        <td @click="put($event,v.name,v.id)">修改</td>
                    </tr>
                </tbody>

            </table>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data(){
        return {
            status:-1
        }
    },
    computed: {
        ...mapState(['staffArr']),
    },
    methods: {
        ...mapMutations(['putName']),
        ageFliter(v) {
            if (v < 18) { return "未成年" }
            else if (v < 25) { return "青年" }
            else if (v < 50) { return "中年" }
            else { return "老年" }
        },
        toma(v){
            let bo=false
            let s=new Date().getMonth()
            let ss=new Date(v).getMonth()
            if(s==ss){
                bo=true
            }
            return bo
        },
        dataPut(v) {
            const arr = v.split('-')
            const date1 = new Date()
            let time1 = date1.getTime()
            let date2 = new Date()
            date2.setFullYear(arr[0]);
            date2.setMonth(arr[1]);
            var red = date2.setDate(arr[2]);
            let re = parseInt((time1 - red) / (3600 * 1000 * 24 * 30))
            if (re > 12) {
                if (re % 12 != 0) {
                    return `${parseInt(re / 12)}年${re % 12}个月`
                }
                return parseInt(re / 12) + '年'
            }
            return re + '个月'
        },
        puts(v){
            this.status=v
        },
        //点名字直接修改
        okput(event,id){
            this.putName({ id, newName:event.target.value});
            this.status=-1
        },
        //原生dom
        // put(event, name, id) {
        //     let target = event.target
        //     if (target.innerText == '修改') {
        //         target.innerText = '确认'
        //         target.parentElement.children[1].innerHTML = `<input type="text" value="${name}">`
        //     } else if (target.innerText == '确认') {
        //         let newName = target.parentElement.children[1].firstElementChild.value;
        //         if (newName.length != 0) {
        //             console.log(newName)
        //             this.putName({ id, newName });
        //             target.innerHTML = '修改'
        //             target.parentElement.children[1].innerHTML = newName
        //         } else {
        //             alert('名字不能为空')
        //         }

        //     }

        // }
    }
}
</script>
<style lang="scss" scoped>
table {
    text-align: center;
    border-collapse: collapse;
    width: 900px;
    .tomato{
        background-color: tomato;
    }
}
</style>