import React from 'react';
import { connect } from 'react-redux';

import store from '../store';

import {
    LOGIN_IN_PROGRESS,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
} from '../modules/Todo/actions';

import TodoLists from './TodoLists';
import Login from './Login';

class Home extends React.Component {
    checkAuth() {
        const { login: { status, err } } = this.props;

        if (status == LOGIN_IN_PROGRESS) {
            return <p>Logging in...</p>;
        }

        if (status == LOGIN_FAILED) {
            return <p className="error">({err})</p>;
        }

        if (status == LOGIN_SUCCESS) {
            return <TodoLists />;
        }

        return <Login />;
    }

    render() {
        return (
            <>
                {this.checkAuth()}
            </>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        login: store.todoState.get('meta').get('login').toJS(),
    }
};

export default connect(mapStateToProps)(Home);
