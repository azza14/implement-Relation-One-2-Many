module.exports = (sequelize, Sequelize) => {

    const Tag = sequelize.define('Tags', {
        name: {
            type: Sequelize.STRING
        },
       
    }, {
        freezeTableName: true

    })
    return Tag;
}
