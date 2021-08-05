import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

import { commentsPageReducer } from './commentsPage-reducer';

const reducers = combineReducers({
  commentsPage: commentsPageReducer,
  form: formReducer,
});
export let store = createStore(reducers, applyMiddleware(thunk));
