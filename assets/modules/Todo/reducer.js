import { fromJS } from 'immutable';

import {
    SET_SELECTED_LIST,
} from './actions';

/** Todo Store **/
const todoInitialState = fromJS({
    meta: {
        selected: ''
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
        case SET_SELECTED_LIST:
            return state.mergeDeep({
                meta: {
                    selected: action.name
                }
            });

        default:
            return state;
    }
}
