import React from 'react';
import { connect } from 'react-redux';

import store from '../store';

import {
    actionAddList,
    actionSetSelectedList,
} from '../modules/Todo/actions';

import Todos from './Todos';

const { dispatch } = store;

class TodoLists extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
        };
    }

    render() {
        const { lists, selected } = this.props;

        return (
            <>
                <div className="input-group">
                    <label htmlFor="list_name">New List</label><br />
                    <input type="text" value={this.state.name} id="list_name"
                        onChange={e => {
                            this.setState({
                                name: e.target.value
                            });
                        }}
                        onKeyPress={e => {
                            if (e.key == 'Enter') {
                                dispatch(actionAddList(this.state.name));
                                dispatch(actionSetSelectedList(this.state.name));
                                this.setState({
                                    name: ''
                                });
                            }
                        }}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="lists">Select a List</label><br />
                    <select value={selected} id="lists" onChange={e => {
                        dispatch(actionSetSelectedList(e.target.value));
                    }}>
                        <option value=""></option>
                        {
                            lists.map((list, idx) => {
                                return (
                                    <option value={list.id} key={`list_${idx}`}>{list.name}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <Todos />
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

export default connect(mapStateToProps)(TodoLists);
