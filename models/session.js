module.exports = (sequelize, DataTypes) => {
  const session = sequelize.define('sessions', {
    sid: DataTypes.STRING,
    expires: DataTypes.DATE,
    data: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        // associate can be defind here
      }
    },
    freezeTableName: true
  });
  session.sync();
  return session;
};