// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import reducers from '../../reducers';
import rootSaga from '../../sagas';

/**
 * @desc Configures a Redux store.
 * @return {Store} Created store object.
 */
export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const enhancer = compose(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(thunk),
    applyMiddleware(logger),
  );

  const store = createStore(reducers, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
}
