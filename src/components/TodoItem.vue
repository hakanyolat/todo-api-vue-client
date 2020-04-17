<template>
  <div class="todo-item">
    <div class="todo-title" :class="{ 'todo-completed' : completed }" @click="toggleTodo">
      {{ title }}
    </div>
    <div class="remove-item" @click="removeTodo">
      &times;
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'TodoItem',
    props: {
      todo: {
        type: Object,
        required: true,
      }
    },

    data(){
      return {
        'id': this.todo.id,
        'title': this.todo.title,
        'completed': this.todo.completed
      }
    },

    methods: {
      toggleTodo(){
        this.completed = !this.completed;
        if(!this.completed) {
          this.$store.dispatch('undoCompleteTodo', this.todo);
        }else{
          this.$store.dispatch('completeTodo', this.todo);
        }
      },

      removeTodo(){
        this.$store.dispatch('removeTodo', this.todo);
      }
    }
  });
</script>

<style lang="scss">
  .todo-item{
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .todo-title{
    cursor: pointer;
  }

  .remove-item{
    cursor: pointer;
    margin-left: 14px;
    font-size: 20px;
    font-weight: bold;

    &:hover{
      color: red;
    }
  }

  .todo-completed{
    text-decoration: line-through;
    color: grey;
  }
</style>
