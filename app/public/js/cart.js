document.querySelectorAll('.remove-button').forEach(button => {
    button.addEventListener('click', async () => {
        const productId = button.dataset.productId;

        try {
            const res = await fetch(`/api/cart/items/${productId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.status === 401) {
                window.location.href = '/login';
                return;
            }

            const data = await res.json();

            if (data.success) {
                location.reload();
            } else {
                alert('Could not remove item');
            }
        } catch (err) {
            console.error('Error removing from cart:', err);
            alert('Error removing item');
        }
    });
});

const clearBtn = document.getElementById('clearCartBtn');
if (clearBtn) {
    clearBtn.addEventListener('click', async () => {
        try {
            const res = await fetch('/api/cart/clear', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.status === 401) {
                window.location.href = '/login';
                return;
            }

            const data = await res.json();

            if (data.success) {
                location.reload();
            } else {
                alert('Could not clear cart');
            }
        } catch (err) {
            console.error('Error clearing cart:', err);
            alert('Error clearing cart');
        }
    });
}
