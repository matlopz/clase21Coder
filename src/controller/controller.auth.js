const express = require('express');
const passport = require('passport')
const usuarioService = require('../services/usuarioService');
const router = express.Router();
const { getHashedPassword, comparePassword } = require('../utils/bcrypts');
const Usuarios = require('../models/Users.Model');
const cartsModels = require('../models/carts.Models');


router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }),
  async (req, res) => {

    try {
      res.status(201).json({ status: 'success', payload: req.user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
  });

router.get('/failregister', (req, res) => {
  res.json({ status: 'Error', error: 'fallo el register' });
})


router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/failLogin' }), async (req, res) => {
  try {
    //const cartId = user.cart[0].product.toString();

    req.session.user = {
      name: req.user.name,
      id: req.user.id

    }


    console.log('Inicio de sesión exitoso', req.session.user);
    res.json({ status: 'success', payload: 'New session initialized' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: 'Internal Server Error' });
  }
});
router.get('/failLogin', (req, res) => {
  res.json({ status: 'Error', error: 'fallo al loguearse' });
})

router.get('/github', passport.authenticate('github', { scope: ['user: email'] }), (req, res,) => {

})

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  try {
    //const cartId = user.cart[0].product.toString();

    req.session.user = {
      name: req.user.name,
      id: req.user.id

    }


    console.log('Inicio de sesión exitoso', req.session.user);
    res.redirect('/views/productos')
    //res.json({ status: 'success', payload: 'New session initialized' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: 'Internal Server Error' });
  }
})


module.exports = router