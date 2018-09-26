import React from 'react';
import {AutoForm, LongTextField, SubmitField} from 'uniforms-unstyled';
import CommentsSchema from '/db/comments/schema';
import {Meteor} from 'meteor/meteor'
import PropTypes from "prop-types";

export default class CommentsList extends React.Component {
    constructor() {
        super();
        this.state = {comments: null};
        this.removeComment = this.removeComment.bind(this);
    }

    componentDidMount() {
        this.reloadComents();
    }

    reloadComents = () => {
        Meteor.call('comment.list', this.props.postId, (err, comments) => {
            this.setState({comments});
        });
    };

    submit = (comment) => {
        comment.userId = this.props.userId;
        comment.postId = this.props.postId;
        Meteor.call('comment.create', comment, (err) => {
            if (err) {
                return alert(err.reason);
            }
            this.reloadComents();
        });
    };
    removeComment = (event) => {
        event.preventDefault();
        let commentId = event.target.dataset.id;

        Meteor.call('comment.remove', commentId, this.props.postId, (err, response) => {
            if (err) {
                return alert(err.reason);
            }
            if (response === true) {
                let comments = this.state.comments.filter(function (comment) {
                    return comment._id !== commentId
                });
                this.setState({comments});
            }

        });
    };


    render() {
        const {comments} = this.state;

        if (!comments) {
            return <div>Loading....</div>
        }

        return (
            <div className="comment">
                {
                    comments.map((comment) => {
                        return (
                            <div key={comment._id}>
                                <p>comment Text: {comment.text}</p>
                                <p>comment User: {comment.author.emails[0].address} </p>
                                <button onClick={this.removeComment} data-id={comment._id}>Remove</button>
                            </div>
                        )
                    })
                }
                <AutoForm
                    schema={CommentsSchema}
                    onSubmit={this.submit}
                >
                    <LongTextField name="text"/>
                    <SubmitField value="Add comment"/>
                </AutoForm>
            </div>
        )
    }
}

CommentsList.propTypes = {
    postId: PropTypes.string,
    userId: PropTypes.string
};
