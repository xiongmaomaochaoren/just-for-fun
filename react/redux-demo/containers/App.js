import React, {Component} from "react";
import ReactDOM from "react-dom";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";

export default class App extends Component{

    handleAddTodoClick(){
        console.log("addTodoClick!!!");
    }

    handleTodoListClick(index){
        console.log("item 点击了!!!");
    }

    render(){
        return (
            <div>
                <AddTodo onAddTodoClick={ () => this.handleAddTodoClick() }/>
                <TodoList todos={[{
                            text: 'Use Redux',
                            completed: true
                          }, {
                            text: 'Learn to connect it to React',
                            completed: false
                          }]}
                          onTodoListClick={ (index) => this.handleTodoListClick(index) } />
            </div>
        )
    }
}
