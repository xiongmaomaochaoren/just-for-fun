
import React, {Component} from "react";

/**
 *  <Calculator base="2" initValue="10"/>
 */

class Calculator extends Component{

    _handleAddBtnClick(){
        let calInfo = {
            type : "ADD",
            value : this.props.base
        }
        this.props.onCalBtnClick(calInfo);
    }

    _handleMinBtnClick(){
        let calInfo = {
            type : "MIN",
            value : this.props.base
        }
        this.props.onCalBtnClick(calInfo);
    }

    render(){
        return (
            <div>
                <div className="cal-content">
                    <span className="cal-value">{this.props.calValue}</span>
                </div>
                <div className="cal-control">
                    <button onClick={ (e) => this._handleAddBtnClick() }>累加</button>
                    <button onClick={ (e) => this._handleMinBtnClick() }>递减</button>
                </div>
            </div>
        )
    }
}

export default Calculator;
