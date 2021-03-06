const sale = (sequelize, DataTypes) => {
  const sale = sequelize.define("sale", {
    total_price: DataTypes.DECIMAL(9, 2),
    delivery_address: DataTypes.STRING(100),
    delivery_number: DataTypes.STRING(100),
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING(100),
  }, { timestamps : false });

  sale.associate = (models) => {
    sale.belongsTo(models.user, { 
      as: "sellerId" ,
      foreignKey: 'seller_id',
      }
      );
   sale.belongsTo(models.user, {
      as: "userId",
      foreignKey: 'user_id',
    });
  };
  return sale;
};

module.exports = sale;
