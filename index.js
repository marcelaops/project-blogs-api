const express = require('express');
const User = require('./controllers/user');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

app.post('/user', User.create); // req1
// app.post('/login', ) // req2
// app.get('/user', ); // req3
// app.get('/user/:id', ); // req4
// app.post('/categories', ); // req5
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
