import React from 'react';
import moment from "moment/moment";
import CommentsList from "../Comments/CommentsList";
import {Meteor} from 'meteor/meteor'
import PropTypes from 'prop-types';

export default class PostView extends React.Component {
    constructor() {
        super();
        this.state = {post: null};
        this._onClick = this._onClick.bind(this);
    }

    componentDidMount() {
        Meteor.call('post.get', this.props.match.params._id, (err, post) => {
            !post.views ? post.views = 1 : post.views++;
            this.setState({post}, () => {
                Meteor.call('post.edit', this.props.match.params._id, this.state.post, (err) => {
                    if (err) {
                        return alert(err.reason);
                    }
                });
            });
        });
    }

    _onClick = (event) => {
        event.preventDefault();
        this.props.history.push("/posts")
    };

    render() {
        const {post} = this.state;

        if (!post) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                <p>Post id: {post._id} </p>
                <p>Post title: {post.title}, Post Description: {post.description} </p>
                <p> Post Type: {post.type} </p>
                <p> Post Date: {moment(post.createdAt).format('lll')} </p>
                <p> Views: {post.views ? post.views : "0"} </p>
                <button onClick={this._onClick}> Return
                </button>

                <CommentsList postId={post._id}/>
            </div>
        )
    }
}


PostView.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            _id: PropTypes.string
        })
    }),
    history: PropTypes.shape({
        push: PropTypes.func
    })
};
