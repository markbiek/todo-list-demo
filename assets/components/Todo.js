import React from 'react';

import store from '../store';

import {
    actionDeleteTodo
} from '../modules/Todo/actions';

const { dispatch } = store;

export default class Todo extends React.Component {
    render() {
        const { list, todo, idx } = this.props;

        return (
            <div className="todo">
                {todo}
                <a className="delete-todo" onClick={e => {
                    dispatch(actionDeleteTodo(list, idx));
                }}>[x]</a>
            </div>
        );
    }
}
