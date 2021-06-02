const express = require('express');
const path      = require('path');

const app = express ();
app.use(express.static('./dist/CINEMADASHBOARD'));

app.get('/*',(req,res)=>
res.sendFile('index.html',{root: './dist/CINEMADASHBOARD/'}),
);

app.listen(process.env.port || 8080);