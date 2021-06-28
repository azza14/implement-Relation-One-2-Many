
 const db = require('../models/');
 const Tutorial=db.tutorials;
 const Tag= db.tags;
 
const createTage=(tag)=>{
    return Tag.create({
       name:tag.name
    }).then((data)=>{

        console.log(' created tag' + JSON.stringify(tag,null,2));
        return tag;
    }).catch((err)=>{
        console.log(err)
    })
};

const findTagById=(id) =>{
    return Tag.findByPk(id,{
       include:[
           {
               model:Tutorial,
               as:'tutorials',
               attributes:['id','title','description'],
               through:
               {
                    attributes:[],
               }
           },
       ],
    }).then((tag)=>{
        return tag;
    }).catch((err)=>{
        console.log('Error while finding Tag: ',err);
    });
};

const findAllTags = () => {
    return Tag.findAll({
            include: [{
                model: Tutorial,
                as: 'tutorials',
                attributes: ['id', 'title', 'description'],
                through: {
                    attributes: []
                }
            }, ],
        })
        .then((data) => {
            return data
        })
        .catch((err) => {
            console.log(">> Error while retrieving Tags: ", err);

        });
};
//Add a Tutorial to a Tag

const addTutorial= (tagId, tutorialId) => 
{
  return Tag.findByPk(tagId)
    .then((tag) => 
    {
        console.log(' tag ', JSON.stringify(tag, null, 4))

      if (!tag) {

        console.log(' tag ', JSON.stringify(tag, null, 4))
        console.log("Tag not found!");
        return null;
          }
      return Tutorial.findByPk(tutorialId).then((tutorial) => 
      {
        console.log(' tag ', JSON.stringify(tutorial, null, 4))

        if (!tutorial) {
          console.log("Tutorial not found!");
          return null;
        }

        tag.addTutorial(tutorial);
        console.log(`>> added Tutorial id=${tutorial.id} to Tag id=${tag.id}`);
        return tag;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Tutorial to Tag: ", err);
    });
};

module.exports={
    createTage,
    findTagById,
    findAllTags,
    addTutorial
}