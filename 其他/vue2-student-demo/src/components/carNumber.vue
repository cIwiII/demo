<template>
    <div>
        <div v-for="(v, index) in arr" :key="index">{{ v }}</div>
        <div @click="stop">停止</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            arr: []
        };
    },
    created() {
        this.rand()
    },
    methods: {
        stop() {
            clearInterval(this.timer);
        },
        rand() {
            let azArr = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
            console.log("执行");
            this.timer = setInterval(() => { //不能用function,this指向问题
                let rr = [];
                for (let i = 0; i < 6; i++) {
                    let az1 = "",
                    for (let q = 0; q < 2; q++) {  //产生2个字母
                        az1 += azArr[parseInt(Math.random() * 26)];
                    }
                    for (let w = 0; w < 4; w++) {  //产生4个数字
                        az1 += parseInt(Math.random() * 10);
                    }
                    let az4 = az1.split("").sort((a, b) => Math.random() - 0.5).join("");
                    rr.push(az4)
                }
                this.arr = rr
            }, 1000);
        }
    },
};
</script>

<style>
</style>