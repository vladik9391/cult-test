import React from 'react';
import {AutoField, AutoForm, LongTextField, SelectField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';
import Types from "../../../db/posts/enums/types";
import {Meteor} from 'meteor/meteor'
import PropTypes from "prop-types";

export default class PostCreate extends React.Component {
    constructor() {
        super();
        this.showPosts = this.showPosts.bind(this);
    }

    submit = (post) => {
        post.createdAt = new Date();
        Meteor.call('post.create', post, (err) => {

            if (err) {
                return alert(err.reason);
            }
            this.props.history.push('/posts');
        });
    };
    showPosts = (event) => {
        event.preventDefault();
        history.push('/posts')
    };

    render() {

        return (
            <div className="post">
                <AutoForm onSubmit={this.submit} schema={PostSchema}>
                    <AutoField name="title"/>
                    <LongTextField name="description"/>
                    <SelectField name="type" options={Types}/>

                    <button type='submit'>Add post</button>
                    <button onClick={this.showPosts}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}

PostCreate.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    })
};