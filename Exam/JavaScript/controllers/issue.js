const Issue = require('../models').Issue;

module.exports = {
    index: (req, res) => {
       Issue.findAll().then(issues=>{
           res.render('issue/index', {issues:issues});
       })
    },
	
    createGet: (req, res) => {
        res.render('issue/create');
    },
	
    createPost: (req, res) => {
       let issueArgs = req.body.issue;

       Issue.create(issueArgs).then(()=>{
           res.redirect('/');
       })
    },
	
    editGet: (req, res) => {
        Issue.findById(req.params.id).then(issue=>{
            res.render('issue/edit', {issue:issue})
        })
    },

    editPost: (req, res) => {
        let issueArgs = req.body.issue;
        let content = {title: issueArgs.title, content: issueArgs.content, priority: issueArgs.priority};
        let scope = {where: {id:req.params.id}};

        Issue.update(content, scope).then(()=>{
            res.redirect("/");
        })
    },

    deleteGet: (req, res) => {
        Issue.findById(req.params.id).then(issue=>{
            res.render('issue/delete', {issue:issue})
        })
    },
	
    deletePost: (req, res) => {
        Issue.destroy({
            where:{id:req.params.id}
        }). then(()=>{
            res.redirect("/");
        })
    }
};