import React from 'react';
import {AutoForm, AutoField, LongTextField,SelectField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';
import Types from "../../../db/posts/enums/types";
import {Meteor} from 'meteor/meteor'
import PropTypes from "prop-types";

export default class PostEdit extends React.Component {
    constructor() {
        super();
        this.state = {post: null};
        this._onClickBack=this._onClickBack.bind(this);
    }

    componentDidMount() {
        Meteor.call('post.get', this.props.match.params._id, (err, post) => {
            this.setState({post});
        });
    }

    submit = (post) => {
        Meteor.call('post.edit', this.props.match.params._id, post, (err) => {
            if (err) {
                return alert(err.reason);
            }
            this.props.history.push('/posts');
        });
    };
    _onClickBack = (event) => {
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
                <AutoForm onSubmit={this.submit} schema={PostSchema} model={post}>
                    <AutoField name="title"/>
                    <LongTextField name="description"/>
                    <SelectField name="type" options={Types} startvalue={post.type}/>

                    <button type='submit'>Edit post</button>
                    <button onClick={this._onClickBack}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}

PostEdit.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            _id: PropTypes.string
        })
    }),
    history: PropTypes.shape({
        push: PropTypes.func
    })
};
