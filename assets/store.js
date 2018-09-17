import { createStore, combineReducers, applyMiddleware } from 'redux';

import { todoReducer } from './modules/Todo/reducer';

const reducers = combineReducers({
    todoState: todoReducer,
});

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
