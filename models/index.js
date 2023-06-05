const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// to make multiple post
User.hasMany(Post, {
    foreignKey: 'user_id'
});

//post belongs to only one user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

//comment belongs to only one user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

//can make multiple comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

//can make multiple posts
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };