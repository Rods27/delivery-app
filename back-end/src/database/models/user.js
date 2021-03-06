const user = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING(100),
    email: DataTypes.STRING(50),
    password: DataTypes.STRING(100),
    role: DataTypes.STRING(30),
  },{
    timestamps: false
  }
);

user.associate = (models) => {
  user.hasMany(models.sale, { 
    foreignKey: "seller_id" ,
    as: 'sellerId',
  }
  );
  user.hasMany(models.sale, {
    foreignKey: "user_id",
    as: 'userId',
  });
};

return user;
}

module.exports = user;
