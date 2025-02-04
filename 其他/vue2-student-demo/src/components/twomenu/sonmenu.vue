<template>
  <div>
    <ul id="menu">
      <li
        v-for="(item,index) in data1"
        @click="getval(item.id)"
        :key="item.id"
        :class="{ red: item.status }"
      >
        <p>{{ item.title }}</p>
        <ul :class="{ none: !item.status }">
          <li
            v-for="(it,i) in item.children"
            :class="{ twomenu: it.sonSta }"
            :key="it.id"
            @click="getval2(index,i)"
          >
            {{ it.tit }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["data1", "getval",'getval2'],
};
</script>

<style lang="scss" scoped>
#menu {
  list-style: none;
  width: 150px;
  background-color: rgba(21, 64, 221, 0.4);
  padding: 20px;
  padding-bottom: 50px;
 
  li {
    line-height: 2;
    ul {
      list-style: none;
      background-color: rgb(228, 237, 237);
      margin: 0 0 20px 20px;
      li {
        color: rgb(21, 20, 20);
      }
      .twomenu {
        color: rgb(243, 25, 5);
      }
    }
    .none {
      display: none;
    }
  }
  .red {
    color: red;
  }
}
</style>