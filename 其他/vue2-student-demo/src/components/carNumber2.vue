<template>
  <div>
    <ul>
      <li v-for="(v,index) in carNumbers" :key="index">{{v}}</li>
    </ul>
    <div @click="pause">停止</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carNumbers:[]
    };
  },
  created() {
    this.begin()
  },
  methods: {
    pause() {
      clearInterval(this.timmer);
    },
    begin(){
        
        console.log("执行");
  
    this.timmer = setInterval(()=>{
      let rr = [];
      for (let i = 0; i < 6; i++) {
        let a=this.getOneCarNumber()
        rr.push(a)
      }
      this.carNumbers=rr
      console.log(this.carNumbers);
    }, 3000);
    },
    getOneCarNumber(){
      let azArr =['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
        let az1 = "",
          az2 = "";
        for (let q = 0; q < 2; q++) {
          az1 += azArr[parseInt(Math.random() * 26)];
        //   console.log(az1);
        }
        for (let w = 0; w < 4; w++) {
          az2 += parseInt(Math.random() * 10);
        }
        let az3 = az1 + az2;
        let az4=az3.split("").sort((a,b) => Math.random() - 0.5).join("");
      return az4
    }
  },
};
</script>

<style>
</style>