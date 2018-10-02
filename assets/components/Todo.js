import React from 'react';

import store from '../store';

import {
    actionDeleteTodo
} from '../modules/Todo/actions';

const { dispatch } = store;

export default class Todo extends React.Component {
    render() {
        const { list, todo, idx } = this.props;
        const { name, id } = todo;

        return (
            <div className="todo">
                {name}
                <a className="delete-todo" onClick={e => {
                    dispatch(actionDeleteTodo(list, id));
                }}>[x]</a>
            </div>
        );
    }
}
