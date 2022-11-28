import {
    ADD__TODO,
    EDIT__TODO,
    DELETE__TODO,
    GET__TODOS,
    SET__FILE
} from '../actionTypes';

export const AddTodoAction = (payload) => {
    return { type: ADD__TODO, payload };
};

export const EditTodoAction = (payload) => {
    return { type: EDIT__TODO, payload };
};

export const DeleteTodoAction = (payload) => {
    return { type: DELETE__TODO, payload };
};

export const GetTodosAction = (payload) => {
    return { type: GET__TODOS, payload };
};

export const SetFileAction = (payload) => {
    return { type: SET__FILE, payload };
};