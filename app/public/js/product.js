document.querySelectorAll('.cart-button').forEach(button => {
    button.addEventListener('click', async () => {
        const productId = button.dataset.productId;

        try {
            const res = await fetch('/api/cart/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId })
            });

            if (res.status === 401) {
                window.location.href = '/login';
                return;
            }

            const data = await res.json();

            if (data.success) {
                button.textContent = 'Added ✓';
                button.disabled = true;
            } else {
                button.textContent = 'Could not add';
            }
        } catch (err) {
            console.error('Error adding to cart:', err);
            button.textContent = 'Error';
        }
    });
});