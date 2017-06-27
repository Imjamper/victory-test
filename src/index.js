import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Menu from './Menu';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<Menu />, document.getElementById('root'));
registerServiceWorker();
