import { fromJS } from 'immutable';

import {
    ADD_LIST,
    SET_SELECTED_LIST,
    DELETE_TODO,
    ADD_TODO,
    SET_API_TOKEN,
    getList,
} from './actions';

/** Todo Store **/
const todoInitialState = fromJS({
    meta: {
        selected: '',
        api_token: null
    },
    lists: [
        {
            name: 'Groceries',
            todos: [
                'Lettuce'
            ]
        }
    ]
})

export const todoReducer = function (state = todoInitialState, action) {
    switch (action.type) {
        case SET_API_TOKEN:
            return state.mergeDeep({
                meta: {
                    api_token: action.api_token
                }
            });

        case SET_SELECTED_LIST:
            return state.mergeDeep({
                meta: {
                    selected: action.name
                }
            });

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
