<template>
  <div class="footer">
    Showing <b>{{ totalTodos }}</b> task (<b>{{ remainingTodos }}</b> remaining, <b>{{ completedTodos }}</b> completed)
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'TodoListFooter',
    computed: {
      totalTodos(){
        return this.$store.getters.totalTodos
      },

      remainingTodos(){
        return this.$store.getters.remainingTodos
      },

      completedTodos(){
        return this.$store.getters.completedTodos
      }
    }
  })
</script>

<style lang="scss">
  .footer{
    font-size: 13px;
    color: grey;
    padding: 14px;
    margin-top: 24px;
    margin-bottom: 14px;
    background-color: #f3f3f3;
    border-radius: 5px;
  }
</style>
