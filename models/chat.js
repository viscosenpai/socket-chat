module.exports = (sequelize, DataTypes) => {
  const chat = sequelize.define('chat', {
    post: DataTypes.TEXT,
    username: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  chat.sync();
  return chat;
};