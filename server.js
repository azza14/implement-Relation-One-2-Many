const express = require('express');
const app= express();
const db= require('./models');
const controller= require('./controller/tutorial.controller')

 const run= async()=>{
  const tut1 = await controller.createTutorial({
    title: "Tut#2",
    description: "Tut#122 Description",
  });
  const comment1 = await controller.createComment(tut1.id, {
    name: "azza3",
    text: "Good job!",
  });

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