<template>
  <div id="newspri">
    <h3>给“新闻订单”的评价</h3>
    <hr style="border: 1px dashed rgb(116, 111, 111); height: 0" />
    <p>
      <small>请严肃认真对待此次评价！您的评价对我们真的真的非常重要！</small>
    </p>
    <div class="pentagram">
      <div
        v-for="v in 5"
        :key="v"
        :class="{ pencho: v <= imgshow || v <= imgshow1 }" @mouseenter="imgshow1=v" @mouseleave="imgshow1=0" 
        @mousedown="imgshow = v"
      ></div>
      <i v-if="imgshow1!=0">{{ pins }}</i>
      <i v-else>{{ pin }}</i>
    </div>
    <div>本次交易，乖，摸摸头，给您留下了什么印象呢？</div>
    <div class="ratingTag">
      <div v-for="item in itArr" :key="item.id" @click="addClass">
        {{ item.appraisal }}
      </div>
    </div>

    <textarea name="" id="area" cols="68" rows="10" @input="fonts" maxlength="140"> </textarea>
    <div class="news5">还可以输入<span>{{font}}</span>个字</div>
    <div class="foot">
      <div>评价完成</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    // 保留渲染
    pin() {
      switch (this.imgshow) {
        case 1:
          return "差评";
        case 2:
          return "较差";
        case 3:
          return "中等";
        case 4:
          return "一般";
        case 5:
          return "好评";
      }
    },
    // 临时渲染
    pins() {
      switch (this.imgshow1) {
        case 1:
          return "差评";
        case 2:
          return "较差";
        case 3:
          return "中等";
        case 4:
          return "一般";
        case 5:
          return "好评";
      }
    },
  },
  data() {
    return {
    font:140,
      imgshow: 1,imgshow1:1,
      itArr: [
        { id: 1, appraisal: "专业水平高" },
        { id: 2, appraisal: "交付准时" },
        { id: 3, appraisal: "效果明显" },
        { id: 4, appraisal: "数据分析准确" },
        { id: 5, appraisal: "能力待提高" },
        { id: 6, appraisal: "工期延误" },
      ],
    };
  },
  methods: {
    fonts(){
    console.log('1231',);
    this.font=140-document.querySelector('#area').value.length
    },
    addClass(event) {
      event.target.classList.toggle("choise");
    },
  },
};
</script>

<style lang='scss'>
#newspri {
  margin: 20px auto;
  width: 500px;
  border: 2px solid red;
  padding: 20px;
  position: relative;
  > p {
    font-size: 10px;
  }
  .pentagram {
    display: flex;
    i {
      color: red;
    }
    div {
      background-image: url(../assets/x1.png);
      background-repeat: no-repeat;
      background-position: 0 0;
      width: 30px;
      height: 30px;
    }
    div:hover {
      background-image: url(../assets/x2.png);
    }
    .pencho {
      background-image: url(../assets/x2.png);
    }
  }
  .ratingTag {
    display: flex;
    flex-wrap: wrap;
    font-size: 10px;
    margin-top: 30px;
    div {
      margin-right: 30px;
      margin-bottom: 30px;
      padding: 5px 15px;
      border: 1px solid rgb(116, 111, 111);
    }
    .choise {
      border: 1px solid red;
    }
  }
  .news5 {
    position: absolute;
    right: 35px;
    bottom: 95px;
    font-size: 10px;
    span {
      color: red;
    }
  }
  .foot {
    text-align: right;
    margin-top: 20px;
    overflow: hidden;
    div {
      padding: 10px 20px;
      color: #fff;
      background-color: rgb(221, 70, 24);
      width: max-content;
      border-radius: 6px;
      float: right;
    }
  }
}
</style>