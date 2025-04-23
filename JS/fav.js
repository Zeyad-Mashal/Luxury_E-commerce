document.addEventListener("DOMContentLoaded", function () {
    const favoritesList = document.getElementById("favoritesList");
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
    displayFavorites(favorites);
  
    favoritesList.addEventListener("click", function (e) {
      if (e.target.classList.contains("remove-favorite")) {
        const productId = e.target.closest(".fav_item").getAttribute("data-id");
        removeFromFavorites(productId);
      }
  
      if (e.target.classList.contains("add-to-cart")) {
        const productId = e.target.closest(".fav_item").getAttribute("data-id");
        addToCartFromFavorites(productId);
      }
    });
  });
  
  function displayFavorites(favorites) {
    const favoritesList = document.getElementById("favoritesList");
  
    if (favorites.length === 0) {
      favoritesList.innerHTML = `
              <div class="empty-favorites">
                  <i class="fas fa-heart-broken"></i>
                  <h3>Your favorites list is empty</h3>
                  <p>Start adding your favorite products!</p>
              </div>
          `;
      return;
    }
  
    favoritesList.innerHTML = favorites
      .map(
        (product) => `
          <div class="fav_item" data-id="${product.id}">
              <img src="${product.image}" alt="${product.name}" />
              <div class="item_content">
                  <div class="fav_content">
                      <h3>${product.name}</h3>
                      <span>${product.price.toLocaleString()} EGP</span>
                  </div>
                  <div class="fav_icon">
                      <i class="fa-solid fa-trash remove-favorite" title="Remove from favorites"></i>
                      <i class="fa-solid fa-basket-shopping add-to-cart" title="Add to cart"></i>
                  </div>
              </div>
          </div>
      `
      )
      .join("");
  }
  
  function removeFromFavorites(productId) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter((product) => product.id !== productId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  
    displayFavorites(favorites);
  
    showToast("Product removed from favorites");
  }
  
  function addToCartFromFavorites(productId) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const product = favorites.find((item) => item.id === productId);
  
    if (!product) return;
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === productId);
  
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    showToast(`${product.name} added to cart`);
  }
  
  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast show";
    toast.innerHTML = `
          <i class="fas fa-check-circle"></i>
          <span>${message}</span>
      `;
    document.body.appendChild(toast);
  
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
  