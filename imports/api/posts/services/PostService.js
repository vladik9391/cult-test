import {Comments, Posts} from '/db';
import {Meteor} from "meteor/meteor";

class PostService {

    static create(post) {
        post.userId = Meteor.userId();
        Posts.insert(post);
    }

    static list() {
        const query = Posts.createQuery({
            title: 1,
            createdAt: 1,
            description: 1,
            type: 1,
            views:1,
            author: {
                emails: 1
            },
            commentsList: {
                userId: 1,
                text: 1
            }
        });

        return query.fetch();
    }

    static edit(_id, post) {
        Posts.update(_id, {
            $set: {
                title: post.title,
                description: post.description,
                type: post.type,
                views: post.views
            }
        });
    }

    static remove(postId) {

        const query = Comments.createQuery({
            $filters: {postId: postId}
        });

        if(this.getOne(postId).author._id === Meteor.userId()){
            for (let comment of query.fetch()) {
                Comments.remove(comment._id);
            }
            Posts.remove(postId);
            return true;
        }

        throw new Meteor.Error(500, 'not_allowed',
            'You are not allowed to remove this post');
    }

    static getOne(id) {

        const query = Posts.createQuery({
            $filters: {_id: id},
            title: 1,
            createdAt: 1,
            description: 1,
            type: 1,
            views: 1,
            author: {
                emails: 1
            },
            commentsList: {
                userId: 1,
                text: 1,
                author: {
                    emails: 1
                }
            }
        });

        return query.fetchOne();

    }
}

export default PostService