import React, { Component } from 'react';
import Timeline from './Timeline';
import './style.css';

class TimelineList extends Component {
    constructor(props){
        super(props);
        this.state = { data: [] };
    }
    render() {
        let timelineNode = this.props.data.map(timeline => {
            return (
            <Timeline data={ timeline } key={ timeline._id }>
            { timeline.text}
            </Timeline>
        )})
        return (
            <div>
                <div className='commentList1'>{ timelineNode }</div>
            </div>
        )
    }
}
export default TimelineList;
