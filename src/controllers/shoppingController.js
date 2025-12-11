const products = require('../data/products');

let nextId = 4;

// Получить все товары
exports.getAllProducts = (req, res) => {
    res.json(products);
};

// Получить товар по ID
exports.getProductById = (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Товар не найден' });
    }
};

// Добавить новый товар
exports.addProduct = (req, res) => {
    const { name, quantity = 1 } = req.body;
    
    if (!name) {
        return res.status(400).json({ error: 'Название товара обязательно' });
    }
    
    const newProduct = {
        id: nextId++,
        name,
        quantity: parseInt(quantity) || 1,
        purchased: false
    };
    
    products.push(newProduct);
    res.status(201).json(newProduct);
};

// Обновить товар
exports.updateProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    
    const { name, quantity, purchased } = req.body;
    
    if (name) products[productIndex].name = name;
    if (quantity) products[productIndex].quantity = parseInt(quantity);
    if (typeof purchased === 'boolean') products[productIndex].purchased = purchased;
    
    res.json(products[productIndex]);
};

// Удалить товар
exports.deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Товар не найден' });
    }
    
    products.splice(productIndex, 1);
    res.json({ message: 'Товар удален' });
};

// Поиск товаров (query параметр)
exports.searchProducts = (req, res) => {
    const { query } = req.query;
    
    if (!query) {
        return res.json(products);
    }
    
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );
    
    res.json(filteredProducts);
};