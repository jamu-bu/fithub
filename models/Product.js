const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model { }

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        brand_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        retail_price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        season: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'category',
                key: 'id',
            },
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'product',
    }
);

module.exports = Product;
