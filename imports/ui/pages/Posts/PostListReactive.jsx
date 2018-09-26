import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Posts} from '/db';
import {Meteor} from 'meteor/meteor'
import PropTypes from "prop-types";

class PostListReactive extends React.Component {
    constructor() {
        super();
        this.openPost=this.openPost.bind(this);
        this.createPost=this.createPost.bind(this);
    }

    openPost = (event,postId) => {
        event.preventDefault();
        history.push("/posts/edit/" + postId)
    };
    createPost = (event) => {
        event.preventDefault();
        history.push('/posts/create')
    };

    render() {
        const {posts} = this.props;

        if (!posts) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                {
                    posts.map((post) => {
                        return (
                            <div key={post._id}>
                                <p>Post id: {post._id} </p>
                                <p>Post title: {post.title}, Post Description: {post.description} </p>
                                <p>Post type: {post.type} </p>
                                <button onClick={this.openPost(post._id)}> Edit post
                                </button>
                            </div>
                        )
                    })}
                <button onClick={this.createPost}>Create a new post</button>
            </div>
        )
    }
}


export default withTracker(props => {
    const handle = Meteor.subscribe('posts');

    return {
        loading: !handle.ready(),
        posts: Posts.find().fetch(),
        ...props
    };
})(PostListReactive);

PostListReactive.propTypes = {
    posts:PropTypes.array
};