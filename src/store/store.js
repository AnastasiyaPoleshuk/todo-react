import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
}
  from 'redux';
import thunk from 'redux-thunk';
import TodoReducer from './reducers/TodoReducer';

const store = createStore(TodoReducer, applyMiddleware(thunk));

export default store;
