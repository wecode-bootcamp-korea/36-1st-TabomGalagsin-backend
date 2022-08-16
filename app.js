const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config();
const app = express()
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());

app.get('/ping', function(req, res){
    res.json({message: 'pong'})
})

app.listen(process.env.PORT, function () {
  console.log(`server listening on port ${process.env.PORT}`) 
})