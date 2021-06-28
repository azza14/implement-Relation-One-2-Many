const express = require('express');
const app= express();
const db= require('./models');
const controller= require('./controller/tutorial.controller')
const  TagController= require('./controller/tag.controller')

 const run= async()=>{
  const tut1 = await controller.createTutorial({
    title: "Tut#2",
    description: "Tut#122 Description",
  });
    await controller.createComment(tut1.id, {
    name: "azza3",
    text: "Good job!",
  });
  const tut2 = await controller.createTutorial({
    title: "Tut#2",
    description: "Tut#2 Description",
  });
  
  const tut3 = await controller.createTutorial({
    title: "Tut#3",
    description: "Tut#3 Description",
  });

  const tag1 = await TagController.createTage({
    name: "Tag#1",
  });
const tag2 = await TagController.createTage({
  name: "Tag#2",
   });

   await TagController.addTutorial(tag1.Id,tut1.id);

   await TagController.addTutorial(tag1.id,tut2.id);

   await TagController.addTutorial(tag1.id,tut3.id);

   await TagController.addTutorial(tag2.id,tut3.id);

   const _tag1 = await TagController.findTagById(tag1.id);
   console.log(" tag1  : ", JSON.stringify(_tag1, null, 2));

   const tags = await TagController.findAllTags();
   console.log(">> tags", JSON.stringify(tags, null, 2));

   const _tut = await controller.findById(tut3.id);
   console.log(">> tut3", JSON.stringify(_tut, null, 2));

   const tuts = await controller.findAllTutorial();
console.log(">> tuts", JSON.stringify(tuts, null, 2));
 };
app.use(express.urlencoded({ extended: true }));

//db.sequelize.sync();

  db.sequelize.sync({force:true}).then(()=>{
    console.log(' drop and re-create Db');

    run();
   })
   
// production error handler
const HTTP_SERVER_ERROR = 5000;
app.use(function(err, req, res, next) {
 if (res.headersSent) {
   return next(err);
 }

 return res.status(err.status || HTTP_SERVER_ERROR).render('5000');
});



   app.get('/', function (req, res) {
    res.json({ message: "Welcome to azza  application  implment relations "}); 
  })
  
const PORT=  5000;
 
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
})





