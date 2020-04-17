import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuex from 'vuex';
import TodoList from "@/components/TodoList.vue";

describe('TodoList.vue', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    let lastTodoId = 1;
    let store = new Vuex.Store({
        state: {
            todos: [] as any,
        },
        getters: {
            todos(state) {
                return state.todos
            },

            totalTodos(state) {
                return state.todos.length
            },

            remainingTodos(state) {
                return state.todos.filter((todo: any) => !todo.completed).length
            },

            completedTodos(state) {
                return state.todos.filter((todo: any) => todo.completed).length
            }
        },
        mutations: {
            retrieveTodos(state, todos) {
                state.todos = todos
            },

            addTodo(state, todo) {
                state.todos.push(todo)
            },

            completeTodo(state, todo) {
                const index = state.todos.findIndex((item: any) => item.id === todo.id);
                state.todos.splice(index, 1, {
                    'id': todo.id,
                    'title': todo.title,
                    'completed': true,
                });
            },

            undoCompleteTodo(state, todo) {
                const index = state.todos.findIndex((item: any) => item.id === todo.id);
                state.todos.splice(index, 1, {
                    'id': todo.id,
                    'title': todo.title,
                    'completed': false,
                });
            },

            removeTodo(state, todo) {
                const index = state.todos.findIndex((item: any) => item.id === todo.id);
                state.todos.splice(index, 1)

            }
        },
        actions: {
            retrieveTodos(context) {
                context.commit('retrieveTodos', []);
            },

            addTodo(context, todo) {
                context.commit('addTodo', {
                    id: lastTodoId,
                    title: todo.title,
                    completed: todo.completed
                });
                lastTodoId++;
            },

            completeTodo(context, todo) {
                context.commit('completeTodo', todo);
            },

            undoCompleteTodo(context, todo) {
                context.commit('undoCompleteTodo', todo);
            },

            removeTodo(context, todo) {
                context.commit('removeTodo', todo);
            }
        }
    });

    it('should setup correctly', () => {
        const wrapper = shallowMount(TodoList, {
            store,
            localVue,
            data: () => {
                return {
                    newTodo: 'Test todo'
                }
            }
        });

        const input = wrapper.find('#todo-input').element as HTMLInputElement;
        expect(input.value).toBe('Test todo')
    });

    it('should add todo when submit todo input', () => {
        const wrapper = shallowMount(TodoList, {
            store,
            localVue,
            data: () => {
                return {
                    newTodo: 'Test todo'
                }
            }
        });

        const input = wrapper.find('#todo-input');
        input.trigger('keyup.enter');

        expect(wrapper.vm.$store.state.todos.length).toBe(1)
    });
});