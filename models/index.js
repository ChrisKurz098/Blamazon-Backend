// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');



// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'catagory_id'
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'catagory_name'
})

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  as: 'tag_link',
  foreignKey: 'product_id'
})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product,{
  through: ProductTag,
  as: 'tag_link',
  foreignKey: 'tag_id'
})
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
