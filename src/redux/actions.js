import {getTasks, getVacations} from '../api';

const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK';
const SET_TASKS = 'SET_TASKS';

const ADD_VACATION = 'ADD_VACATION';
const DELETE_VACATION = 'DELETE_VACATION';
const SET_VACATIONS = 'SET_VACATIONS';

const fetchVacations = () => (dispatch) => {
    getVacations()
    .then(data => data ? dispatch(setVacations(data)): null)
}

const setVacations = (payload) => ({
    type: SET_VACATIONS,
    payload
})

const addVacation = (payload) => ({
    type: ADD_VACATION,
    payload
})

const deleteVacation = (payload) => ({
    type: DELETE_VACATION,
    payload
})

const fetchLocalData = () => (dispatch) => {
    getTasks()
    .then(data => data ? dispatch(setTasks(data)): null)
}

const setTasks = (payload) => ({
    type: SET_TASKS,
    payload
})

const addTask = (payload) => ({
    type: ADD_TASK,
    payload
})

const deleteTask = (payload) => ({
    type: DELETE_TASK,
    payload
})

export {
    addTask, 
    deleteTask, 
    fetchLocalData, 
    addVacation,
    deleteVacation,
    fetchVacations,
    ADD_TASK, 
    DELETE_TASK, 
    SET_TASKS,
    ADD_VACATION,
    SET_VACATIONS,
    DELETE_VACATION,
}