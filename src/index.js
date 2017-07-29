import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ShewhartMap from './ShewhartMap';
import Menu from './Menu';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<ShewhartMap />, document.getElementById('root'));
registerServiceWorker();
