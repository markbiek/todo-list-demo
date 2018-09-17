import React from 'react';
import { connect } from 'react-redux';

import store from '../store';

import {
    actionAddTodo,
    getList,
} from '../modules/Todo/actions';

import Todo from './Todo';

const { dispatch } = store;

class Todos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
        };
    }

    render() {
        const { lists, selected } = this.props;

        if (selected == '') {
            return null;
        }

        const list = getList(lists, selected);
        const { todos } = list;

        return (
            <>
                <div className="input-group todo-form">
                    <label htmlFor="todo_name">New Todo</label><br />
                    <input type="text" value={this.state.name} id="todo_name"
                        onChange={e => {
                            this.setState({
                                name: e.target.value
                            });
                        }}
                        onKeyPress={e => {
                            if (e.key == 'Enter') {
                                dispatch(actionAddTodo(list.name, this.state.name));
                                this.setState({
                                    name: ''
                                });
                            }
                        }}
                    />
                </div>
                <div className="todos">
                    {
                        todos.map((todo, idx) => {
                            return (
                                <Todo list={list.name} todo={todo} idx={idx} key={`todo_${idx}`} />
                            )
                        })
                    }
                </div>
            </>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        selected: store.todoState.get('meta').get('selected'),
        lists: store.todoState.get('lists').toJS()
    }
};

export default connect(mapStateToProps)(Todos);
