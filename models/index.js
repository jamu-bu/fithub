const Category = require('./Category');
const Product = require('./Product');
const OutfitProducts = require('./OutfitProducts');
const Outfit = require('./Outfit');
const User = require('./User');

// Each product belongs to a category
Category.hasMany(Product, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE'
});

Product.belongsTo(Category, {
    foreignKey: 'category_id',
});

// Each outfit belongs to a user
User.hasMany(Outfit, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Outfit.belongsTo(User, {
    foreignKey: 'user_id',
});

// Each product can belong to many outfits
Product.belongsToMany(Outfit, {
    through: OutfitProducts,
    foreignKey: 'product_id',
});

// Each outfit contains multiple products
Outfit.belongsToMany(Product, {
    through: OutfitProducts,
    foreignKey: 'outfit_id',
});

module.exports = { Category, Product, OutfitProducts, Outfit, User };
