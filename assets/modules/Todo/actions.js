import axios from 'axios';

const $ = jQuery;

export const ADD_LIST = 'ADD_LIST';
export const SET_SELECTED_LIST = 'SET_SELECTED_LIST';
export const DELETE_TODO = 'DELETE_TODO';
export const ADD_TODO = 'ADD_TODO';

export const actionAddList = name => ({
    type: ADD_LIST,
    name
});

export const actionSetSelectedList = name => ({
    type: SET_SELECTED_LIST,
    name
});

export const actionDeleteTodo = (list, idx) => ({
    type: DELETE_TODO,
    list,
    idx
});

export const actionAddTodo = (list, todo) => ({
    type: ADD_TODO,
    list,
    todo
});

export const getList = (lists, selected) => {
    for (let i in lists) {
        if (lists.hasOwnProperty(i) && lists[i].name == selected) {
            return lists[i];
        }
    }

    return null;
};

export const processList = (lists, selected, cb) => {
    let list = getList(lists, selected);

    if (typeof cb == 'function') {
        cb(list);
    }
};
