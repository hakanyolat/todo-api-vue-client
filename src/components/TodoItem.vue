<template>
  <div class="todo-item">
    <div class="todo-title" :class="{ 'todo-completed' : completed }" @click="toggleTodo">
      {{ title }}
    </div>
    <div class="remove-item" @click="removeTodo" data-toggle="tooltip" data-placement="top" title="Remove">
      &times;
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import $ from 'jquery'
  import 'bootstrap/dist/js/bootstrap.bundle.min';

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
        ($('.remove-item') as any).tooltip('hide');
        this.$store.dispatch('removeTodo', this.todo);
      }
    }
  });
</script>

<style lang="scss">
  .todo-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;

    &:hover{
      background-color: #f3f3f3;
    }
  }

  .todo-title{
    cursor: pointer;
    width: 100%;
    padding: 5px 0;
  }

  .remove-item{
    cursor: pointer;
    margin-left: 14px;
    font-size: 20px;
    font-weight: bold;
    color: #ef476f;

    &:hover{
      color: #000;
    }
  }

  .todo-completed{
    text-decoration: line-through;
    color: grey;
  }
</style>
