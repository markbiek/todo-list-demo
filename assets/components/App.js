import React from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import store from '../store';

import TodoLists from './TodoLists';

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <>
                    <TodoLists />
                </>
            </Provider>
        );
    }
}
