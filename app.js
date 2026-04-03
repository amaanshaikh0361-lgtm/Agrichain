// --- GSAP Initial Animations ---
gsap.from(".glass-nav", { y: -100, opacity: 0, duration: 1.2, ease: "power4.out" });
gsap.from(".hero-content h1", { x: -100, opacity: 0, duration: 1, delay: 0.5 });

// --- Auth0 Configuration ---
let auth0 = null;
const fetchAuthConfig = () => fetch("/auth_config.json"); // Tu ye file banayega

const configureClient = async () => {
    auth0 = await createAuth0Client({
        domain: "YOUR_DOMAIN", // Teri key yahan aayegi
        client_id: "YOUR_CLIENT_ID"
    });
};

window.onload = async () => {
    await configureClient();
    updateUI();
};

const updateUI = async () => {
    const isAuthenticated = await auth0.isAuthenticated();
    if (isAuthenticated) {
        const user = await auth0.getUser();
        document.getElementById("user-profile").style.display = "flex";
        document.getElementById("login-btn").style.display = "none";
        document.getElementById("user-img").src = user.picture;
        document.getElementById("user-name").innerText = user.nickname;
        document.getElementById("dash-link").style.display = "inline";
    }
};

// --- Contentful Fetching (Placeholder) ---
const fetchCrops = async () => {
    // API Call to Contentful
    const shopGrid = document.getElementById("contentful-shop");
    // Dynamic cards injection logic...
};

// --- Page Switching with Animation ---
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    gsap.to(".page.active", { opacity: 0, y: 20, duration: 0.3, onComplete: () => {
        pages.forEach(p => p.classList.remove('active'));
        const nextPage = document.getElementById(pageId);
        nextPage.classList.add('active');
        gsap.fromTo(nextPage, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
    }});
}
