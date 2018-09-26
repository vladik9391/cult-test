import React from 'react';
import moment from "moment/moment";
import {Meteor} from 'meteor/meteor'
import PropTypes from "prop-types";

export default class PostList extends React.Component {
    constructor() {
        super();
        this.state = {posts: null};
        this.removePost = this.removePost.bind(this);
        this.createPost = this.createPost.bind(this);
        this.editPost = this.editPost.bind(this);
        this.viewPost = this.viewPost.bind(this);
    }
    componentDidMount() {
        Meteor.call("post.list", (err, posts) => {
            this.setState({posts});
        });
    }
    removePost = (event) => {
        event.preventDefault();
        let postId = event.target.dataset.id;

        Meteor.call('post.remove', postId, (err, response) => {
            if (err) {
                return alert(err.reason);
            }
            if (response === true) {
                let posts = this.state.posts.filter(function (post) {
                    return post._id !== postId
                });
                this.setState({posts});
            }

        });
    };

    createPost = (event)=>{
        event.preventDefault();
        this.props.history.push('/posts/create');
    };
    editPost = (event) => {
        event.preventDefault();
        let postId = event.target.dataset.id;
        this.props.history.push("/posts/edit/" + postId)
    };
    viewPost = (event) => {
        event.preventDefault();
        let postId = event.currentTarget.dataset.id;
        this.props.history.push("/posts/view/" + postId)
    };


    render() {
        const {posts} = this.state;

        if (!posts) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                {
                    posts.map((post) => {
                        return (
                            <div key={post._id}>
                                <div onClick={this.viewPost} data-id={post._id}>
                                    <p>Title: {post.title}, Type: {post.type} </p>
                                    <p>Description: {post.description}  </p>
                                    <p>Views: {post.views ? post.views : 0}  </p>
                                    <p>Comments: {post.commentsList ? post.commentsList.length : 0}  </p>
                                    <p>Created Date: {moment(post.createdAt).format('lll')} </p>
                                </div>
                                <button onClick={this.editPost} data-id={post._id}> Edit post
                                </button>
                                <button onClick={this.removePost} data-id={post._id}> Remove post
                                </button>
                                <hr/>
                            </div>
                        )
                    })}
                <button onClick={this.createPost}>Create a new post</button>
            </div>
        )
    }
}

PostList.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    })
};
