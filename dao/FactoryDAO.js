const CartMemoryDAO = require('./cart/CartMemoryDAO')
const ProductMemoryDAO = require('./product/productMemoryDAO')
const CartFileDAO = require('./cart/cartFileDAO')
const ProductFileDAO = require('./product/productFileDAO')
const CartMongoDAO = require('./cart/cartMongoDAO')
const ProductMongoDAO = require('./product/productMongoDAO')

const FactoryDAO = () => {

    const typeDB = process.env.typeDB || 'memory'

    if(typeDB == 'memory') {
        console.log('Generate DAO with memory');
        return {
            cart: new CartMemoryDAO(),
            product: new ProductMemoryDAO()
        }
    } else if(typeDB == 'file') {
        console.log('Generate DAO with file');
        return {
            cart: new CartFileDAO(),
            product: new ProductFileDAO()
        }
    } else if(typeDB == 'mongo') {
        console.log('Generate DAO with mongo');
        return {
            cart: new CartMongoDAO(),
            product: new ProductMongoDAO()
        }
    }

    throw new Error('typeDB is not found')
}

module.exports = FactoryDAO