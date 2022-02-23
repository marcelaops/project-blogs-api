const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const { verifyToken } = require('./services/auth');

const User = require('./controllers/user');
const Login = require('./controllers/login');
const Category = require('./controllers/categories');

const app = express();
app.use(express.json());

app.post('/user', User.create); // req1
app.post('/login', Login.login); // req2

app.get('/user', verifyToken, User.getAll); // req3
app.get('/user/:id', verifyToken, User.findById); // req4

app.post('/categories', verifyToken, Category.create); // req5
// app.get('/categories', ); // req6
// app.post('/post', ); // req7
// app.get('/post', ); // req8
// app.get('/post/:id', ); // req9
// app.put('/post/:id', ); // req 10

app.use(errorHandler);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
