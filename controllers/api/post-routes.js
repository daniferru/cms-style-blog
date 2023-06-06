const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

//GET all posts
router.get('/', (req,res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at'
        ],
        order: [['create_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['usernmae']
                }
            },
            {
                model: User,
                attributes: ['username']
            },
        ]
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Get post by id
router.get('/:id', (req, res) => {
Post.findOne({
    where: {
        id: req.params.id
    },
    attributes: [
        'id',
        'post_text',
        'title',
        'created_at'
    ],
    include: [
        {
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                mmodel: User,
                attributes: ['username']
            }
        }
    ]
})
.then(postData => {
    if (!postData) {
        res.status(404).json({ message: 'No post with this id can be found.' });
        return;
    }
    res.json(postData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

//CREATE new post
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//UPDATE post
router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        post_text: req.body.post_text
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({ message: 'No post with this id can be found.' });
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//DELETE a post
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({ messgae: 'No post with this id can be found.' });
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;