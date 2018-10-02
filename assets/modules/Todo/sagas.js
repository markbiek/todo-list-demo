import { fromJS } from 'immutable';
import { put, takeEvery, call, all, select } from 'redux-saga/effects'

import {
    SET_API_TOKEN,
    LOGIN_START,
    LOGIN_IN_PROGRESS,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    fetchToken,
} from './actions';

function* handleLogin(action) {
    try {
        yield put({ type: LOGIN_IN_PROGRESS });

        const resp = yield call(fetchToken, action);
        const { data: { token: api_token } } = resp;

        yield put({ type: SET_API_TOKEN, api_token });
        yield put({ type: LOGIN_SUCCESS });
    } catch (e) {
        const { response: { data: { error } } } = e;

        yield put({ type: LOGIN_FAILED, err: error.message });
    }
}

export function* watchLoginStart() {
    yield takeEvery(LOGIN_START, handleLogin);
}
