const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {

  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(dbCategoryData => {
      res.status(200).json(dbCategoryData);
    }).catch(err => {
      console.log(err);
      res.status(500).json({ err: err })
    });

});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'category_name'],
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    },

  }
  ).then(dbCategoryData => {
    res.status(200).json(dbCategoryData);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ err: err })
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  }).then(dbNewcategory => {
    res.status(200).json(dbNewcategory);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ err: err })
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbUpdatedCategory => {
      res.json(dbUpdatedCategory);
    }).catch(err => {
      console.log('Category ID not found');
      res.status(404), json({ error: 'id not found' })
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbDeletedCategory => {
      res.status(200).json(dbDeletedCategory);
    }).catch(err => {
      console.log('Category ID not found');
      res.status(404), json({ error: 'id not found' })
    });
});

module.exports = router;
