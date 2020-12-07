const loggerMiddleware = ({ getState }) => (next) => (action) => {
  const oldState = getState();
  const newState = next(action);
  if (process.env.NODE_ENV !== 'production') {
    console.log('%c OLD_STATE ===> ', 'color: red;', oldState);
    console.log('%c ACTION ===> ', 'color: cyan;', action);
    console.log('%c NEW_STATE ===> ', 'color: green;', newState);
  }

  return newState;
}

export default loggerMiddleware;
