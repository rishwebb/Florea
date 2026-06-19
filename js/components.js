// Components.js - Vanilla JS UI Rendering

window.components = {
    
    init() {
        this.renderHeader();
        this.renderFooter();
        this.setupToastContainer();
        
        // Re-render header when store updates to catch badge changes
        window.store.subscribe(() => {
            this.updateBadges();
        });
    },

    renderHeader() {
        const headerRoot = document.getElementById('header-root');
        if (!headerRoot) return;

        headerRoot.innerHTML = `
        <header class="top-nav" style="transition: all 0.3s ease;">
            <div class="nav-left">
                <a href="index.html" class="logo-pill">
                    <i class="ph-fill ph-flower-lotus"></i>
                    <span>Floréa</span>
                </a>
                <div class="search-pill hidden-mobile">
                    <input type="text" placeholder="Search Ceramics..." style="background:transparent; border:none; outline:none; font-family:inherit;">
                    <button class="icon-btn-black"><i class="ph ph-magnifying-glass"></i></button>
                </div>
            </div>
            
            <div class="nav-right">
                <button class="icon-pill hidden-desktop mobile-menu-btn"><i class="ph ph-list"></i></button>
                <a href="about.html" class="pill-btn hidden-mobile">Story</a>
                <a href="shop.html" class="pill-btn hidden-mobile">Shop</a>
                <a href="blog.html" class="pill-btn hidden-mobile">Journal</a>
                
                <a href="wishlist.html" class="icon-pill text-red relative">
                    <i class="ph-fill ph-heart"></i>
                    <span id="wishlist-badge" class="badge-count hidden">0</span>
                </a>
                <a href="cart.html" class="icon-pill relative">
                    <i class="ph-fill ph-shopping-bag"></i>
                    <span id="cart-badge" class="badge-count hidden">0</span>
                </a>
            </div>
        </header>
        `;

        // Mobile menu toggle logic
        const mobileBtn = headerRoot.querySelector('.mobile-menu-btn');
        if(mobileBtn) {
            mobileBtn.addEventListener('click', () => {
                this.showToast('Mobile menu opened', 'info');
            });
        }
    },

    updateBadges() {
        const cartBadge = document.getElementById('cart-badge');
        const wishBadge = document.getElementById('wishlist-badge');
        
        if (cartBadge) {
            const count = window.store.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartBadge.textContent = count;
            cartBadge.className = count > 0 ? 'badge-count active' : 'badge-count hidden';
        }
        
        if (wishBadge) {
            const count = window.store.wishlist.length;
            wishBadge.textContent = count;
            wishBadge.className = count > 0 ? 'badge-count active' : 'badge-count hidden';
        }
    },

    renderFooter() {
        const footerRoot = document.getElementById('footer-root');
        if (!footerRoot) return;

        footerRoot.innerHTML = `
        <footer class="mt-2xl fade-in-section" style="padding: var(--space-xl) 0 var(--space-md); border-top: 1px solid #E0E0E0; background: #F5F5F7;">
            <div class="grid" style="grid-template-columns: 2fr 1fr 1fr 1fr; gap: var(--space-lg); margin-bottom: var(--space-xl);">
                <div class="flex flex-col gap-sm">
                    <a href="index.html" class="logo-pill inline-flex w-fit mb-xs">
                        <i class="ph-fill ph-flower-lotus"></i>
                        <span>Floréa</span>
                    </a>
                    <p class="text-muted text-sm mb-md" style="max-width: 280px; line-height: 1.6;">Objects of quiet beauty. Handcrafted ceramics designed for minimalist spaces, bridging the gap between art and utility.</p>
                    <div class="flex gap-sm mt-auto">
                        <a href="#" class="icon-btn-transparent-small" style="background: #FFF; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px;"><i class="ph ph-instagram-logo"></i></a>
                        <a href="#" class="icon-btn-transparent-small" style="background: #FFF; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px;"><i class="ph ph-pinterest-logo"></i></a>
                        <a href="#" class="icon-btn-transparent-small" style="background: #FFF; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px;"><i class="ph ph-tiktok-logo"></i></a>
                    </div>
                </div>
                <div class="flex flex-col gap-sm text-sm">
                    <h4 style="font-weight: 600; font-size: 1rem; margin-bottom: 8px;">Shop</h4>
                    <a href="shop.html" class="text-muted hover-text-main transition">All Ceramics</a>
                    <a href="shop.html?filter=sculptural" class="text-muted hover-text-main transition">Sculptural Vases</a>
                    <a href="shop.html?filter=table" class="text-muted hover-text-main transition">Table Decor</a>
                    <a href="shop.html?filter=collections" class="text-muted hover-text-main transition">Collections</a>
                </div>
                <div class="flex flex-col gap-sm text-sm">
                    <h4 style="font-weight: 600; font-size: 1rem; margin-bottom: 8px;">Company</h4>
                    <a href="about.html" class="text-muted hover-text-main transition">Our Story</a>
                    <a href="blog.html" class="text-muted hover-text-main transition">Journal</a>
                    <a href="contact.html" class="text-muted hover-text-main transition">Contact</a>
                    <a href="about.html" class="text-muted hover-text-main transition">Craftsmanship</a>
                </div>
                <div class="flex flex-col gap-sm text-sm">
                    <h4 style="font-weight: 600; font-size: 1rem; margin-bottom: 8px;">Customer Care</h4>
                    <a href="#" class="text-muted hover-text-main transition">Shipping</a>
                    <a href="#" class="text-muted hover-text-main transition">Returns</a>
                    <a href="#" class="text-muted hover-text-main transition">FAQ</a>
                    <a href="#" class="text-muted hover-text-main transition">Privacy Policy</a>
                </div>
            </div>
            
            <div class="flex justify-between items-center text-sm text-muted pt-md" style="border-top: 1px solid #E0E0E0;">
                <span>© 2026 Floréa. All rights reserved.</span>
                <div class="flex gap-md hidden-mobile">
                    <a href="#" class="hover-text-main font-medium">Subscribe to Newsletter</a>
                </div>
            </div>
        </footer>
        `;
    },

    renderProductCard(product) {
        const isWishlisted = window.store.isInWishlist(product.id);
        const heartClass = isWishlisted ? 'ph-fill text-red' : 'ph';
        
        // Random background color for bento aesthetic
        const bgColors = ['#F0F0F0', '#E8E5E1', '#E3E3E3', '#EAE6DF', '#E2DFDF'];
        const bg = bgColors[product.id.charCodeAt(product.id.length-1) % bgColors.length];

        return `
        <div class="bento-card product-card-anim" style="min-height: 400px; background: ${bg}; display: flex; flex-direction: column;">
            <a href="product.html?id=${product.id}" style="flex: 1; position: relative; display: block;">
                <div class="floating-glass-card top-left" style="top: 16px; left: 16px; min-width: auto; padding: 12px; z-index: 2;">
                    <div class="price-row" style="margin-bottom: 0;">
                        <span class="price" style="font-size: 1.2rem;">$${product.price}</span>
                        ${product.compareAtPrice ? `<span class="text-muted text-sm ml-xs" style="text-decoration: line-through;">$${product.compareAtPrice}</span>` : ''}
                    </div>
                </div>
                <img src="${product.images[0]}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; padding: 40px; transition: transform 0.5s ease;">
            </a>
            
            <div class="floating-actions bottom-right z-10" style="bottom: 16px; right: 16px;">
                <button class="icon-btn-glass btn-wishlist" data-id="${product.id}"><i class="${heartClass} ph-heart"></i></button>
                <button class="icon-btn-glass btn-add-cart" data-id="${product.id}"><i class="ph-fill ph-shopping-bag"></i></button>
            </div>
            
            <!-- Simple Overlay Info for aesthetics -->
            <div style="padding: 16px; position: absolute; bottom: 0; left: 0; pointer-events: none;">
                <span class="subtitle text-main" style="font-weight: 500;">${product.name}</span>
            </div>
        </div>
        `;
    },

    setupToastContainer() {
        if (!document.getElementById('toast-container')) {
            const container = document.createElement('div');
            container.id = 'toast-container';
            container.style.cssText = 'position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); z-index: 9999; display: flex; flex-direction: column; gap: 8px; pointer-events: none;';
            document.body.appendChild(container);
        }
    },

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        
        const bgColor = type === 'success' ? '#111' : '#FFF';
        const color = type === 'success' ? '#FFF' : '#111';
        const border = type === 'success' ? 'none' : '1px solid #E0E0E0';

        toast.style.cssText = `
            background: ${bgColor}; color: ${color}; border: ${border};
            padding: 12px 24px; border-radius: 99px; font-size: 0.9rem; font-weight: 500;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transform: translateY(20px); opacity: 0; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        `;
        toast.innerHTML = `<div style="display:flex; align-items:center; gap:8px;">
            <i class="ph-fill ${type === 'success' ? 'ph-check-circle' : 'ph-info'}"></i> ${message}
        </div>`;

        container.appendChild(toast);
        
        // Animate in
        requestAnimationFrame(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        });

        // Remove after 3s
        setTimeout(() => {
            toast.style.transform = 'translateY(-20px)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// Bind global click events for delegated rendering
document.addEventListener('click', (e) => {
    const addCartBtn = e.target.closest('.btn-add-cart');
    if (addCartBtn) {
        const id = addCartBtn.dataset.id;
        window.store.addToCart(id, 1);
    }

    const wishBtn = e.target.closest('.btn-wishlist');
    if (wishBtn) {
        const id = wishBtn.dataset.id;
        window.store.toggleWishlist(id);
        // Toggle icon visually immediately
        const icon = wishBtn.querySelector('i');
        if (window.store.isInWishlist(id)) {
            icon.className = 'ph-fill text-red ph-heart';
        } else {
            icon.className = 'ph ph-heart';
        }
    }
});

// Run init when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.components.init();

    // Intersection Observer for scroll fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
});
