module.exports = (sequelize, DataTypes) => {
  const session = sequelize.define('session', {
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