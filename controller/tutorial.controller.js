const db = require('../models/');

 const Tutorial = db.tutorials;
 const Comment = db.comments;
 const Tag = db.tags;


 const createTutorial = (tutorial) => {

     return Tutorial.create({

             title: tutorial.title,
             description: tutorial.description,
             published: tutorial.published ? tutorial.published: false

         }).then((tutorial) => {
             console.log(">> Created tutorial: " + JSON.stringify(tutorial, null, 4));
           //  console.log('>> Created tutorial 2:' + tutorial);
             return tutorial;
         })
         .catch((err) => {
             console.log(">> Error while creating tutorial: ", err);
         });

 };

 const createComment = (_tutorialId, comment) => {
     return Comment.create({
         name: comment.name,
         text: comment.text,
         tutorialId: _tutorialId
     }).then((data) => {
         console.log('>> Created comment:' + data);
         console.log(">> Created comment: " + JSON.stringify(data, null, 4));

         return data;
     }).catch((err) => {
         console.log(">> Error while creating comment: ", err);
     })
 };

 const findTutorialById = (tutorialId) => {
     return Tutorial.findByPk(tutorialId, {
             include: ['comments']
         })
         .then((data) => {
             return data
         })
         .catch((err) => {
             console.log(" Error while finding comment: ", err);
         })
 };

 const findCommentById = (id) => {
     return Comment.findByPk(id, {
             include: ['tutorial']
         })
         .then((data) => {
             return data
         })
         .catch((err) => {
             console.log(" Error while finding comment: ", err);
         })
 };

 const findAllTutorial = () => {
     return Comment.findAll({
             include: [
                 {
                 model:Tag,
                 as:'tags',
                 attributes:['id','name'],
                 through:{
                     attributes:[],
                 }
               }, 
               {
                   model:Comment
               }
                
                ]
         })
         .then((data) => {
             return data
         }).catch((err)=>{
             console.log('Error while retrieving Tutorials',err)
         });
 };

 //Get the Tutorial for a given tutorial id

exports.findById = (id) => {
  return Tutorial.findByPk(id, {
    include: [
      {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
         through: {
           attributes: ["tag_id", "tutorial_id"],
         },
      },
    ],
  })
    .then((tutorial) => {
      return tutorial;
    })
    .catch((err) => {
      console.log(">> Error while finding Tutorial: ", err);
    });
};

 module.exports = {
     createTutorial,
     createComment,
     findTutorialById,
     findCommentById,
     findAllTutorial,
    
 }
