import React from 'react';
import { connect } from 'react-redux';

import store from '../store';

import TodoLists from './TodoLists';
import Login from './Login';

class Home extends React.Component {
    checkAuth() {
        const { api_token } = this.props

        if (!api_token) {
            return <Login />;
        } else {
            return <TodoLists />;
        }
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
        api_token: store.todoState.get('meta').get('api_token'),
    }
};

export default connect(mapStateToProps)(Home);
