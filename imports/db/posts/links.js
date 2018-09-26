import {Posts, Comments} from '/db';



Posts.addLinks({
    'author': {
        type: 'one',
        collection: Meteor.users,
        field: 'userId',
    },
    'commentsList': {
        collection: Comments,
        inversedBy: 'postName'
    }

});
Comments.addLinks({
    'postName': {
        type: 'one',
        collection: Posts,
        field: 'postId',
    },
    'author': {
        type: 'one',
        collection: Meteor.users,
        field: 'userId',
    },
});