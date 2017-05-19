import { createStore, applyMiddleware, combineReducers } from 'redux';
import lyricsReducer from './reducers/lyrics-reducer';
import playerReducer from './reducers/player-reducer';

import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

 const combinedReducers = combineReducers({
  lyrics: lyricsReducer,
  player: playerReducer
});

 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const store = createStore(combinedReducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(loggerMiddleware, thunkMiddleware)
  ));

 export default store;