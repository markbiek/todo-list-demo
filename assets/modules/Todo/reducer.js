import { fromJS } from 'immutable';

import {
    SET_LIST_TODOS,
    SET_TODO_LISTS,
    ADD_LIST,
    SET_SELECTED_LIST,
    DELETE_TODO,
    ADD_TODO,
    SET_API_TOKEN,
    LOGIN_START,
    LOGIN_IN_PROGRESS,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    getList,
} from './actions';

/** Todo Store **/
const todoInitialState = fromJS({
    meta: {
        selected: '',
        login: {
            status: null,
            err: null,
        },
        api_token: null
    },
    lists: []
})

export const todoReducer = function (state = todoInitialState, action) {
    switch (action.type) {
        case SET_TODO_LISTS:
            return state.set('lists', fromJS(action.lists));

        case LOGIN_START:
        case LOGIN_IN_PROGRESS:
        case LOGIN_FAILED:
        case LOGIN_SUCCESS:
            return state.mergeDeep({
                meta: {
                    login: {
                        status: action.type,
                        err: action.hasOwnProperty('err') ? action.err : null
                    }
                }
            });

        case SET_API_TOKEN:
            return state.mergeDeep({
                meta: {
                    api_token: action.api_token
                }
            });

        case SET_SELECTED_LIST:
            return state.mergeDeep({
                meta: {
                    selected: action.id
                }
            });

        case SET_LIST_TODOS:
        {
            const { id, todos } = action;
            let { lists } = state.toJS();

            let list = getList(lists, id);
            list.todos = todos;

            return state.set('lists', fromJS(lists));
        }

        case ADD_LIST:
        {
            const { name } = action;
            let { lists } = state.toJS();

            lists.push({
                name,
                todos: []
            });

            return state.set('lists', fromJS(lists));
        }

        case DELETE_TODO:
        {
            let { lists } = state.toJS();
            const { list, idx} = action;

            let curList = getList(lists, list);
            if (curList) {
                curList.todos.splice(idx, 1);
            }

            return state.set('lists', fromJS(lists));
        }

        case ADD_TODO:
        {
            let { lists } = state.toJS();
            const { todo, list} = action;

            let curList = getList(lists, list);
            curList.todos.push(todo);

            return state.set('lists', fromJS(lists));
        }

        default:
            return state;
    }
}
