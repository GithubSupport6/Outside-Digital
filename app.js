const express = require('express')
const bodyparser = require('body-parser');
const jsonParser = bodyparser.json();
const app = express();
const config = require('./config');
const port = config.app.port;

const router = express.Router();
const tag = require('./routes/tag');
const user = require('./routes/user');
const auth = require('./routes/auth');
const cors = require('cors');

const migrations = require('./database/migrations');
const migrationsRequired = require('./config.json').db.migrationsRequired;
if (migrationsRequired){
    migrations.apply();
}


app.use(jsonParser);

app.use('/tag',tag);
app.use('/user',user);
app.use('/', auth);

app.use(cors());
app.options('*', cors());

app.get('/',(req,res)=>{
  res.send ("This is a simple CRUD app");
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
