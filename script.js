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


// 2. FORM - DOM & EVENT HANDLING
const registrationForm = document.getElementById('registrationForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const formFeedback = document.getElementById('formFeedback');

registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameVal = fullNameInput.value.trim();
    const emailVal = emailInput.value.trim();

    // Validasi Nama
    if (nameVal.length < 3) {
        nameError.classList.remove('hidden');
        isValid = false;
    } else {
        nameError.classList.add('hidden');
    }

    // Validasi Email Sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
        emailError.classList.remove('hidden');
        isValid = false;
    } else {
        emailError.classList.add('hidden');
    }

    // Hasil Feedback
    if (isValid) {
        formFeedback.textContent = `[SUCCESS] "${nameVal}" berhasil diverifikasi dan terdaftar ke sistem.`;
        formFeedback.classList.remove('hidden');
        registrationForm.reset();
    } else {
        formFeedback.classList.add('hidden');
    }
});