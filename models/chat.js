module.exports = (sequelize, DataTypes) => {
  const chat = sequelize.define('chat', {
    post: DataTypes.TEXT
  }, {
    freezeTableName: true
  });
  chat.sync();
  return chat;
};