import {Comments,Posts} from '/db';
import {Meteor} from "meteor/meteor";

class CommentService {

    static create(comment) {
        comment.userId = Meteor.userId();
        Comments.insert(comment);
    }

    static list(pId) {
        const query = Comments.createQuery({
            $filters: {postId: pId},
            text: 1,
            author: {
                emails: 1
            }
        });

        return query.fetch();
    }

    static remove(commentId, postId) {
        if(Comments.findOne(commentId).userId === Meteor.userId() || Posts.findOne(postId).userId === Meteor.userId()){
            Comments.remove(commentId);
            return true;
        }
        throw new Meteor.Error(500, 'not_allowed',
            'You are not allowed to remove this post');
    }
}

export default CommentService
