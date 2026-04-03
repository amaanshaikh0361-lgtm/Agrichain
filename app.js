// 1. Tera DB Object (As it was in your file)
const DB = {
    farmers: [...], // Same as your file
    prices: {...},  // Same as your file
    transactions: [...] // Same as your file
};

// 2. Navigation Control (Smooth Transitions)
function showPage(pageId) {
    const current = document.querySelector('.page.active');
    gsap.to(current, { opacity: 0, y: -20, duration: 0.3, onComplete: () => {
        current.classList.remove('active');
        const next = document.getElementById('page-' + pageId);
        next.classList.add('active');
        gsap.fromTo(next, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
    }});
    
    // Update active nav button
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    // (Add logic to find clicked btn)
}

// 3. Render Shop (Connecting to your UI)
function renderShop(filter = 'all') {
    const grid = document.getElementById('shopGrid');
    const items = Object.entries(DB.prices).filter(([c, d]) => filter === 'all' || d.cat === filter);
    
    grid.innerHTML = items.map(([crop, d]) => `
        <div class="shop-card stat-card">
            <div class="crop-emoji">${CROP_EMOJI[crop] || '🌾'}</div>
            <h4>${crop}</h4>
            <p>Mandi Price: ₹${d.modal}</p>
            <h2 style="color:var(--primary)">₹${Math.round(d.modal * 0.95)}/Qt</h2>
            <button class="btn-glow" style="width:100%" onclick="addToCart('${crop}')">Add to Cart</button>
        </div>
    `).join('');
}

// 4. Initialization
window.onload = () => {
    animateStats(); // Tumhare file wala counter
    renderShop();
    renderHeroTicker();
    
    // GSAP Entrance
    gsap.from(".glass-nav", { y: -100, opacity: 0, duration: 1, ease: "power4.out" });
};
