import React, {Component} from "react";

export default class TodoItem extends Component{
    handleItemClick(e){
        this.props.onTodoItemClick(this.props.index);
    }
    render(){
        return (
            <li onClick={ (e) => this.handleItemClick(e) } >
                {this.props.text}
            </li>
        );
    }
}
