const express = require('express');
const router = express.Router();
const models = require('../../models')
const bcrypt = require('bcrypt')
const upload = require("../../services/imageUpload");
const singleUpload = upload.single("image");


// /api/v1/users/register
router.post('/register', function(req, res, next) {
  if (!req.body.username || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password || !req.body.phoneNumber) {
    res.status(400).json({
      object: req.body,
      error: 'please include all required fields'
    })
    return
  }

  models.User.findAll({
    where: {
      email: req.body.email
    }
  }).then(users => {
    if (users.length) {
      res.status(400).json({
        error: 'That user already exists'
      })
    } else {
      bcrypt.hash(req.body.password, 10).then(hash => {
        models.User.create({
          username:req.body.username,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
          phoneNumber: req.body.phoneNumber,
          spoonacularUsername: req.body.spoonacularUsername,
          spoonacularHash: req.body.spoonacularHash
        }).then(user => {
          res.status(201).json(user)
        })
      })
    }
  })
});


// to login /api/v1/users/login
router.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      error: 'please include all required fields'
    })
    return
  }
  models.User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (!user) {
      res.status(404).json({
        error: 'invalid username'
      })
      return
    }

    bcrypt.compare(req.body.password, user.password)
      .then(match => {
        if (!match) {
          res.status(401).json({
            error: 'incorrect password'
          })
          return
        }
        req.session.user = user
        res.json(user)
      })
  })
})

//to logout
router.get('/logout', (req, res) => {
  req.session.user = null;
  res.json({
    success: 'user logged out'
  })
})


//user profile
router.get('/:userId/profile', (req, res) => {
  models.User.findByPk(req.params.userId, {
    attribute: ['title'],
    include: {
      model: models.Favorite,
      include: models.Mealplan

    }
  })

  .then(user => {
    if (!user) {
      res.status(404).json({
        error: 'Could not find user with that id'
      })
      return
    }
    res.json({
      userId: user.id,
      username:user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePicture: user.profilePicture,
      phoneNumber: user.phoneNumber,
      spoonacularUsername: req.body.spoonacularUsername,
      spoonacularHash: req.body.spoonacularHash
    })
  })
})

//update profile
router.patch("/:userId/update-profile", function(req, res) {
  const uid = req.params.id;

  models.User.findAll({
    where: {
      email: req.body.username
    }
  }).then(users => {
    if (users.length) {
      res.status(400).json({
        error: 'That username already exists'
      })
    } else {
      bcrypt.hash(req.body.password, 10).then(hash => {
        let updateProfile = {
          username: req.body.username,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
          phoneNumber: req.body.phoneNumber,
          spoonacularUsername: req.body.spoonacularUsername,
          spoonacularHash: req.body.spoonacularHash
        };
        models.User.update(updateProfile, { where: { id: uid } })
          .then(user => {
            res.status(201).json(user)
          })
      })
    }
  })
});
 //add profile pic
router.post("/:userId/add-profile-picture", function(req, res) {
  const uid = req.params.id;

  singleUpload(req, res, function(err) {
    if (err) {
      return res.json({
        success: false,
        errors: {
          title: "Image Upload Error",
          detail: err.message,
          error: err,
        },
      });
    }
    let update = { profilePicture: req.file.location };
    models.User.update(update, { where: { id: uid } })
      .then((user) => res.status(200).json({ success: true, user: user }))
      .catch((err) => res.status(400).json({ success: false, error: err }));

  });
});


module.exports = router;
