<template>
  <div>
    <input type="text" id="todo-input" placeholder="What needs to be done" v-model="newTodo" @keyup.enter="addTodo">

    <todo-item
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo">
    </todo-item>

    <todo-list-footer></todo-list-footer>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import TodoItem from "./TodoItem.vue"
  import TodoListFooter from "./TodoListFooter.vue";

  export default Vue.extend({
    name: 'TodoList',
    components: {
      TodoItem,
      TodoListFooter,
    },

    data () {
      return {
        newTodo: '',
      }
    },

    created(){
      this.$store.dispatch('retrieveTodos')
    },

    methods: {
      addTodo(){
        if(this.newTodo.trim().length === 0){
          return
        }

        this.$store.dispatch('addTodo', {
          title: this.newTodo,
          completed: false,
        });

        this.newTodo = '';
      },
    },

    computed: {
      todos(){
        return this.$store.getters.todos
      }
    }
  });
</script>

<style lang="scss">
  #todo-input{
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-top: 30px;
    margin-bottom: 30px;
    border-radius: 5px;
    border: 1px solid #ccc;

    &:focus{
      outline: 0;
    }
  }
</style>
