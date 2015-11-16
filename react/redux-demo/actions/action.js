/**
 * Action ：
 * 	一个action只能包含以下四个属性 ：
 * 		type(必须) : 通常使用const定义
 * 		payload : 有效的数据信息，如果error为true返回一个Error对象
 * 		error
 * 		meta
 */

import * as actionTypes from "../constants/ActionTypes";
import fetch from 'isomorphic-fetch';

export function addTodoAction(text){
    return {
        type : actionTypes.ADD_TODO,
        payload : {text}
    }
}

export function completeTodoAction(index){
    return {
        type : actionTypes.COMPLETE_TODO,
        payload : {index}
    }
}

export function switchFileAction(filter){
    return {
        type : actionTypes.SWITCH_FILTER,
        payload : {filter}
    }
}

export function requestTodos(){
    return {
        type : actionTypes.REQUEST_TODOS
    }
}

export function receiveTodos(todos){
    return {
        type : actionTypes.RECEIVE_TODOS,
        payload : {todos}
    }
}

export function fetchTodos(){
    let fetchUrl = "http://localhost:8887/";
    return function(dispatch){
        dispatch(requestTodos());
        return fetch(fetchUrl)
                .then(function(response){
                    return response.json();
                })
                .then( (response) => dispatch(receiveTodos(response)));
    }
}
