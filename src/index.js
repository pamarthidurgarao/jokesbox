import React from 'react';
import ReactDOM from 'react-dom';
import ReportTimeline from './ReportTimeline';
import registerServiceWorker from './registerServiceWorker';
import './style.css'

ReactDOM.render( <ReportTimeline url="http://localhost:3001/api/jokes" pollInterval={20000}/> , document.getElementById('root'));
registerServiceWorker();