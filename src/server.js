const express = require('express')
const app = express()
const port = 8080
const host = '0.0.0.0'

const bodyParser = require('body-parser')

const createServer = async () => {
    app.use(bodyParser.json())
    
    // routes
    
    require(`./src/routes/api`)(app);
    
    app.liste(port, host ,() =>{
        console.log('App listening ${port}')
    })
}

module.exports = {
    createServer,
};