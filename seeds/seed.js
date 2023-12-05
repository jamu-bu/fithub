const sequelize = require('../config/connection');
const { Category, Outfit, OutfitProducts, Product, User } = require('../models');

const categoryData = require('./categoryData.json');
const productData = require('./productData.json');
const outfitProductData = require('./outfitProductData.json');
const outfitData = require('./outfitData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force:true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const category = await Category.bulkCreate(categoryData);
    const product = await Product.bulkCreate(productData);
    const outfit = await Outfit.bulkCreate(outfitData);
    const outfitProducts = await OutfitProducts.bulkCreate(outfitProductData);

    process.exit(0)

    
};

seedDatabase();