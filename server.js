const express = require('express');
const app= express();
const db= require('./models');
const controller= require('./controller/tutorial.controller')

 const run= async()=>{
 
 };
app.use(express.urlencoded({ extended: true }));

//db.sequelize.sync();

  db.sequelize.sync().then(()=>{
    console.log('create Db');

    run();
   })


   app.get('/', function (req, res) {
    res.json({ message: "Welcome to azza  application upload excel file "}); 
  })
  
const PORT=  5000;
 
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
})