const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: {
      model: Product,
      as: 'products',
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(dbTagData => {
      res.status(200).json(dbTagData);
    }).catch(err => {
      console.log(err);
      res.status(500).json({ err: err })
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne(
  
    {
      where: {
        id: req.params.id
      },
      attributes: ['id', 'tag_name'],
      include: {
        model: Product,
        as: 'products',
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    }
   
  
  )
    .then(dbTagData => {
      res.status(200).json(dbTagData);
    }).catch(err => {
      console.log(err);
      res.status(500).json({ err: err })
    });
});
//----------------------------------------------------------------
router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(dbNewTag => {
    res.status(200).json(dbNewTag);
  }).catch(err => {
    console.log(err);
    console.log(dbNewTag);
    res.status(500).json({ err: err })
  });
});
//--------------------------------------------------------------------------
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbUpdatedTag => {
      res.json(dbUpdatedTag);
    }).catch(err => {
      console.log('Tag ID not found');
      res.status(404), json({ error: 'id not found' })
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbDeletedTag => {
      res.status(200).json(dbDeletedTag);
    }).catch(err => {
      console.log('Tag ID not found');
      res.status(404), json({ error: 'id not found' })
    });
});

module.exports = router;
