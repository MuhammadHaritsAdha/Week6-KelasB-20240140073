// 1. FETCH API - PRODUK DUMMYJSON
const loadProductsBtn = document.getElementById('loadProductsBtn');
const productContainer = document.getElementById('productContainer');
const loadingMessage = document.getElementById('loadingMessage');
const errorMessage = document.getElementById('errorMessage');

loadProductsBtn.addEventListener('click', async () => {
    productContainer.innerHTML = '';
    errorMessage.classList.add('hidden');
    loadingMessage.classList.remove('hidden');

    try {
        const response = await fetch('https://dummyjson.com/products?limit=8');
        
        if (!response.ok) {
            throw new Error(`Gagal terhubung ke server (HTTP Status: ${response.status})`);
        }

        const data = await response.json();
        
        // Looping data produk dan nampilin gambarnya
        data.products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            
            card.innerHTML = `
                <div>
                    <img src="${product.thumbnail}" alt="${product.title}">
                    <h3>${product.title}</h3>
                </div>
                <div class="product-price">$${product.price}</div>
            `;
            
            productContainer.appendChild(card);
        });

    } catch (err) {
        errorMessage.textContent = `Error: ${err.message}`;
        errorMessage.classList.remove('hidden');
    } finally {
        loadingMessage.classList.add('hidden');
    }
});