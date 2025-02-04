<template>
  <div>
    <!-- 产品信息 -->
    <div class="product">
      <h2>产品列表</h2>
      <div class="list">
        <div v-for="item in products" :key="item.id">
          <img :src="item.imgSrc" alt="" />
          <p>{{ item.title }}</p>
          <p>{{ item.message }}</p>
          <button @click="addCar(item.id)">加入购物车</button>
        </div>
      </div>
    </div>
    <!-- 购物车 -->
    <div class="car">
      <select name="" id="" @change="searchByType">
        <option value="title">按照名字搜索</option>
        <option value="price">按照价格搜索</option>
      </select>
      <input type="text" @blur="getSearchData" />
      <table width="1000px" border="1">
        <thead>
          <tr>
            <th>编号</th>
            <th>名字</th>
            <th>图片</th>
            <th>价格</th>
            <th>数量</th>
            <th>总价</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filterShopcar" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>
              <img width="50px" :src="item.imgSrc" alt="" />
            </td>
            <td>{{ item.price }}</td>
            <td>
              <button @click="changeNum(item.id, index, -1)">-</button>
              <span>{{ item.num }}</span>
              <button @click="changeNum(item.id, index, 1)">+</button>
            </td>
            <!-- 单价 *  数量 -->
            <td>{{ item.price * item.num }}</td>
            <td>
              <button @click="deleteRow(item.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p>总价为：{{ totalPrice }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          title: "小米耳机",
          message: "降噪耳机",
          price: 1200,
          imgSrc:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fy.zdmimg.com%2F202108%2F22%2F6121f5c5e8aee494.jpg_d250.jpg&refer=http%3A%2F%2Fy.zdmimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659058255&t=280fb66f78421510716a42bf88dc0b7e",
        },
        {
          id: 2,
          title: "华为耳机",
          message: "降噪耳机",
          price: 1300,
          imgSrc:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Farticle-fd.zol-img.com.cn%2Ft_s640x2000%2Fg6%2FM00%2F0E%2F0B%2FChMkKmF2gMiIUP7_AA90wEHMXXcAAU7kAHgRjkAD3TY740.jpg&refer=http%3A%2F%2Farticle-fd.zol-img.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659058255&t=89dc62bd9cdeea71b85f9f5be31b557c",
        },
        {
          id: 3,
          title: "苹果耳机",
          message: "降噪耳机",
          price: 1400,
          imgSrc:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpro-fd.zol-img.com.cn%2Ft_s640x2000_w1%2Fg6%2FM00%2F08%2F0E%2FChMkKV9IddmIQmAuAA07yMqfuaAAABjhgD5DTQADTvg315.jpg&refer=http%3A%2F%2Fpro-fd.zol-img.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659058255&t=924c8bfe28940e80034f64e5144c36d2",
        },
      ],
      shopCar: [],
      current: 18,
      searchType: "title",
      searchData: "",
    };
  },
  computed: {
    totalPrice() {
      // reduce方法
      return this.shopCar.reduce((sum, object) => {
        return (sum += object.num * object.price);
      }, 0);
    },
    filterShopcar() {
      // 进行属性的判断。搜索条件发生变化
      return this.shopCar.filter((item) => {
        // item[this.searchType 等同于item.title  item.price
        if (
          JSON.stringify(item[this.searchType]).indexOf(this.searchData) != -1
        ) {
          return true;
        } else {
          return false;
        }
      });
    },
  },
  methods: {
    addCar(id) {
      console.log(id);
      const oldProduct = this.products.find((item) => item.id == id);
      const object = this.shopCar.find((item) => item.id == id);
      // 判断商品是否在购物车中
      if (object) {
        alert("商品已经存在于购物车");
      } else {
        // 获取到一个加入购物车的对象，加入之前新增属性num
        const newProduct = { ...oldProduct, num: 1 };
        this.shopCar.push(newProduct);
      }
    },
    changeNum(id, index, val) {
      // 数量等于1 的时候，不能再减了。数量超过5的不能在加了
      const product = this.shopCar.find((item) => item.id == id);
      product.num += val;
      if (product.num == 0) {
        this.shopCar.splice(index, 1);
      } else if (product.num == 6) {
        product.num = 5;
        alert("限购5件");
      }
      // if(product.num == 1 && product.num == 5){
      //     alert("不能操作")
      // }else{
      //     product.num+=val
      // }
    },
    deleteRow(id) {
      const array = this.shopCar.filter((item) => item.id != id);
      this.shopCar = array;
    },
    searchByType(event) {
      console.log(event.target.value);
      this.searchType = event.target.value;
    },
    getSearchData(event) {
      console.log(event.target.value);
      this.searchData = event.target.value;
    },
  },
};
</script>

<style lang="scss">
.product {
  width: 1000px;
  margin: 0 auto;

  .list {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div {
      width: 250px;
      height: 350px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
      overflow: hidden;

      img {
        width: 100%;
        height: 60%;
      }
    }
  }
}

.car {
  width: 1000px;
  margin: 20px auto;
}
</style>
