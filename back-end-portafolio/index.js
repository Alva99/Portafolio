'use strict';
const { mongoose } = require('./database');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const project = require('./routers/project');
// Setting
app.set('port' , process.env.Port || 5000);

// Middlewares
app.use(morgan('dev')); 
app.use(express.json());
app.use(cors({
    origin: '*',
    Headers:"Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method",
    methods: "GET, POST, OPTIONS, PUT, DELETE",
    Allow: "GET, POST, OPTIONS, PUT, DELETE"
}))

// Routers

app.use('/',project);

// Start server

app.listen(app.get('port') , () => {   
    console.log('Server en puerto' , app.get('port'));
});



