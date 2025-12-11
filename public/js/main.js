// Базовый URL API
const API_URL = '/api/products';

// Загрузить все товары
async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
    }
}

// Отобразить товары
function displayProducts(products) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = `product-item ${product.purchased ? 'purchased' : ''}`;
        productElement.innerHTML = `
            <div class="product-info">
                <span class="product-name">${product.name}</span>
                <span class="product-quantity">(${product.quantity} шт.)</span>
            </div>
            <div class="product-actions">
                <button class="toggle-btn" onclick="togglePurchased(${product.id})">
                    ${product.purchased ? 'Вернуть' : 'Купить'}
                </button>
                <button class="edit-btn" onclick="editProduct(${product.id})">Изменить</button>
                <button class="delete-btn" onclick="deleteProduct(${product.id})">Удалить</button>
            </div>
        `;
        container.appendChild(productElement);
    });
}

// Добавить товар
document.getElementById('addForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('productName').value;
    const quantity = document.getElementById('productQuantity').value;
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, quantity })
        });
        
        if (response.ok) {
            document.getElementById('addForm').reset();
            loadProducts();
        }
    } catch (error) {
        console.error('Ошибка при добавлении товара:', error);
    }
});

// Поиск товаров
document.getElementById('searchInput').addEventListener('input', async (e) => {
    const query = e.target.value;
    
    try {
        const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Ошибка при поиске:', error);
    }
});

// Переключить статус "куплено"
async function togglePurchased(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const product = await response.json();
        
        const updatedProduct = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ purchased: !product.purchased })
        });
        
        loadProducts();
    } catch (error) {
        console.error('Ошибка при обновлении:', error);
    }
}

// Удалить товар
async function deleteProduct(id) {
    if (!confirm('Удалить этот товар?')) return;
    
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        loadProducts();
    } catch (error) {
        console.error('Ошибка при удалении:', error);
    }
}

// Изменить товар (упрощенная версия)
function editProduct(id) {
    const newName = prompt('Введите новое название товара:');
    const newQuantity = prompt('Введите новое количество:');
    
    if (newName) {
        fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name: newName, 
                quantity: newQuantity 
            })
        })
        .then(() => loadProducts());
    }
}


document.addEventListener('DOMContentLoaded', loadProducts);