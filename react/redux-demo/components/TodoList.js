import React, {Component} from "react";
import ReactDom from "react-dom";
import TodoItem from "./TodoItem";

export default class TodoList extends Component{
    handleTodoItemClick(index){
        this.props.onTodoListClick(index);
    }
    render(){
        return (
            <ul>
                //todo : 关于大括号的嵌套问题
                {this.props.todos.map((todo, index) =>
                        <TodoItem
                            {...todo}
                            key={index}
                            onTodoItemClick={ (index) => this.handleTodoItemClick(index)}/>
                )}
            </ul>
        )
    }
}
