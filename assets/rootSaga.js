import { put, takeEvery, call, all, select } from 'redux-saga/effects'

import {
    watchLoginStart
} from './modules/Todo/sagas';

import store from './store';

export default function* rootSaga() {
    yield all([
        watchLoginStart()
    ]);
}
