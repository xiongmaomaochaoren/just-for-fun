import React, { Component } from "react";
import ReactDOM from "react-dom";

class ToggleButton extends Component{

    constructor(props){
        super(props);
        this.state = {
            checked : this.props.initialChecked
        }
        /**
         * With the move to ES6 classes, we must handle this binding ourselves. The React team recommends prebinding in the constructor.
         * 或者使用箭头函数 自动处理this的作用域
         */
        this._handleOnChange = this._handleOnChange.bind(this);
    }

    _handleOnChange(e){
        let newState = !this.state.checked;
        this.setState({
            checked : newState
        });
        this.props.onToggleButtonClick(newState);
    }

    render(){
        return (
            <label>
                {this.props.text}
                <input type="checkbox" checked={this.state.checked} onChange={this._handleOnChange} />
            </label>
        );
    }
}

export default ToggleButton;
