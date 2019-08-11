import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import TicketsLogic from './components/TicketsLogic';
import './index.css';

const app = <TicketsLogic><App /></TicketsLogic>

ReactDOM.render(app, document.getElementById('root'));
