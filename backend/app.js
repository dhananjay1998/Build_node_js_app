const express = require('express')
const bodyParser = require('body-parser')
const db = require('./sample.js');
const cors = require('cors');
// use it before all route definitions



const app = express()
const port = 3013

app.use(cors({origin: '*'}));
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/cityinterest',db.cityinterest);
app.get('/users', db.getusers);
app.get('/users/:id', db.getuserbyid);  
app.get('/cities', db.getcities);
app.get('/cities/:id',db.getcitiesbyid);
app.get('/interests',db.getinterest);
app.get('/interests/:id',db.getinterestbyid);
app.post('/createevent',db.createevent);
app.post('/createuserinterest',db.createuserinterest);
app.get('/events',db.getevents);
app.get('/getregister',db.getregister);
app.post('/registerevent',db.registerevent);
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
  

