import {mount, shallowMount, createLocalVue} from '@vue/test-utils'
import TodoItem from "@/components/TodoItem.vue";
import Vuex from 'vuex';

describe('TodoItem.vue', () => {

    const localVue = createLocalVue();
    localVue.use(Vuex);

    const completedTodo = {
        'id': 1,
        'title': 'Test completed todo',
        'completed': true
    };
    const uncompletedTodo = {
        'id': 2,
        'title': 'Test uncompleted todo',
        'completed': false
    };

    let store = new Vuex.Store({
        state: {
            todos: [completedTodo, uncompletedTodo] as any,
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
                context.commit('addTodo', todo);
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

    it('should not have "todo-completed" class', () => {
        const wrapper = mount(TodoItem, {
            store,
            localVue,
            propsData: {
                todo: uncompletedTodo
            }
        });

        const title = wrapper.find('.todo-title');
        expect(title.is('div')).toBe(true);
        expect(title.element.classList.contains('todo-completed')).toBe(false)
    });

    it('should have "todo-completed" class', () => {
        const wrapper = mount(TodoItem, {
            store,
            localVue,
            propsData: {
                todo: completedTodo
            }
        });

        const title = wrapper.find('.todo-title');
        expect(title.is('div')).toBe(true);
        expect(title.element.classList.contains('todo-completed')).toBe(true)
    });

    it('should be completed when clicked to todo', () => {
        const wrapper = mount(TodoItem, {
            store,
            localVue,
            propsData: {
                todo: uncompletedTodo
            }
        });

        let title = wrapper.find('.todo-title');
        title.element.click();

        expect(wrapper.vm.$data.completed).toBe(true);
    });

    it('should be uncompleted when clicked to completed todo', () => {
        const wrapper = mount(TodoItem, {
            store,
            localVue,
            propsData: {
                todo: completedTodo
            }
        });

        let title = wrapper.find('.todo-title');
        title.element.click();

        expect(wrapper.vm.$data.completed).toBe(false);
    });

    it('should be removed when clicked remove button', () => {
        const wrapper = mount(TodoItem, {
            store,
            localVue,
            propsData: {
                todo: completedTodo
            }
        });

        let remove = wrapper.find('.remove-item');
        remove.element.click();

        expect(wrapper.vm.$store.state.todos.length).toBe(1);
    });
});