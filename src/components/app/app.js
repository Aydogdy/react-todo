import React, { Component } from 'react';
import ReactDom from 'react-dom';

import AppHeader from './../app-header';
import SearchPanel from './../search-panel';
import ItemStatusFilter from './../item-status-filter';
import TodoList from './../todo-list';
import ItemAddForm from './../item-add-form'

import './app.css';

export default class App extends Component {

    maxIds = 100;

    state = {
        todoData: [
            this.createToDoItem('Drink Coffee'),
            this.createToDoItem('Make Awesome App'),
            this.createToDoItem('Have a lunch')
        ],
        searchQuery: ''
    };

    createToDoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxIds++
        };
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

    addItem = (text) => {
        this.setState(({ todoData }) => {
            const newItem = this.createToDoItem(text);
            const newArray = [
                ...todoData,
                newItem
            ];

            return {
                todoData: newArray
            };
        })
    }

    toggleProperty(arr, id, propName) {
        const indx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[indx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        return [
            ...arr.slice(0, indx),
            newItem,
            ...arr.slice(indx+1)
        ];
    }

    toggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        })
    }

    toggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        })
    }

    search = (items, searchQuery) => {

        if (searchQuery.trim() === '') {
            return items;
        }

        return items.filter(item => {
            return item.label.toLowerCase().indexOf(searchQuery) > -1;
        });
    }

    onSearchQueryChange = (searchQuery) => {
        this.setState({ searchQuery });
    }

    render() {

        const { todoData, searchQuery } = this.state;

        const doneCount = todoData
                              .filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        const visibleItems = this.search(todoData, searchQuery);

        return (
            <div className="todo-app">
              <AppHeader toDo={ todoCount } done={ doneCount } />
              <div className="top-panel d-flex">
                <SearchPanel onSearchQueryChange={this.onSearchQueryChange}/>
                <ItemStatusFilter />
              </div>
        
              <TodoList todos={visibleItems}
                        onDeleted={ this.deleteItem }
                        onToggleImportant={this.toggleImportant}
                        onToggleDone={this.toggleDone}/>

              <ItemAddForm onAddItem={this.addItem}/>
            </div>
        );
    }
    
};
