import {Meteor} from 'meteor/meteor'
import PostService from "./services/PostService";


Meteor.methods({
    'post.create'(post) {
        PostService.create(post);
    },

    'post.list'() {
        return PostService.list();
    },

    'post.edit'(_id, post) {
        PostService.edit(_id, post);
    },

    'post.remove'(_id) {
        return PostService.remove(_id);
    },

    'post.get'(_id) {
        return PostService.getOne(_id);
    }
});