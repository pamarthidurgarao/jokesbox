import React, { Component } from 'react';
import TimelineList from './TimelineList';
import Header from './common/Header'
import axios from 'axios';
import './style.css';

class ReportTimeline extends Component {
    constructor(props) {
        super(props);   
        this.state = { data: [] }; 
        this.loadData = this.loadData.bind(this);
        this.saveJoke = this.saveJoke.bind(this);
    }
    loadData(){
        axios.get('/api/jokes')
        .then(res => {
            console.log(res.data );
          this.setState({ data: res.data });
        })
    }
    saveJoke(jok,user){
        debugger
        console.log("save joke called"+ jok);
        let joke={"user":user,"text":jok};
        let jokes = this.state.data;
        let newComments = jokes.concat([joke]);
        this.setState({ data: newComments });
        axios.post('/api/jokes', joke)
          .catch(err => {
            console.error(err);
            this.setState({ data: jokes });
          });
    }
    componentDidMount() {
        this.loadData();
          this.pollInterval = setInterval(this.loadData, 30000)
      }
    componentWillUnmount() {
      this.pollInterval && clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
    render() {
        return ( 
        <div className = "commentBox"> 
            <Header addJoke={this.saveJoke}/>
            <TimelineList data = { this.state.data }/> 
        </div>
        );
    }
}

export default ReportTimeline;