let cart = [];
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartItemsContainer = document.getElementById('cart-items');
        const cartCount = document.getElementById('cart-count');
        const totalPriceEl = document.getElementById('total-price');

        // Toggle Sidebar
        function toggleCart() {
            cartSidebar.classList.toggle('active');
        }

        // Format Rupiah
        function formatRupiah(number) {
            return new Intl.NumberFormat('id-ID').format(number);
        }

        // Tambah ke Keranjang
        function addToCart(name, price) {
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.qty += 1;
            } else {
                cart.push({ name, price, qty: 1 });
            }
            updateCartUI();
            cartSidebar.classList.add('active'); 
        }

        // Hapus dari Keranjang
        function removeFromCart(name) {
            cart = cart.filter(item => item.name !== name);
            updateCartUI();
        }

        // Update Tampilan Keranjang
        function updateCartUI() {
            cartItemsContainer.innerHTML = '';
            let total = 0;
            let count = 0;

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p style="text-align:center; color:#888; margin-top:20px;">Keranjang kosong.</p>';
            }

            cart.forEach(item => {
                const itemTotal = item.price * item.qty;
                total += itemTotal;
                count += item.qty;

                cartItemsContainer.innerHTML += `
                    <div class="cart-item">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <small>Rp ${formatRupiah(item.price)} x ${item.qty}</small>
                        </div>
                        <div class="cart-item-action">
                            <b>Rp ${formatRupiah(itemTotal)}</b>
                            <button class="remove-btn" onclick="removeFromCart('${item.name}')">×</button>
                        </div>
                    </div>
                `;
            });

            cartCount.innerText = count;
            totalPriceEl.innerText = formatRupiah(total);
        }

        // Checkout
        function checkout() {
            if (cart.length === 0) {
                alert('Keranjang Anda kosong! Silakan pilih menu dulu.');
                return;
            }
            
            let orderSummary = '=======================\nSTRUK PESANAN BURGER\n=======================\n\n';
            cart.forEach(item => {
                orderSummary += `- ${item.name} (${item.qty}x) : Rp ${formatRupiah(item.price * item.qty)}\n`;
            });
            orderSummary += '\n-----------------------\n';
            orderSummary += `TOTAL BAYAR: Rp ${totalPriceEl.innerText}\n`;
            orderSummary += '-----------------------\nPesanan akan segera diproses. Terima kasih!';
            
            alert(orderSummary);
            cart = [];
            updateCartUI();
            toggleCart();
        }

        // Formulir Pesan Kontak
        function sendMessage(event) {
            event.preventDefault(); // Mencegah halaman refresh
            alert("Terima kasih! Pesan Anda telah berhasil dikirim ke tim Burger Adha.");
            document.getElementById('msgForm').reset(); // Mengosongkan form
        }

        // Inisialisasi awal
        updateCartUI();