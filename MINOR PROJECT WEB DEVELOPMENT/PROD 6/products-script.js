document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.add-to-cart');
  const cartMessage = document.getElementById('cart-message');

  buttons.forEach(button => {
    if (!button.disabled) {
      button.addEventListener('click', () => {
        const row = button.closest('tr');
        const productName = row.querySelector('td:first-child').textContent;
        cartMessage.textContent = `Added "${productName}" to your cart.`;
        
        // Optionally clear message after 3 seconds
        setTimeout(() => {
          cartMessage.textContent = '';
        }, 3000);
      });
    }
  });
});
