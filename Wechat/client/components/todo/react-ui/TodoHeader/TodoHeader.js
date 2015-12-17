
import React, {Component} from "react";

let logoImg = require("./assets/todoLogo.png");

export default class TodoHeader extends Component{
    render(){
        return (
            <img src={logoImg} />
        )
    }
}
