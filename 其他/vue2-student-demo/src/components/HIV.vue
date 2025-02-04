<template>
  <div id="hiv">
    <button @click="status = 'down'" :class="{colorRed: status=='down'}">已经接种</button>
    <button @click="status = 'undown'" :class="{colorRed: status=='undown'}">没有接种</button>
    <button @click="status = 'all'" :class="{colorRed: status=='all'}">全部</button>
    <table border="1">
      <thead>
        <tr>
          <th>编号</th>
          <th>名字</th>
          <th>部门</th>
          <th>性别</th>
          <th>工资 <button @click="sorts">↑↓</button></th>
          <th>育苗接种</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in newArr" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.dept.name }}</td>
          <td>{{ item.gender ? "男" : "女" }}</td>
          <td>{{ item.salary }}</td>
          <td>{{ item.status ? "接种" : "未接种" }}</td>
          <td><button>删除</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    newArr() {
      if (this.status == "all") {
        return this.emps;
      } else if (this.status == "down") {
        return this.emps.filter((val) => val.status);
      }
      return this.emps.filter((val) => !val.status);
    },
  },
  methods: {
    sorts() {
      this.emps.sort((a, b) => a.salary - b.salary);
      if (this.n == -1) {
        this.emps.reverse();
        this.n = 1;
      } else {
        this.n = -1;
      }
    },
  },
  data() {
    return {
      status: "all",
      n: 1,
      emps: [
        {
          id: 1,
          name: "王小二",
          dept: { id: 1, name: "研发部" },
          gender: 1,
          status: true,
          salary: 3490,
        },
        {
          id: 2,
          name: "刘清华",
          dept: { id: 2, name: "市场部" },
          gender: 0,
          status: true,
          salary: 4500,
        },
        {
          id: 3,
          name: "王凌云",
          dept: { id: 3, name: "教学部" },
          gender: 1,
          status: true,
          salary: 5600,
        },
        {
          id: 4,
          name: "李珉珉",
          dept: { id: 4, name: "教学部" },
          gender: 1,
          status: true,
          salary: 4090,
        },
        {
          id: 5,
          name: "刘小华",
          dept: { id: 5, name: "教学部" },
          gender: 1,
          status: false,
          salary: 4580,
        },
      ],
    };
  },
};
</script>

<style>
#hiv {
  margin: 20px auto;
  width: 900px;
}
table {
  text-align: center;
  border-spacing: 1px;
  width: 900px;
}
.colorRed{
color:red}
</style>