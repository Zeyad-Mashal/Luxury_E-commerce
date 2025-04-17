document.addEventListener("DOMContentLoaded", () => {
    const cartBody = document.getElementById("cart-body");

    cartBody.querySelectorAll("tr").forEach((row) => {
        const price = parseInt(row.querySelector(".price").dataset.price);
        const quantitySpan = row.querySelector(".quantity");
        const totalCell = row.querySelector(".total");

        let quantity = 1;

        row.querySelector(".decrease").addEventListener("click", () => {
            quantity = Math.max(1, quantity - 1);
            quantitySpan.textContent = quantity;
            totalCell.textContent = (price * quantity).toLocaleString() + " EGP";
        });

        row.querySelector(".increase").addEventListener("click", () => {
            quantity += 1;
            quantitySpan.textContent = quantity;
            totalCell.textContent = (price * quantity).toLocaleString() + " EGP";
        });

        row.querySelector(".remove-btn").addEventListener("click", () => {
            row.remove();
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const cartBody = document.getElementById('cart-body');

    // Retrieve the cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cart'));

    // Check if cartItems exists and is an array
    if (Array.isArray(cartItems) && cartItems.length > 0) {
        cartItems.forEach((item, index) => {
            // Create a new row for each cart item
            const row = document.createElement('tr');
            row.dataset.index = index; // Add a data-index for easier identification

            row.innerHTML = `
          <td class="product-info">
            <img src="${item.image}" class="product-img" alt="Product" />
            <span>${item.name}</span>
          </td>
          <td class="price" data-price="${item.price}">${item.price} EGP</td>
          <td>
            <div class="counter">
              <button class="decrease">−</button>
              <span class="quantity">${item.quantity}</span>
              <button class="increase">+</button>
            </div>
          </td>
          <td class="total">${item.price * item.quantity} EGP</td>
          <td>
            <button class="remove-btn">Remove</button>
          </td>
        `;

            // Append the new row to the cart body
            cartBody.appendChild(row);

            // Add event listeners for increase and decrease buttons
            const increaseBtn = row.querySelector('.increase');
            const decreaseBtn = row.querySelector('.decrease');
            const quantitySpan = row.querySelector('.quantity');
            const totalCell = row.querySelector('.total');
            const removeBtn = row.querySelector('.remove-btn');

            increaseBtn.addEventListener('click', () => {
                updateQuantity(index, 1);
            });

            decreaseBtn.addEventListener('click', () => {
                updateQuantity(index, -1);
            });

            removeBtn.addEventListener('click', () => {
                removeItem(index);
            });

            // Function to update quantity
            function updateQuantity(index, change) {
                if (cartItems[index].quantity + change >= 1) { // Prevent going below 1
                    cartItems[index].quantity += change;
                    quantitySpan.textContent = cartItems[index].quantity;
                    totalCell.textContent = (cartItems[index].price * cartItems[index].quantity) + ' EGP';
                    localStorage.setItem('cart', JSON.stringify(cartItems)); // Update localStorage
                }
            }

            // Function to remove item from cart
            function removeItem(index) {
                cartItems.splice(index, 1); // Remove the item from the cart array
                localStorage.setItem('cart', JSON.stringify(cartItems)); // Update localStorage

                // Remove the row from the DOM
                row.remove();

                // If the cart is empty, display a message
                if (cartItems.length === 0) {
                    cartBody.innerHTML = '<tr><td colspan="5">Your cart is empty</td></tr>';
                }
            }
        });
    } else {
        cartBody.innerHTML = '<tr><td colspan="5">Your cart is empty</td></tr>';
    }
});
