<template>
    <div >
        <div class="imgs">
            <img v-for="val in arr" :key="val.id" 
            :src="val.srcStr" alt="" @click="ar = val "
            :class="{ border: val.id==ar.id}" 
            >
        </div>
        <p>{{ ar.name }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {ti2:1,//这种方式会在每个img、标签下多个p标签，消耗过大
            arr: [
                { id: 1, name: '团子', srcStr: require('../assets/3.jpg')},
                { id: 2, name: '大明', srcStr: require('../assets/4.jpg')},
                { id: 3, name: '二明', srcStr: require('../assets/5.jpg')}
            ],
            ar: { }
        }
        
    }

}
</script>

<style lang="scss">
.imgs {
    width: 600px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;

    img {
        width: 150px;
        height: 150px;
    }
    

}
p{
    text-align: center;
    }
.as{
    border: 1px solid #fff;}
.border {
    border: 1px solid red;
}
</style>