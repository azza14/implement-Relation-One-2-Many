

const express = require('express');
const router= express.Router();
const tutorialController= require('../controller/tutorial.controller');


let routes= app =>{
    //create
    router.post('/api/tutorial/create',  tutorialController.createTutorial);
    //getAll
    router.get('/api/tutorial/tutorials', tutorialController.findAllTutorial);
    //retive tutoarial by id
    router.get("/api/tutorial/:id", tutorialController.findTutorialById);
   //create comment
    router.post('/api/comment/create',tutorialController.createComment);
    //retive by comment id
    router.get("/api/comment/:id", tutorialController.findCommentById);

};
//module.exports= routes;

