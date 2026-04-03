// --- Page Navigation with GSAP ---
function showPage(pageId) {
    gsap.to(".page.active", { opacity: 0, y: 20, duration: 0.3, onComplete: () => {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const next = document.getElementById('page-' + pageId);
        next.classList.add('active');
        gsap.fromTo(next, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
    }});
}

// --- Auth0 Integration ---
let auth0 = null;

const initAuth = async () => {
    auth0 = await createAuth0Client({
        domain: "YOUR_DOMAIN",
        client_id: "YOUR_CLIENT_ID"
    });

    const isAuthenticated = await auth0.isAuthenticated();
    if (isAuthenticated) {
        const user = await auth0.getUser();
        document.getElementById("login-btn").style.display = "none";
        document.getElementById("user-profile").style.display = "flex";
        document.getElementById("user-avatar").src = user.picture;
    }
};

const login = async () => {
    await auth0.loginWithRedirect({
        authorizationParams: { redirect_uri: window.location.origin }
    });
};

window.onload = initAuth;
