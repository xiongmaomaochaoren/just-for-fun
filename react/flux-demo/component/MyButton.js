import React from "react";
import ReactDOM from "react-dom";

import ListStore from "../store/ListStore";
import ListAction from "../action/ListAction";

export default class FluxButton extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            listHtml : this.getListsHtml()
        }
        this.listChange = this.listChange.bind(this);
    }

    getListsHtml(){
        let lists = ListStore.getLists();
        let listsHtml = lists.map(function(list){
            return <li>{list}</li>;
        });
        return listsHtml;
    }

    listChange(){
        this.setState({
            listHtml : this.getListsHtml()
        });
    }

    handleAddItem(){
        console.log("button click");
        ListAction.add("又添加了一个条目");
    }

    componentDidMount(){
        ListStore.bind("change", this.listChange);
    }

    componentWillUnmount(){
        ListStore.unbind("change", this.listChange);
    }

    render(){
        return (
            <div>
                <ul>{this.state.listHtml}</ul>
                <button onClick={this.handleAddItem}>添加一条记录</button>
            </div>
        );
    }
}
