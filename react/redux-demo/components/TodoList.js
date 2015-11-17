import React, {Component} from "react";
import ReactDom from "react-dom";
import TodoItem from "./TodoItem/TodoItem";

export default class TodoList extends Component{
    handleTodoItemClick(index){
        this.props.onTodoListClick(index);
    }
    render(){
        return (
            <ul>
                {this.props.todos.map((todo, index) => {
                    return  <TodoItem
                                {...todo}
                                key={index}
                                index={index}
                                onTodoItemClick={ (index) => this.handleTodoItemClick(index)}/>
                })}
            </ul>
        )
    }
}
