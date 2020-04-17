<template>
  <div id="app" class="container">
    <div class="app-title textShineBlack fadeInUp">
      <b>AWESOME</b> TODO APP
    </div>
    <todo-list></todo-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TodoList from "./components/TodoList.vue";

export default Vue.extend({
  name: 'App',
  components: {
    TodoList
  }
});
</script>

<style>
  * {
    box-sizing: border-box;
  }

  #app {
    font-family: Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 100px;
    font-size: 16px;
  }

  .container{
    max-width: 600px;
    margin: 0 auto;
  }

  .app-title{
    text-align: center;
    letter-spacing: 5px;
    font-weight: lighter;
    margin-bottom: 60px;
    font-size: 30px;
  }
</style>
