// --- Navigation Panel Toggle ---
const toggleNav = () => {
    const navPanel = document.getElementById("side-nav");
    const menuIcon = document.querySelector(".menu-icon");
    navPanel.classList.toggle("open");
    menuIcon.classList.toggle("active");
};

// --- Page Switching Logic ---
const navTo = (pageId) => {
    toggleNav(); // Close panel after click
    // existing showPage logic here...
    showPage(pageId);
};

// ... existing code ...
