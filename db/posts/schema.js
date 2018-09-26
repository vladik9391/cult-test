import SimplSchema from 'simpl-schema';

export default new SimplSchema({
    title: String,
    description: String,
    type: String,
    createdAt: {
        type: Date,
        optional: true
    },
    views: {
        type: Number,
        optional: true
    },
    userId: {
        type: String,
        optional: true
    }
});