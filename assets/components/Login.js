import React from 'react';

import store from '../store';

import {
    actionLoginStart,
} from '../modules/Todo/actions';

const { dispatch } = store;

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: 'test@test.com',
            password: 'password'
        };
    }

    render() {
        return (
            <>
                <div className="input-group">
                    <label htmlFor="username">Username</label><br />
                    <input type="text" value={this.state.username} id="username"
                        onChange={e => {
                            this.setState({
                                username: e.target.value
                            });
                        }}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label><br />
                    <input type="password" value={this.state.password} id="password"
                        onChange={e => {
                            this.setState({
                                password: e.target.value
                            });
                        }}
                    />
                </div>
                <div className="input-group">
                    <button
                        onClick={e => {
                            const { username, password } = this.state;

                            if (username != '' && password != '') {
                                dispatch(actionLoginStart(username, password));
                            }
                        }}
                    >Login</button>
                </div>
            </>
        );
    }
}
