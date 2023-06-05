const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//GET users api
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']}
    })
    .then(userData => res.json(userData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//GET user by id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_text', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No user with this id can be found' });
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//CREATE new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(userData => {
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logedIn = true;
            
            res.json(userData);
        });
    });
});

//user login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(userData => {
        if (!userData) {
        res.status(400).json({ message: 'No username not found.' });
        return;
    }
    const validPw = userData.checkPassword(req.body.password);
    if (!validPw) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
    }
    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;

        res.json({ user: userData, message: 'You are now logged in!' });
    });
});
});

//logout 
router.post('/logout', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

//UPDATE user
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData[0]) {
            res.status(404).json({ message: 'No user with this id' });
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//DELETE
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;