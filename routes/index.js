const express = require('express');
const router = express.Router();
const {body, validationResult} = require("express-validator")
require('dotenv').config

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Members Only', user: req.user });
});

router.get("/sign-up", (req,res) => res.render("sign-up-form"))
router.post("/sign-up",
 body('password').isLength({ min: 6, max: 20 }).withMessage('Password should be 6-20 characters'),
 body('username').isLength({ min: 6, max: 20}).withMessage('Username should be 6-20 characters'),
 body('confirmPassword').custom((value, { req }) => {
  return value === req.body.password
 }),
 async (req, res, next) => {
  const result = validationResult(req)
  if (result.isEmpty()){
    bcrypt.hash(req.body.password, 10, async(err, hashedPassword) => {
      if (err) {
        return next(err)
      }
      else {
        const user = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          password: hashedPassword,
          membership_status: "noob"
        })
        await user.save()
        res.redirect("/")
      }
    })
  }
  res.send({ errors: result.array()})
  
})

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
)

router.get("/log-out", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/join-club", (req,res) => {
  res.render('join-club')
})

router.post("/join-club",
  body('passcode').custom((value, {req }) => {
    return value === process.env.SECRET_PASSCODE
  }),
 async (req,res) => {
  const result = validationResult(req)
  if(result.isEmpty()){
    const currentUser = await User.findOne({ username: req.user.username})
    currentUser.membership_status = "l33t"
    await currentUser.save()
  }
})

module.exports = router;

