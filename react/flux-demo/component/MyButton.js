import React from "react";
import ReactDOM from "react-dom";

import ListStore from "../store/ListStore";
import ListAction from "../action/ListAction";

export default class FluxButton extends React.Component{
    
    constructor(props){
        super(props);
        this.listChange = this.listChange.bind(this);
    }

    listChange(){
        this.forceUpdate();
    }

    handleAddItem(){
        console.log("button click");
        ListAction.add("有添加了一个条目");
    }

    componentDidMount(){
        ListStore.bind("change", this.listChange);
    }

    componentWillUnmount(){
        ListStore.unbind("change", this.listChange);
    }

    render(){
        let lists = ListStore.getLists();
        
        var listsHtml = lists.map(function(list){
            return <li>{list}</li>;
        });
        
        return (
            <div>
                <ul>{listsHtml}</ul>
                <button onClick={this.handleAddItem}>添加一条记录</button>
            </div>
        );
    }
}
