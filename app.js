// Tera Render Backend URL
const API_URL = "https://agrichain-backend-y068.onrender.com/api/inventory";

// 1. Data Load karne wala function
async function loadAgriData() {
    const loader = document.getElementById('loader'); // Agar tune loader banaya hai
    if(loader) loader.style.display = 'block';

    try {
        console.log("Fetching data from MongoDB via Render...");
        const response = await fetch(API_URL);
        
        if (!response.ok) throw new Error("Network response thik nahi hai bhai!");
        
        const inventory = await response.json();
        console.log("Data aa gaya:", inventory);

        // UI Update Karo
        updateDashboard(inventory);
        renderInventoryCards(inventory);

    } catch (error) {
        console.error("Backend se connectivity issue:", error);
        alert("Bhai, Backend connect nahi ho raha. Render logs check kar!");
    } finally {
        if(loader) loader.style.display = 'none';
    }
}

// 2. Dashboard Stats Update karne ke liye
function updateDashboard(data) {
    const totalBatches = data.length;
    const totalQty = data.reduce((sum, item) => sum + item.quantity, 0);
    
    // HTML IDs ke hisaab se update kar (Check your HTML IDs)
    if(document.getElementById('total-batches')) {
        document.getElementById('total-batches').innerText = totalBatches;
    }
    if(document.getElementById('total-quantity')) {
        document.getElementById('total-quantity').innerText = `${totalQty} KG`;
    }
}

// 3. Shop ya Inventory Cards Render karne ke liye
function renderInventoryCards(data) {
    const container = document.getElementById('inventory-grid'); 
    if(!container) return;

    container.innerHTML = ''; // Purana saaf karo

    data.forEach(item => {
        const card = `
            <div class="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
                <div class="flex justify-between items-start">
                    <h3 class="text-xl font-bold text-gray-800">${item.crop}</h3>
                    <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Grade ${item.grade}</span>
                </div>
                <p class="text-sm text-gray-600 mt-2">Farmer: <span class="font-medium">${item.farmerName}</span></p>
                <p class="text-sm text-gray-600">Batch: ${item.batchId}</p>
                <div class="mt-4 flex justify-between items-center">
                    <span class="text-lg font-bold text-green-600">${item.quantity} KG</span>
                    <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Buy Now</button>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

// 4. Page load hote hi function call karo
document.addEventListener('DOMContentLoaded', loadAgriData);
