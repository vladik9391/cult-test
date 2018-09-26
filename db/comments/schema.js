import SimplSchema from 'simpl-schema';

export default new SimplSchema({
    text: {
        type: String
    },
    userId: {
        type: String,
        optional: true
    },
    postId: {
        type: String,
        optional: true
}
});