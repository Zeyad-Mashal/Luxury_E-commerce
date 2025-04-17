document.addEventListener('DOMContentLoaded', function () {
    // Image gallery functionality
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Update main image
            const imgSrc = this.getAttribute('data-img');
            mainImage.src = imgSrc;

            // Add a small animation to the main image
            mainImage.style.opacity = '0.7';
            mainImage.style.transform = 'scale(0.95)';

            setTimeout(() => {
                mainImage.style.opacity = '1';
                mainImage.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Chain length options
    const lengthOptions = document.querySelectorAll('.variant-options .option');

    lengthOptions.forEach(option => {
        option.addEventListener('click', function () {
            lengthOptions.forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Cart and favorites functionality
    const addToCartBtn = document.getElementById('addToCartBtn');
    const addToFavoritesBtn = document.getElementById('addToFavoritesBtn');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const cartCounter = document.getElementById('cartCounter');

    let cartCount = 0;
    let isFavorite = false;

    addToCartBtn.addEventListener('click', function () {
        cartCount++;
        cartCounter.textContent = cartCount;
        cartCounter.classList.add('show');

        // Show toast notification
        toastMessage.textContent = 'Item added to your cart!';
        toast.classList.add('show');

        // Add a small animation to the button
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-3px)';
        }, 100);

        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    });

    addToFavoritesBtn.addEventListener('click', function () {
        isFavorite = !isFavorite;

        if (isFavorite) {
            this.innerHTML = '<i class="fas fa-heart"></i>';
            toastMessage.textContent = 'Added to your favorites!';
        } else {
            this.innerHTML = '<i class="far fa-heart"></i>';
            toastMessage.textContent = 'Removed from your favorites!';
        }

        toast.classList.add('show');

        // Add a small animation to the button
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-3px)';
        }, 100);

        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    });

    // Navigation links functionality
    const favoritesLink = document.getElementById('favoritesLink');
    const cartLink = document.getElementById('cartLink');


    // Apply animations on page load
    const animatedElements = document.querySelectorAll('.animate-fade-in');
    animatedElements.forEach(el => {
        el.style.opacity = '1';
    });
});




// When adding to the cart:
const addToCartButton = document.querySelector('.add-to-cart');

addToCartButton.addEventListener('click', () => {
    const product = {
        id: '1', // Unique ID for the product
        name: 'Product 1',
        price: 48000, // Price in EGP
        quantity: 1, // Initial quantity
        image: './assets/neckless.jpg', // Product image URL
    };

    // Get the cart from localStorage, or initialize it as an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product already exists in the cart
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        // If product exists, just increase quantity
        existingProduct.quantity++;
    } else {
        // Otherwise, add the product to the cart
        cart.push(product);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Optionally, you could also call displayCartItems() here if you want to update immediately
});

