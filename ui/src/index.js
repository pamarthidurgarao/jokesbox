import React from 'react';
import ReactDOM from 'react-dom';
import ReportTimeline from './ReportTimeline';
import registerServiceWorker from './registerServiceWorker';
import './style.css'

ReactDOM.render( <ReportTimeline url="https://jokesbox.herokuapp.com//api/jokes" pollInterval={20000}/> , document.getElementById('root'));
registerServiceWorker();