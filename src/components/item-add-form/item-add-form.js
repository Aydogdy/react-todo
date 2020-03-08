import React, { Component } from 'react';
import ReactDom from 'react-dom';

import './item-add-form.css';

export default class ItemAddForm extends Component {

    state = {
        label: ''
    };

    onLabelChange = (ev) => {
        this.setState({
            label: ev.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAddItem(this.state.label);
        this.setState({
            label: ''
        })
    }

    render() {

       const { label } = this.state;

       return (
        <form className="item-add-form d-flex"
                onSubmit={this.onSubmit}>
            <input type="text"
                    placeholder="What needs to be done"
                    className="form-control"
                    onChange={this.onLabelChange}
                    value={label}/>
            <button type="submit"
                    className="btn btn-outline-secondary">
                        Add Item
            </button>
        </form>
       )
    }

}