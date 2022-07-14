const express = require('express');
const router = express.Router();

const FactoryDAO = require('../dao/FactoryDAO')

const DAO = FactoryDAO()


function auth (req,res,next){
  if('admin' in req.headers) next()
  else{
    res.status(403).send({error: 'You need admin profile to execute'})
  }
}

router.get('/', function(req, res, next) {
  res.json(DAO.cart.getAll());
});

router.get('/:id/products', function(req, res, next) {
  const id = req.params.id
  const cart = DAO.cart.getByID(id)

  if(!cart){
    return res.status(400).send({error: `El carrito con id ${id} no existe`})
  }

  res.json(cart.products)
});

router.post('/', auth, function(req, res, next) {
  let cart = {...req.body,...{products:[]}};
  res.json(DAO.cart.save(cart));
});

router.post('/:id/products', auth, function(req, res, next) {
  const product = req.body
  const cartId = req.params.id
  const cart = DAO.cart.getByID(cartId)
  cart.products.push(product)
  
  res.json(DAO.cart.edit(cart))
});

router.put('/', auth, function(req, res, next) {
  const { id, title, price, thumbnail} =req.body
  let product = {"id":id,"title":title, "price": price, "thumbnail":thumbnail}
  
  if(DAO.cart.edit(product)){
    return res.status(400).send({error: `El producto con id ${id} no existe`})
  }
  
  res.json(product)
});

router.delete('/:id', auth, function(req, res, next) {
  const { id } = req.params
  DAO.cart.deleteByID(id)
  res.json( {msg: `Se elimino el carrito con ${id} de la lista de carritos`})
});

router.delete('/:id/products/:id_prod', auth, function(req, res, next) {
  const { id,id_prod } = req.params
  const cart = DAO.cart.getByID(id)
  const idx = cart.products.findIndex(product => product.id == id_prod)
  cart.products.splice(idx, 1)
  DAO.cart.edit(cart)
  res.json( {msg: `Se elimino el producto con id: ${id_prod} del carrito ${id}`})
});

module.exports = router;
