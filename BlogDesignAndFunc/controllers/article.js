const Article = require('../models').Article;
const User = require('../models').User;
let artId = 0;

module.exports = {
    createGet: (req, res) => {
        res.render('article/create');
    },

    createPost: (req, res) => {
        let articleArgs = req.body;

        let errorMsg = '';

        if (!req.isAuthenticated()) {
            errorMsg = "You need to be logged in to write articles!";
        } else if (!articleArgs.title) {
            errorMsg = "Invalid title!";
        } else if (!articleArgs.content) {
            errorMsg = "Invalid content";
        }

        if (errorMsg) {
            res.render('article/create', {error: errorMsg});
            return;
        }
        articleArgs.authorId = req.user.id;

        Article.create(articleArgs).then(article => {
            res.redirect('/');
        }).catch(err => {
            console.log(err.message);
            res.render('article/create', {error: err.message});
        });
    },

    details: (req, res) => {
        id = req.params.id;
        Article.findById(id, {
            include: [
                {
                    model: User,
                }
            ]
        }).then(article => {
            article.increment('views');
            res.render('article/details', article.dataValues);
        });
    },

    collectionGet: (req, res) => {
        Article.findAll({
            where: {authorId: req.user.dataValues.id}
        }).then(articles => {
            res.render('article/articlesEdit', {articles: articles});
        })
    },

    editGet: (req, res) => {
        artId = req.params.id;
        Article.findById(artId, {
            include: [
                {
                    model: User,
                }
            ]
        }).then(article => {
            res.render('article/edit', article.dataValues);
        });
    },


    editPost: (req, res) => {
        let errorMsg = '';
        let editArgs = req.body;

        if (!req.isAuthenticated()) {
            errorMsg = "You need to be logged in to edit articles!";
        } else if (!editArgs.title) {
            errorMsg = "Invalid title!";
        } else if (!editArgs.content) {
            errorMsg = "Invalid content";
        }

        if (errorMsg) {
            res.render('article/articlesEdit', {error: errorMsg});
            return;
        }

        let contents = {title: editArgs.title, content: editArgs.content, image: editArgs.image};
        let scope = {where: {id: artId}};
        let opts = {multi: false};

        Article.update(contents, scope, opts).then(() => {
            res.redirect('articlesEdit');
            artId = 0;
        })
    },

    delete: (req, res) => {
        artId = req.params.id;
            Article.destroy({
                where:{id:artId}
            }).then(()=>{
                res.render('article/postDelete');
            });
    }
};