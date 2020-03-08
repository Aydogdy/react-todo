import React, { Component } from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {
    
    state = {
        term: ''
    };

    onSearchValueChange = (e) => {
        const term = e.target.value;
        this.setState({ term });
        
        this.props.onSearchQueryChange(term);
    }

    render() {

        const { value } = this.state;

        return (
            <input type="text"
                    className="form-control search-input"
                    placeholder="type to search"
                    onChange={this.onSearchValueChange}
                    value={value}/>
        );
    }
    
}
