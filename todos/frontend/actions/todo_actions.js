import * as APIUtil from '../utils/todo_api_util';
import { receiveErrors, clearErrors } from './error_actions';

export const RECEIVE_TODOS = "RECEIVE_TODOS";
export const RECEIVE_TODO = "RECEIVE_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const TODO_ERROR = "TODO_ERROR";

export const receiveTodos = todos => ({
  type: RECEIVE_TODOS,
  todos
});

export const receiveTodo = todo => ({
  type: RECEIVE_TODO,
  todo
});

export const removeTodo = todo => ({
  type: REMOVE_TODO,
  todo
});

export const todoError = error => ({
  type: TODO_ERROR,
  error
});

export const fetchTodos = () => dispatch => {
  return APIUtil.fetchTodos().then(todos => dispatch(receiveTodos(todos)));
};

export function createTodo(todo) {
  return (dispatch) => {
    return APIUtil.createTodo(todo)
      .then(newTodo => {dispatch(receiveTodo(newTodo)); dispatch(clearErrors());},
            err => dispatch(receiveErrors(err.responseJSON)));
  };
}

export function updateTodo(todo) {
  return (dispatch) => {
    return APIUtil.updateTodo(todo)
      .then(newTodo => dispatch(receiveTodo(newTodo)),
            err => dispatch(receiveErrors(err.responseJSON)));
  };
}

export const deleteTodo = (todo) => dispatch => {
  return APIUtil.deleteTodo(todo).then(oldTodo => dispatch(removeTodo(oldTodo)));
};
