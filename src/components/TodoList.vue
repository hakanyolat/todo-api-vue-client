<template>
  <div id="todo-list" class="shadow-sm p-3 mb-5 bg-white rounded">
    <input type="text" id="todo-input" class="form-control form-text text-muted" placeholder="What are you planning to do?" v-model="newTodo" @keyup.enter="addTodo">

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
  #todo-list{
    background-color: #fff;
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;

  }
  #todo-input{
    margin-bottom: 24px;
  }
</style>
