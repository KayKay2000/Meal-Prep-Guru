const express = require('express');
const checkAuth = require('../../checkAuth');
const router = express.Router();
const db = require('../../models')

// CREATE
router.post('/', checkAuth, async (req, res) => {
  // check body for req'd info
  if (
    !req.body.id
  ) {
    res.status(400).json({ error: 'please include all required fields' })
  }

  // find existing or create new item
  const [favorite, created] = await db.Favorite.findOrCreate({
    where: {
      UserId: req.session.user.id,
      recipeID: req.body.id
    },
    defaults: {
      recipeID: req.body.id,
      UserId: req.session.user.id
    }
  })

  // send response
  res.status(created ? 201 : 200).json(favorite)
})

// DELETE
router.delete('/:recipeID', checkAuth, async (req, res) => {
  // check db for favorite with that id, for current user
  const favorite = await db.Favorite.findOne({
    where: {
      UserId: req.session.user.id,
      recipeID: req.params.id
    },
  })
  // if no favorite, 404
  if (!favorite) {
    res.status(404).json({ error: 'could not find favorite with that id' })
    return
  }
  // delete favorite
  const deleted = await favorite.destroy()

  // send res
  res.status(204).json({ success: 'favorite deleted' })
})


// READ
router.get('/', checkAuth, async (req, res) => {
  // find all favorites for current user
  const favorites = await db.Favorite.findAll({
    where: {
      UserId: req.session.user.id,
    }
  })

  // send 'em back
  res.json(favorites)
})


module.exports = router;