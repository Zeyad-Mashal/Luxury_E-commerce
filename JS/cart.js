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
