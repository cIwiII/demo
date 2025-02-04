<template>
  <div class="buycar">
    <div class="goods">
      <h4>产品</h4>
      <div>
        <div v-for="val in arr" :key="val.id">
          <img v-bind:src="val.srcStr" alt="" />
          <p>{{ val.name }}</p>
          <p>{{ val.title }}</p>
          <button @click="pusha(val.id)">加入购物车</button>
        </div>
      </div>
    </div>
    <div class="car">
      <div>
        <select name="" id="" @change="searchT">
          <option value="name">名字</option>
          <option value="price">价格</option>
        </select>
        <input type="text" placeholder="输入查找内容" @change="textch" />
      </div>
      <h4>购物车</h4>

      <table border="1">
        <thead>
          <tr>
            <th>编号</th>
            <th>图片</th>
            <th>标题</th>
            <th>价格</th>
            <th>数量</th>
            <th>总价</th>
            <th>删除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, index) in searchShopArr" :key="v.id">
            <td>{{ index + 1 }}</td>
            <td><img :src="v.srcStr" alt="" /></td>
            <td>{{ v.name }}</td>
            <td>{{ v.price }}</td>
            <td>
              <button @click="add(index, -1)">-</button>{{ v.num
              }}<button @click="add(index, 1)">+</button>
            </td>
            <td>{{ v.num * v.price }}</td>
            <td><button @click="delet(index)">删除</button></td>
          </tr>
        </tbody>
      </table>
      <p>
        总价为：<span>{{ addprice }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    carArr: {
      handler() {
        this.addprice = this.carArr.reduce((total, val) => {
                          return (total += val.num * val.price);
                        }, 0);
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    // addprice() {//改为侦听器
    //   console.log("zhixing");
    //   let s = this.carArr.reduce((total, val) => {
    //     return (total += val.num * val.price);
    //   }, 0);
    //   return s;
    // },
    searchShopArr() {
      return this.carArr.filter((val) => {
        if (JSON.stringify(val[this.searchtype]).includes(this.searchData)) {
          return true;
        } else {
          return false;
        }
      });
    },
  },
  methods: {
    textch(event) {
      this.searchData = event.target.value;
    },
    searchT(event) {
      this.searchtype = event.target.value;
    },
    pusha(id) {
      // console.log(this.carArr.includes(obj),this.carArr)
      let aObj = this.arr.find((val) => val.id == id);
      let obj = this.carArr.find((val) => val.id == id);
      // console.log('obj')
      if (!obj) {
        let newObj = { ...aObj, num: 1 };
        this.carArr.push(newObj);
      } else {
        alert("不能重复添加");
      }
    },
    add(index, n) {
      if (this.carArr[index].num == 1 && n == -1) {
        alert("件数最少为1");
      } else if (this.carArr[index].num == 5 && n == 1) {
        alert("件数最多为5");
      } else {
        this.carArr[index].num += n;
      }
    },
    delet(index) {
      let obj = this.carArr[index];
      this.carArr.splice(index, 1);
    },
  },
  data() {
    return {
      addprice: 0,
      searchtype: "name",
      searchData: "",
      arr: [
        {
          id: 1,
          name: "python实战开发",
          title: "精通python学习指南",
          srcStr: require("../assets/img1.png"),
          price: 234,
        },
        {
          id: 2,
          name: "java实战开发",
          title: "精通java学习指南",
          srcStr: require("../assets/img2.png"),
          price: 134,
        },
        {
          id: 3,
          name: "H5实战开发",
          title: "精通H5学习指南",
          srcStr: require("../assets/img3.png"),
          price: 294,
        },
        {
          id: 4,
          name: "测试框架开发",
          title: "精通测试框架学习指南",
          srcStr: require("../assets/img4.png"),
          price: 234,
        },
      ],
      carArr: [],
    };
  },
};
</script>
<style lang="scss" scoped>
.buycar {
  margin: 0 auto;
  width: 900px;
  margin-bottom: 30px;
  .goods > div {
    display: flex;
    justify-content: space-between;
    > div {
      img {
        width: 150px;
        height: 150px;
      }
      p {
        text-align: center;
      }
      button {
        margin: 0 auto;
      }
    }
  }
  .car {
    table {
      width: 900px;
      text-align: center;
      border-collapse: collapse;
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
  .cas {
  }
}
</style>