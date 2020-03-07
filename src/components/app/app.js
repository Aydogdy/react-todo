import React, { Component } from 'react';
import ReactDom from 'react-dom';

import AppHeader from './../app-header';
import SearchPanel from './../search-panel';
import ItemStatusFilter from './../item-status-filter';
import TodoList from './../todo-list';
import ItemAddForm from './../item-add-form'

import './app.css';

export default class App extends Component {

    state = {
        todoData: [
            { label: 'Drink Coffee', important: false, id: 1 },
            { label: 'Make Awesome App', important: true, id: 2 },
            { label: 'Have a lunch', important: false, id: 3 }
        ]
    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const indx = todoData.findIndex(item => item.id === id);

            const newArray = [
                ...todoData.slice(0, indx),
                ...todoData.slice(indx + 1),
            ];

            return {
                todoData: newArray
            }
        }) 
    };

    render() {
        return (
            <div className="todo-app">
              <AppHeader toDo={1} done={3} />
              <div className="top-panel d-flex">
                <SearchPanel />
                <ItemStatusFilter />
              </div>
        
              <TodoList todos={this.state.todoData}
                        onDeleted={ this.deleteItem }/>

              <ItemAddForm />
            </div>
        );
    }
    
};
