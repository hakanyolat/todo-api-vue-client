import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios";

Vue.use(Vuex);
Axios.defaults.baseURL = process.env.VUE_APP_API_SERVER;

export default new Vuex.Store({
  state: {
    todos: [] as any,
  },

  getters: {
    todos(state){
      return state.todos
    },

    totalTodos(state){
      return state.todos.length
    },

    remainingTodos(state){
      return state.todos.filter((todo: any) => !todo.completed).length
    },

    completedTodos(state){
      return state.todos.filter((todo: any) => todo.completed).length
    }
  },

  mutations: {
    retrieveTodos(state, todos){
      state.todos = todos
    },

    addTodo(state, todo){
      state.todos.push(todo)
    },

    completeTodo(state, todo){
      const index = state.todos.findIndex((item: any) => item.id === todo.id);
      state.todos.splice(index, 1, {
        'id': todo.id,
        'title': todo.title,
        'completed': true,
      });
    },

    undoCompleteTodo(state, todo){
      const index = state.todos.findIndex((item: any) => item.id === todo.id);
      state.todos.splice(index, 1, {
        'id': todo.id,
        'title': todo.title,
        'completed': false,
      });
    },

    removeTodo(state, todo){
      const index = state.todos.findIndex((item: any) => item.id === todo.id);
      state.todos.splice(index, 1)
    }
  },

  actions: {
    retrieveTodos(context){
      Axios.get('/tasks')
          .then(response => {
            context.commit('retrieveTodos', response.data)
          })
          .catch(error => {
            console.log(error)
          });
    },

    addTodo(context, todo){
      Axios.post('/tasks', {title: todo.title, completed: false})
          .then(response => {
            context.commit('addTodo', response.data)
          })
          .catch(error => {
            console.log(error)
          });
    },

    completeTodo(context, todo){
      Axios.put('/tasks/' + todo.id, {completed: true})
          .then(response => {
            context.commit('completeTodo', response.data)
          })
          .catch(error => {
            console.log(error)
          });
    },

    undoCompleteTodo(context, todo){
      Axios.put('/tasks/' + todo.id, {completed: false})
          .then(response => {
            context.commit('undoCompleteTodo', response.data)
          })
          .catch(error => {
            console.log(error)
          });
    },

    removeTodo(context, todo){
      Axios.delete('/tasks/' + todo.id)
          .then(() => {
            context.commit('removeTodo', todo)
          })
          .catch(error => {
            console.log(error)
          });
    }
  }
})
