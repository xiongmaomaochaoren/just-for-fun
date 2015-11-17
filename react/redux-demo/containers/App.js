import React, {Component} from "react";
import ReactDOM from "react-dom";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import TodoFooter from "../components/TodoFooter";
import TodoHeader from "../components/TodoHeader/TodoHeader";
import * as todoActions from "../actions/action";
import { connect } from "react-redux";
import * as FilterConstants from "../constants/TodoFilters";

class App extends Component{

    componentDidMount(){
        console.log("componentDidMount call");
        this.props.dispatch(todoActions.fetchTodos()).then( () => {
            console.log("callback call");
            console.log(this.props.showTodos);
        });
    }

    handleAddTodoClick(text){
        console.log("addTodoClick!!!");
        //connect会自动注入 mapStateToProps的属性以及dispatch方法到props上
        this.props.dispatch(todoActions.addTodoAction(text));
    }

    handleTodoListClick(index){
        console.log(`${index} item 点击了!!!`);
        this.props.dispatch(todoActions.completeTodoAction(index));
    }

    handleTodoFooterClick(type){
        console.log(`筛选type ${type}`);
        this.props.dispatch(todoActions.switchFileAction(type));
    }

    render(){
        const { showTodos, showFilter} = this.props;
        console.log(showTodos);
        return (
            <div>
                <TodoHeader />
                <AddTodo onAddTodoClick={ (text) => this.handleAddTodoClick(text) }/>
                <TodoList todos={this.props.showTodos} onTodoListClick={ (index) => this.handleTodoListClick(index) } />
                <TodoFooter onTodoFooterClick={ (type) => this.handleTodoFooterClick(type) } />
            </div>
        )
    }
}

function seleteShowTodos(todos, filter){
    switch(filter){
        case FilterConstants.ALL:
            return todos;
            break;
        case FilterConstants.COMPLETED:
            return todos.filter( (todo) => todo.complete);
            break;
        case FilterConstants.ACTIVE:
            return todos.filter( (todo) => !todo.complete);
            break;
    }
}

/**
 * 从State中返回App Component需要使用的props
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
function seletePropsFromState(state){
    return {
        showTodos : seleteShowTodos(state.todos, state.showFilter),
        showFilter : state.showFilter
    }
}

export default connect(seletePropsFromState)(App);
