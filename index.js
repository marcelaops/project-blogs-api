const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const { verifyToken } = require('./services/auth');

const User = require('./controllers/user');
const Login = require('./controllers/login');
const Category = require('./controllers/categories');
const Post = require('./controllers/post');

const app = express();
app.use(express.json());

app.post('/user', User.create); // req1
app.post('/login', Login.login); // req2

app.get('/user', verifyToken, User.getAll); // req3
app.get('/user/:id', verifyToken, User.findById); // req4

app.post('/categories', verifyToken, Category.create); // req5
app.get('/categories', verifyToken, Category.getAll); // req6

app.post('/post', verifyToken, Post.create); // req7
app.get('/post', verifyToken, Post.getAll); // req8
app.get('/post/:id', verifyToken, Post.findById); // req9
app.put('/post/:id', verifyToken, Post.update); // req10

app.delete('/post/:id', verifyToken, Post.remove); // req11
app.delete('/user/me', verifyToken, User.remove); // req12

app.use(errorHandler);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
