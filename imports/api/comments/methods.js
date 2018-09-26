import {Meteor} from 'meteor/meteor'
import CommentService from "./services/CommentService";

Meteor.methods({
    'comment.create'(comment) {
        CommentService.create(comment);
    },

    'comment.list'(pId) {
        return CommentService.list(pId);
    },

    'comment.remove'(commentId, postId) {
        return CommentService.remove(commentId, postId);
    }
});