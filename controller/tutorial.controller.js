 const db= require('../models/');
 
 const Tutorial= db.tutorials;
 const Comment= db.comments;

 const createTutorial= (tutorial)=>{

    return Tutorial.create({

        title:tutorial.title,
        description:tutorial.description 
    }).then((tutorial)=>{
        console.log('>> Created tutorial:' + tutorial);
        return  tutorial;
    })
    .catch((err )=>{
        es.status(500).send({
            message: 'error  occured',
            err: err.message})
            console.log(">> Error while creating tutorial: ", err);
        });

    };

const createComment = (tutorialId,comment)=>{
        return Comment.create({
            name:comment.name,
            text:comment.text,
            tutorialId: comment.tutorialId
        }).then((data)=>{
            console.log('>> Created comment:' + data);
          //  console.log(">> Created comment: " + JSON.stringify(data, null, 4));

         return data;
        }).catch((err)=>{
            console.log(">> Error while creating comment: ", err);
        })
    };

const findTutorialById= (tutorialId)=>{
    return  Tutorial.findByPk(tutorialId,{include:['comments']})
             .then((data)=>{
                 return data
             })
             .catch((err)=>{
                console.log(" Error while finding comment: ", err);
             })
};

const findCommentById= (id)=>{
    return  Comment.findByPk(id,{include:['tutorial']})
             .then((data)=>{
                 return data
             })
             .catch((err)=>{
                console.log(" Error while finding comment: ", err);
             })
};

const findAllTutorial= ()=>{
    return  Comment.findAll({include:['comments']})
             .then((data)=>{
                 return data
             });        
};

    module.exports={
        createTutorial,
        createComment,
        findTutorialById,
        findCommentById,
        findAllTutorial
    }











