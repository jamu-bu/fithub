const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class OutfitProducts extends Model {}

OutfitProducts.init(
    {
        outfit_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'outfit',
                key: 'id'
            },
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'product',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'outfitProducts',
    }
);

module.exports = OutfitProducts;
