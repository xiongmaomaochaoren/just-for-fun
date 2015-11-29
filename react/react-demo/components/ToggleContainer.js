import React, { Component } from "react";
import ReactDOM from "react-dom";

import ToggleButton from "./ToggleButton";

class ToggleContainer extends Component{

    // Move state initialization into the constructor
    constructor(props){
        super(props);
        this.state = {
            checked : false
        };
        this._handleToggleButtonClick = this._handleToggleButtonClick.bind(this);
    }

    _handleToggleButtonClick(newState){
        this.setState({
            checked : newState
        });
    }

    render(){
        let isChecked = this.state.checked ? "yes" : "no";
        return (
            <div>
                <div> the button is : {isChecked}</div>
                <ToggleButton text="Toggle Me" initialChecked={this.state.checked} onToggleButtonClick={this._handleToggleButtonClick}/>
            </div>
        );
    }
}

export default ToggleContainer;
