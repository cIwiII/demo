<template>
  <div>
    <header>
      <section>
        <label for="title">ToDoList</label>
        <input type="text" placeholder="添加ToDo" @change="add" />
      </section>
    </header>
    <section>
      <h2>
        正在进行 <span id="todocount">{{proing}}</span>
      </h2>
      <ol id="todolist" class="demo-box">
        <li
          :class="{ done: item.status }"
          v-for="item in fliterList"
          :key="item.id"
          @click="puts(item.id)"
        >
          <span>{{ item.name }}</span>
        </li>
      </ol>
      <button @click="statuStr = 'all'">全部</button>
      <button @click="statuStr = 'done'">已完成</button>
      <button @click="statuStr = 'undone'">未完成</button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      happy: [
        { id: 1, name: "吃饭", status: true },
        { id: 2, name: "睡觉", status: false },
        { id: 3, name: "打豆豆", status: true },
      ],
      fliterList: [],
      statuStr: "all",
      proing: 0,
      n: 4,
    };
  },
  computed: {},
  methods: {
    add(event) {
      this.happy.push({ id: this.n, name: event.target.value, status: false });
      this.n++;
    },
    puts(id){
        const obj=this.happy.find(v=>v.id==id);
        obj.status=!obj.status
    }
  },
  watch: {
    statuStr: {
      handler() {
        // const
        if (this.statuStr == "all") {
          this.fliterList = this.happy;
        } else if (this.statuStr == "done") {
          this.fliterList = this.happy.filter((v) => v.status);
        } else {
          this.fliterList = this.happy.filter((v) => !v.status);
        }
      },
      deep: true,
      immediate: true,
    },
    happy: {
      handler() {
        this.proing=this.happy.filter(v=>!v.status).length
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped>
ul,
ol {
  list-style: none;
}

header {
  height: 50px;
  background: #333;
  background: rgba(47, 47, 47, 0.98);
}

section {
  width: 1200px;
  margin: 0 auto;
}

label {
  float: left;
  width: 100px;
  line-height: 50px;
  color: #ddd;
  font-size: 24px;
  cursor: pointer;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

header input {
  float: right;
  width: 20%;
  height: 24px;
  margin-top: 12px;
  text-indent: 10px;
  border-radius: 5px;
  box-shadow: 0 1px 0 rgb(255 255 255 / 24%), 0 1px 6px rgb(0 0 0 / 45%) inset;
  border: none;
}

ol li {
  cursor: move;
}

li {
  height: 32px;
  line-height: 32px;
  background: #fff;
  position: relative;
  margin-bottom: 10px;
  padding: 0 45px;
  border-radius: 3px;
  border-left: 5px solid #629a9c;
  box-shadow: 0 1px 2px rgb(0 0 0 / 7%);
}

/* 点击页面内容,完成的状态 done */
.done {
  text-decoration: line-through;
  color: #629a9c;
}
</style>