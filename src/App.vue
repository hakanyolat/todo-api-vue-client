<template>
  <div id="app" class="container">
    <div class="app-title">
      <img src="@/assets/logo.png" width="256"/>
    </div>
    <todo-list></todo-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TodoList from "./components/TodoList.vue";
import 'bootstrap/dist/css/bootstrap.min.css'

export default Vue.extend({
  name: 'App',
  components: {
    TodoList
  }
});
</script>

<style>

  body{
    background-color: #f3f3f3;
    font-family: Arial, sans-serif;
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
    max-width: 650px;
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
