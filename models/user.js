module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  users.sync();
  return users;
};