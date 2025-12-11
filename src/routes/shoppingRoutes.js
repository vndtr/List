const express = require('express');
const router = express.Router();
const controller = require('../controllers/shoppingController');

// GET /api/products - все товары
router.get('/', controller.getAllProducts);

// GET /api/products/search?query=... - поиск товаров
router.get('/search', controller.searchProducts);

// GET /api/products/:id - товар по ID
router.get('/:id', controller.getProductById);

// POST /api/products - добавить товар
router.post('/', controller.addProduct);

// PUT /api/products/:id - обновить товар
router.put('/:id', controller.updateProduct);

// DELETE /api/products/:id - удалить товар
router.delete('/:id', controller.deleteProduct);

module.exports = router;