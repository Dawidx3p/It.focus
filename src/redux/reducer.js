import { combineReducers } from "redux";
import { ADD_TASK, ADD_VACATION, DELETE_TASK, DELETE_VACATION, SET_TASKS, SET_VACATIONS } from "./actions";

function tasks(state=[], {type, payload}){
    switch(type){
        case ADD_TASK:
            return [...state, payload];
        case DELETE_TASK:
            return state.filter(task => task.id!==payload)
        case SET_TASKS:
            return payload;
        default:
            return state;
    }
}

function vacations(state=[], {type, payload}){
    switch(type){
        case ADD_VACATION:
            return [...state, payload];
        case DELETE_VACATION:
            return state.filter(vacation => vacation!==payload)
        case SET_VACATIONS:
            return payload;
        default:
            return state;
    }
}

export default combineReducers({
    tasks,
    vacations
    })