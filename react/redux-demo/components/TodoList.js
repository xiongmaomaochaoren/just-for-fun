import React, {Component} from "react";
import TodoItem from "./TodoItem/TodoItem";
import Dialog from "./Dialog/Dialog";

export default class TodoList extends Component{
    handleTodoItemClick(index){
        this.props.onTodoListClick(index);
    }
    handleOnCloseClick(){

    }
    render(){
        return (
            <ul>
                <Dialog onCloseClick="" show={}>
                    <p>this is from dialog inner</p>
                </Dialog>
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
