// 1. Page Switching Logic
function showPage(pageId) {
    // Scroll to top
    window.scrollTo(0, 0);

    // Fade out current page
    const current = document.querySelector('.page.active');
    gsap.to(current, { opacity: 0, y: 20, duration: 0.3, onComplete: () => {
        current.classList.remove('active');
        
        // Show next page
        const next = document.getElementById('page-' + pageId);
        next.classList.add('active');
        gsap.fromTo(next, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
    }});

    // Update Nav Buttons
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    // Find the button that matches the page and add active class
}

// 2. Auth0 Setup (Keys placeholder)
let auth0 = null;
const initAuth = async () => {
    // Yahan apni keys dalna jab ready ho
    // auth0 = await createAuth0Client({ domain: "...", client_id: "..." });
    console.log("Auth System Initialized");
};

// 3. Mock Data for Market
const crops = [
    { name: "Wheat", price: 2320, emoji: "🌾", cat: "Grain" },
    { name: "Onion", price: 1850, emoji: "🧅", cat: "Veg" },
    { name: "Tomato", price: 1450, emoji: "🍅", cat: "Veg" }
];

function renderShop() {
    const grid = document.getElementById('shop-grid');
    if(!grid) return;
    
    grid.innerHTML = crops.map(c => `
        <div class="shop-card">
            <div class="card-icon">${c.emoji}</div>
            <h3>${c.name}</h3>
            <p>Category: ${c.cat}</p>
            <div class="price">₹${c.price}/Qt</div>
            <button class="btn-glow" style="width:100%; margin-top:10px;">Buy Now</button>
        </div>
    `).join('');
}

// Initialize on Load
window.onload = () => {
    initAuth();
    renderShop();
    
    // Initial GSAP Reveal
    gsap.from(".glass-nav", { y: -100, opacity: 0, duration: 1 });
    gsap.from(".hero-text", { x: -50, opacity: 0, duration: 1, delay: 0.5 });
};
    
