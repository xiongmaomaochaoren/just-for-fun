/**
 *
 * 参考文档 ：
 * 	http://camsong.github.io/redux-in-chinese/docs/basics/Reducers.html
 * 	http://camsong.github.io/redux-in-chinese/docs/api/combineReducers.html
 */

import {ALL} from "../constants/TodoFilters";
import * as actionTypes from "../constants/ActionTypes";

export function todoReduce(state = [], action){
    switch(action.type){
        case actionTypes.ADD_TODO:
            //Object中的扩展运算符 ： http://es6.ruanyifeng.com/#docs/object
            return [...state, {
                text : action.payload.text,
                complete : false
            }];
            break;
        case actionTypes.COMPLETE_TODO:
            return [
                ...state.slice(0, action.payload.index),
                Object.assign({}, state[action.payload.index], {complete:true}),
                ...state.slice(action.payload.index+1)
            ];
            break;
        default:
            return state;
    }
}

export function todoFilterReduce(state = ALL, action){
    switch(action.type){
        case actionTypes.SWITCH_FILTER:
            return action.payload.filter;
            break;
        default:
            return state;
    }
}
