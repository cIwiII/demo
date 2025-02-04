<template>
  <header>
      <section>
        <label for="title">ToDoList</label>
        <input type="text" placeholder="添加ToDo" @keyup.enter="put" v-model="va" />
      </section>
    </header>
</template>

<script>
export default {
    computed: {
    },

    data(){
        return {
            va:''
        }
    },
    methods:{
        put(){
            this.$emit('add',this.va);
            this.va='';
        }
    }
}
</script>

<style>

</style>