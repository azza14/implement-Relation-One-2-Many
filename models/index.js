const {
    Sequelize,
    DataTypes
} = require('sequelize');

const config = require('../config/db.config.js');
//const Sequelize= require('sequelize');
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD, {
        host: config.HOST,
        dialect: config.dialect,
        // operatorsAliases:false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require('../models/tutorial.model')(sequelize, Sequelize);
db.comments = require('../models/comment.model')(sequelize, Sequelize);
db.tags= require('../models/tag.model')(sequelize,Sequelize);

// relation between Entities
db.tutorials.hasMany(db.comments, {  foreignKey: 'tutorialId',as: 'comments'});
db.comments.belongsTo(db.tutorials, { foreignKey: 'tutorialId',as: 'tutorial'})

// relation between Entities M==>M

db.tags.belongsToMany(db.tutorials,{
    through:'tutarial_tag',
    as:'tutorials',
    foreignKey:'tag_id',
})

db.tutorials.belongsToMany(db.tags,{
    through:'tutarial_tag',
    as:'tutorials',
    foreignKey:'tutorial_id',
})

module.exports = db;