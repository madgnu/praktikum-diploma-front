export function applyMiddleware(store, ...middlewares) {
  const reverseMiddlewares = middlewares.slice().reverse();
  let dispatch = store.dispatch;
  const newStore = Object.assign({}, store);
  reverseMiddlewares.forEach((middleware) => (dispatch = middleware(newStore)(dispatch)));
  newStore.dispatch = dispatch;
  return newStore;
}

export function createStore(reducer, initialState = {}) {
  let _state = initialState;
  let _callbacks = [];

  const getState = () => _state;

  const dispatch = (action) => {
    _state = reducer(_state, action);
    _callbacks.forEach((callback) => callback(_state));
    return _state;
  };

  const subscribe = (cb) => {
    _callbacks.push(cb);
    return () => _callbacks.filter((e) => e !== cb);
  };

  return { getState, dispatch, subscribe };
}
