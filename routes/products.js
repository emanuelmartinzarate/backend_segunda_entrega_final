const express = require('express');
const router = express.Router();

const FactoryDAO = require('../dao/FactoryDAO')

const DAO = FactoryDAO();

function auth (req,res,next){
  if('admin' in req.headers) next()
  else{
    res.status(403).send({error: 'You need admin profile to execute'})
  }
}

router.get('/', function(req, res, next) {
  res.json(DAO.product.getAll());
});

router.get('/:id', function(req, res, next) {
  const { id } = req.params;
  let product = DAO.product.getByID(id)

  if(!product){
    return res.status(400).send({error: `El producto con id ${id} no existe`})
  }

  res.json(product);
});

router.post('/', auth, function(req, res, next) {
  res.json(DAO.product.save(req.body))
});

router.put('/', auth, function(req, res, next) {
  
  if(DAO.product.edit(req.body)){
    return res.status(400).send({error: `El producto con id ${id} no existe`})
  }
  
  res.json(req.body)
});

router.delete('/:id', auth, function(req, res, next) {
  const { id } = req.params
  DAO.product.deleteByID(id)
  res.json( {msg: `Se elimino el ${id} de la lista de productos`})
});

module.exports = router;
