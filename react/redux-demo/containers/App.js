import React, {Component} from "react";
import ReactDOM from "react-dom";
import AddTodo from "../components/AddTodo";

export default class App extends Component{

    handleAddTodoClick(){
        console.log("addTodoClick!!!");
    }

    render(){
        return (
            <div>
                <AddTodo onAddTodoClick={ () => this.handleAddTodoClick() }/>
            </div>
        )
    }
}
