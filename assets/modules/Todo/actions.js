import axios from 'axios';

const $ = jQuery;

export const ADD_LIST = 'ADD_LIST';
export const SET_SELECTED_LIST = 'SET_SELECTED_LIST';
export const DELETE_TODO = 'DELETE_TODO';
export const ADD_TODO = 'ADD_TODO';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_IN_PROGRESS = 'LOGIN_IN_PROGRESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const SET_API_TOKEN = 'SET_API_TOKEN';
export const LOAD_TODO_LISTS = 'LOAD_TODO_LISTS';
export const SET_TODO_LISTS = 'SET_TODO_LISTS';
export const SET_LIST_TODOS = 'SET_LIST_TODOS';

const API_URL = 'http://codetest.viastaging.com/api';

import store from '../../store';

export const fetchToken = action => {
    const url = `${API_URL}/auth/authenticate`;

    const { username, password } = action;

    return axios.post(url, {
        email: username,
        password,
    });
};

export const fetchTodoLists = () => {
    return apiGet('/lists');
};

export const fetchTodos = id => {
    return apiGet(`/lists/${id}`);
};

export const apiGet = (route, opts = {}) => {
    const token = store.getState().todoState.get('meta').get('api_token');
    const url = `${API_URL}${route}?token=${token}`;

    console.log(`apiGet: ${url}`);

    return axios.get(url, opts);
};

export const actionSetApiToken = api_token => ({
    type: SET_API_TOKEN,
    api_token
});

export const actionLoginStart = (username, password) => ({
    type: LOGIN_START,
    username,
    password
});

export const actionAddList = name => ({
    type: ADD_LIST,
    name
});

export const actionSetSelectedList = id => ({
    type: SET_SELECTED_LIST,
    id
});

export const actionDeleteTodo = (list, id) => ({
    type: DELETE_TODO,
    list,
    id,
});

export const actionAddTodo = (list, todo) => ({
    type: ADD_TODO,
    list,
    todo
});

export const getList = (lists, selected) => {
    for (let i in lists) {
        if (lists.hasOwnProperty(i) && (lists[i].id == selected || lists[i].name == selected)) {
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
