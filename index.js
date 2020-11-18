const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');
uuidv4();

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

let comments = [
    {   id: uuidv4(),
        username: 'Todd',
        comment: 'Please delete your comment'
    },
    {   id: uuidv4(),
        username: 'Alex',
        comment: 'Hello world!'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', {comments})
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.post('/comments', (req, res) => {
    const { username, comment} = req.body;
    comments.push({ username, comment, id: uuidv4() })
    res.redirect("/comments")
})

app.get('/comments/:id', (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', { comment })
})

app.delete('/comments/:id', (req,res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.get('/comments/:id/edit', (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find( c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})