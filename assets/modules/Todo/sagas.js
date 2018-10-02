import { fromJS } from 'immutable';
import { put, takeEvery, call, all, select } from 'redux-saga/effects'

import {
    LOAD_TODO_LISTS,
    SET_TODO_LISTS,
    SET_API_TOKEN,
    LOGIN_START,
    LOGIN_IN_PROGRESS,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    fetchToken,
    fetchTodoLists,
} from './actions';

function* handleLogin(action) {
    try {
        yield put({ type: LOGIN_IN_PROGRESS });

        const resp = yield call(fetchToken, action);
        const { data: { token: api_token } } = resp;

        yield put({ type: SET_API_TOKEN, api_token });
        yield put({ type: LOGIN_SUCCESS });
        yield put({ type: LOAD_TODO_LISTS });
    } catch (e) {
        const { response: { data: { error } } } = e;

        yield put({ type: LOGIN_FAILED, err: error.message });
    }
}

function* handleLoadTodoLists() {
    try {
        const resp = yield call(fetchTodoLists);
        let { data: {data: lists} } = resp;

        lists.map(list => {
            list.todos = [];
        });

        yield put({ type: SET_TODO_LISTS, lists });
    } catch (e) {
        console.log(e);
    }
}

export function* watchLoginStart() {
    yield takeEvery(LOGIN_START, handleLogin);
}

export function* watchLoadLists() {
    yield takeEvery(LOAD_TODO_LISTS, handleLoadTodoLists);
}
