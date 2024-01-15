document.addEventListener("DOMContentLoaded", function() {
    const decrementButtons = document.querySelectorAll('.decrement');
    const incrementButtons = document.querySelectorAll('.increment');
    const quantityElements = document.querySelectorAll('.quantity');
    const cartList = document.querySelector('.cart-list');
    const totalAmountElement = document.getElementById('totalAmount');

    let totalAmount = 0;

    decrementButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            updateQuantity(index, -1);
        });
    });

    incrementButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            updateQuantity(index, 1);
        });
    });
    function updateQuantity(index, change) {
        const currentQuantity = parseInt(quantityElements[index].textContent);
        const newQuantity = Math.max(0, currentQuantity + change);
        quantityElements[index].textContent = newQuantity;
    
        const productPriceElement = document.querySelectorAll('.product-price')[index];
        const productPrice = parseInt(productPriceElement.textContent);
    
        const subtotal = productPrice * newQuantity;
    
        updateTotal();
        updateCart(index, newQuantity, subtotal);
    }
    

    function updateCart(index, quantity, subtotal) {
        const productName = document.querySelectorAll('.product-name')[index].textContent;
    
        // Check if the product is already in the cart
        const existingCartItem = Array.from(cartList.children).find(item => item.textContent.includes(productName));
    
        if (existingCartItem) {
            const existingQuantity = parseInt(existingCartItem.querySelector('.cart-quantity').textContent);
            const existingSubtotal = parseInt(existingCartItem.querySelector('.cart-subtotal').textContent);
            
            if (quantity === 0) {
                // If the new quantity is 0, remove the product from the cart
                cartList.removeChild(existingCartItem);
            } else {
                // Update the quantity and subtotal
                existingCartItem.querySelector('.cart-quantity').textContent = quantity;
                existingCartItem.querySelector('.cart-subtotal').textContent = subtotal ;
            }
        } else {
            if (quantity > 0) {
                // Only add to the cart if the quantity is greater than 0
                const cartItem = document.createElement('li');
                cartItem.innerHTML = `<span class="cart-product">${productName}</span> x <span class="cart-quantity">${quantity}</span>  = $<span class="cart-subtotal">${subtotal}</span>`;
                cartList.appendChild(cartItem);
            }
        }
        
    }
    

    function updateTotal() {
        totalAmount = 0;
        document.querySelectorAll('.quantity').forEach((quantity, index) => {
            const productPrice = parseInt(document.querySelectorAll('.product-price')[index].textContent);
            totalAmount += productPrice * parseInt(quantity.textContent);
        });

        totalAmountElement.textContent = totalAmount;
    }
});
