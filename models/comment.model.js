module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comments", {
    name: {
      type: DataTypes.STRING
    },
    text: {
      type: DataTypes.STRING
    },
  }, {
    freezeTableName: true
  });

  return Comment;
};