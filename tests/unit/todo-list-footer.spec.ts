import {createLocalVue, mount} from "@vue/test-utils";
import TodoListFooter from "@/components/TodoListFooter.vue";
import Vuex from 'vuex';

describe('TodoListFooter.vue', () => {
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
        const wrapper = mount(TodoListFooter, {
            store,
            localVue
        });

        const footer = wrapper.find('.footer');
        expect(footer.element.innerHTML.trim())
            .toBe('Showing <b>0</b> task (<b>0</b> remaining, <b>0</b> completed)');
    });
});