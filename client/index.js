import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App.jsx'

if(module.hot) {
  module.hot.accept();
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);