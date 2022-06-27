const express = require('express');
const router = express.Router();

const Contenedor = require('../contenedor')

const contenedorProducts = new Contenedor('producs.json')


function auth (req,res,next){
  if('admin' in req.headers) next()
  else{
    res.status(403).send({error: 'You need admin profile to execute'})
  }
}

router.get('/', function(req, res, next) {
  res.json(contenedorProducts.getAll());
});

router.get('/:id', function(req, res, next) {
  const { id } = req.params
  let product = contenedorProducts.getByID(id)

  if(!product){
    return res.status(400).send({error: `El producto con id ${id} no existe`})
  }

  res.json(product);
});

router.post('/', auth, function(req, res, next) {
  const product =req.body
  contenedorProducts.save(product)
  res.json(product)
});

router.put('/', auth, function(req, res, next) {
  const product =req.body
  
  if(contenedorProducts.edit(product)){
    return res.status(400).send({error: `El producto con id ${id} no existe`})
  }
  
  res.json(product)
});

router.delete('/:id', auth, function(req, res, next) {
  const { id } = req.params
  contenedorProducts.deleteByID(id)
  res.json( {msg: `Se elimino el ${id} de la lista de productos`})
});

module.exports = router;
