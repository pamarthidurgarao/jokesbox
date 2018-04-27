import React, { Component } from 'react';
import './style.css';
import marked from 'marked';

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
          toBeUpdated: false,
          user: '',
          text: ''
        };
        this.deleteComment = this.deleteComment.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
    }
    rawMarkup() {
        let rawMarkup = marked(this.props.children.toString());
        return { __html: rawMarkup };
    }
    updateComment(e){
        console.log("Update comment");
        e.preventDefault();
        //brings up the update field when we click on the update link.
        this.setState({toBeUpdated : !this.state.toBeUpdated});
    }
    deleteComment(e){

    }
    handleAuthorChange(e){
        this.setState({ author: e.target.value });
    }
    render() {
        return (
            <div className='comment'>
                <div className='card mb-3'>
                    {/* <img class="card-img-top" src="..." alt="Card image cap"/> */}
                    <div className="card-body">
                        <h3 className="card-title">{this.props.data.user}</h3>
                        <p className="card-text"><span dangerouslySetInnerHTML={ this.rawMarkup() } /></p>
                        <a className="updateLink" onClick={ this.updateComment }>like({this.props.data.likesCount})</a>
                        <a className="updateLink" onClick={ this.deleteComment }>comment({this.props.data.commentCount})</a>
                    </div>
                </div>
            </div>
            
        )
    }
}
export default Timeline;