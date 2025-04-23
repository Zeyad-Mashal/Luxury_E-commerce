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

    // Current product data - يجب تحديث هذه البيانات حسب المنتج الفعلي
    const currentProduct = {
        id: 'prod1', // يجب أن يكون هذا ID فريد لكل منتج
        name: 'Eternity Diamond Necklace',
        price: 48000,
        image: './assets/neckless.jpg'
    };

    // Cart functionality 
    const addToCartBtn = document.getElementById('addToCartBtn');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const cartCounter = document.getElementById('cartCounter');

    // Function to update cart counter
    function updateCartCounter() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCounter.textContent = totalItems;
        cartCounter.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    // Add to cart function
    addToCartBtn.addEventListener('click', function () {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === currentProduct.id);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                ...currentProduct,
                quantity: 1,
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // Show toast notification
        toastMessage.textContent = `${currentProduct.name} added to cart!`;
        toast.classList.add('show');

        // Update cart counter
        updateCartCounter();

        // Add button animation
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300);
    });

    // Initialize cart counter
    updateCartCounter();

    // Favorites functionality
    const addToFavoritesBtn = document.getElementById('addToFavoritesBtn');
    let isFavorite = false;

    // Check favorite status
    function checkFavoriteStatus() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        isFavorite = favorites.some(item => item.id === currentProduct.id);
        updateFavoriteButton();
    }

    // Update favorite button appearance
    function updateFavoriteButton() {
        if (isFavorite) {
            addToFavoritesBtn.innerHTML = '<i class="fas fa-heart"></i> Remove Favorite';
            addToFavoritesBtn.style.color = '#d33';
            addToFavoritesBtn.classList.add('active');
        } else {
            addToFavoritesBtn.innerHTML = '<i class="far fa-heart"></i> Add Favorite';
            addToFavoritesBtn.style.color = '#555';
            addToFavoritesBtn.classList.remove('active');
        }
    }

    // Toggle favorite
    addToFavoritesBtn.addEventListener('click', function () {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (isFavorite) {
            favorites = favorites.filter(item => item.id !== currentProduct.id);
            toastMessage.textContent = 'Removed from favorites!';
        } else {
            favorites.push(currentProduct);
            toastMessage.textContent = 'Added to favorites!';
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        isFavorite = !isFavorite;
        updateFavoriteButton();

        // Show toast
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);

        // Button animation
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300);
    });

    // Check favorite status on load
    checkFavoriteStatus();

    // Apply animations on page load
    const animatedElements = document.querySelectorAll('.animate-fade-in');
    animatedElements.forEach(el => {
        el.style.opacity = '1';
    });
});