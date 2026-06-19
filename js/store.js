// Store.js - Manages Global State (Cart, Wishlist, Products)

class Store {
    constructor() {
        this.products = [];
        
        // Use window.name as a cross-page state carrier for file:// protocol
        let savedState = {};
        try {
            if (window.name && window.name.startsWith('{')) {
                savedState = JSON.parse(window.name);
            }
        } catch(e) {}

        let localCart = [];
        let localWishlist = [];
        try {
            localCart = JSON.parse(localStorage.getItem('florea_cart')) || [];
            localWishlist = JSON.parse(localStorage.getItem('florea_wishlist')) || [];
        } catch(e) {}

        this.cart = savedState.cart && savedState.cart.length ? savedState.cart : localCart;
        this.wishlist = savedState.wishlist && savedState.wishlist.length ? savedState.wishlist : localWishlist;
        this.listeners = [];
    }

    async init() {
        // Hardcoded products to avoid CORS/fetch issues on file:// protocol
        this.products = [
            {
              "id": "prod_1",
              "name": "Ethereal White",
              "price": 320,
              "compareAtPrice": 400,
              "description": "A striking sculptural form with a soft matte white finish. Handcrafted to evoke a sense of quietude in minimalist spaces.",
              "category": "Sculptural",
              "images": ["assets/images/hero_vase_1781843237863.png"],
              "inventory": 15,
              "materials": ["Matte Ceramic", "Natural Clay"],
              "dimensions": "H 30cm x W 18cm x D 18cm",
              "rating": 4.9,
              "reviews": 24,
              "sku": "FL-001"
            },
            {
              "id": "prod_2",
              "name": "Aura Flow Duo",
              "price": 210,
              "compareAtPrice": 280,
              "description": "Sleek, minimalist design for ultimate serenity and beauty. Its soft, organic curves make it a beautiful standalone art piece.",
              "category": "Ceramic",
              "images": ["assets/images/vase_product_1_1781843259747.png"],
              "inventory": 8,
              "materials": ["Glazed Ceramic"],
              "dimensions": "H 24cm x W 12cm x D 12cm",
              "rating": 4.8,
              "reviews": 12,
              "sku": "FL-002"
            },
            {
              "id": "prod_3",
              "name": "Textured Cylinder",
              "price": 185,
              "compareAtPrice": null,
              "description": "An elegant cylindrical vase finished in a raw, sandy beige texture. Perfect for dried florals or tall minimalist branches.",
              "category": "Tall Vases",
              "images": ["assets/images/vase_product_2_1781843273686.png"],
              "inventory": 22,
              "materials": ["Stoneware", "Sand Glaze"],
              "dimensions": "H 35cm x W 10cm x D 10cm",
              "rating": 4.7,
              "reviews": 38,
              "sku": "FL-003"
            },
            {
              "id": "prod_4",
              "name": "Ribbed Clay",
              "price": 250,
              "compareAtPrice": null,
              "description": "Featuring distinct vertical ribbing, this vase brings architectural interest to any tabletop. Finished in a warm clay hue.",
              "category": "Textured",
              "images": ["assets/images/vase_product_3_1781843290145.png"],
              "inventory": 5,
              "materials": ["Terracotta", "Matte Finish"],
              "dimensions": "H 28cm x W 15cm x D 15cm",
              "rating": 4.9,
              "reviews": 19,
              "sku": "FL-004"
            },
            {
                "id": "prod_5",
                "name": "Nordic Shadow",
                "price": 195,
                "compareAtPrice": 220,
                "description": "A dark, moody addition to our collection. The Nordic Shadow features a smooth, satin black finish that contrasts beautifully with bright florals.",
                "category": "Minimalist",
                "images": ["assets/images/interior_styling_1781843302973.png"],
                "inventory": 12,
                "materials": ["Porcelain", "Satin Glaze"],
                "dimensions": "H 22cm x W 22cm x D 22cm",
                "rating": 4.6,
                "reviews": 8,
                "sku": "FL-005"
            },
            {
                "id": "prod_6",
                "name": "Soft Arch",
                "price": 280,
                "compareAtPrice": null,
                "description": "Inspired by classical architecture, this piece uses a soft arched profile to frame negative space beautifully.",
                "category": "Sculptural",
                "images": ["assets/images/hero_vase_1781843237863.png"],
                "inventory": 0,
                "materials": ["Matte Ceramic"],
                "dimensions": "H 32cm x W 20cm x D 8cm",
                "rating": 5.0,
                "reviews": 4,
                "sku": "FL-006"
            }
        ];
        this.notify();
    }

    subscribe(listener) {
        this.listeners.push(listener);
        listener(this);
    }

    notify() {
        this.listeners.forEach(listener => listener(this));
    }

    // --- Cart Methods ---
    
    addToCart(productId, quantity = 1) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({ ...product, quantity });
        }
        
        this.saveCart();
        window.components?.showToast(`Added ${product.name} to cart`, 'success');
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(i => i.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    saveCart() {
        try { localStorage.setItem('florea_cart', JSON.stringify(this.cart)); } catch(e) {}
        this.syncWindowName();
        this.notify();
    }

    // --- Wishlist Methods ---

    toggleWishlist(productId) {
        const index = this.wishlist.indexOf(productId);
        if (index > -1) {
            this.wishlist.splice(index, 1);
            window.components?.showToast('Removed from wishlist', 'info');
        } else {
            this.wishlist.push(productId);
            window.components?.showToast('Added to wishlist', 'success');
        }
        this.saveWishlist();
    }

    isInWishlist(productId) {
        return this.wishlist.includes(productId);
    }

    saveWishlist() {
        try { localStorage.setItem('florea_wishlist', JSON.stringify(this.wishlist)); } catch(e) {}
        this.syncWindowName();
        this.notify();
    }

    syncWindowName() {
        try {
            window.name = JSON.stringify({
                cart: this.cart,
                wishlist: this.wishlist
            });
        } catch(e) {}
    }
}

// Initialize Global Store
window.store = new Store();
document.addEventListener('DOMContentLoaded', () => window.store.init());
