import React, { Component } from 'react';
import { BrowserRouter as Router,Route, Redirect} from 'react-router-dom';
import ReportTimeline from './ReportTimeline';
import Login from './common/login/Login';
import Register from './common/register/Register'
import './style.css';

function isLogged(){
   return localStorage.getItem('user');
}

function Home(props){
    const logged = true;
    if(logged){
        return(<Route path="/" component={ReportTimeline} />)
    }else{
        return(<Redirect  from="/" to="/login" />)
    }
}

class App extends Component {
    render() {
        return (
           <Router>
           <div>
             <Route path="/jokes" component={ReportTimeline} />
             <Route path="/login" component={Login} />
             <Route path="/register" component={Register} />
             <Home/>
           </div>
         </Router>)
    }
}
export default App;
