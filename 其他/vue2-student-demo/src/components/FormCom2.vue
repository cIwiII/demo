<template>
  <div>
    <table border="1">
      <tr>
        <th>
          <input type="checkbox" @click="allCheckStatus" v-model="allChecked" />
        </th>
        <th>编号</th>
        <th>名字</th>
        <th>操作</th>
      </tr>
      <tr v-for="(item, index) in list" :key="item.id">
        <td>
          <input type="checkbox" v-model="item.checked" />
        </td>
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td><button @click="list.splice(index, 1)">删除</button></td>
      </tr>
    </table>
    <button
      @click="
        list.forEach((val) => {
          val.checked = !val.checked;
        })
      "
    >
      反选
    </button>
    <button
      @click="
        list = list.filter((val) => {
          return val.checked == false;
        })
      "
    >
      删除
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { id: 1, name: "小米", checked: true },
        { id: 2, name: "华为", checked: false },
        { id: 3, name: "魅族", checked: true },
        { id: 4, name: "oppo", checked: false },
      ],
      allChecked: true,
    };
  },
  methods: {
    allCheckStatus() {
      this.allChecked = !this.allChecked;
      // 获取到list中所有的数据，进行遍历判断是否设置为truefalse
      if (this.allChecked) {
        this.list.forEach((val) => {
          val.checked = true;
        });
      } else {
        this.list.forEach((val) => {
          val.checked = false;
        });
      }
    },
    // reverse() {
    //   this.list.forEach((val) => {
    //     val.checked = !val.checked;
    //   });
    // },
    // deles() {
    //   this.list = this.list.filter((val) => {
    //     return val.checked == false;
    //   });
    // },
  },
  watch: {
    list: {
      handler() {
        const bool = this.list.every((item) => item.checked);
        this.allChecked = bool;
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style>
body{
    
}
</style>
