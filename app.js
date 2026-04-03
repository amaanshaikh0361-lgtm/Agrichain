const API_URL = "https://agrichain-backend-y068.onrender.com/api/inventory";

async function refreshDashboard() {
    try {
        console.log("Fetching live data from MongoDB...");
        const response = await fetch(API_URL);
        const batches = await response.json();

        if (batches && batches.length > 0) {
            // 1. Update Total Quantity
            const totalQty = batches.reduce((sum, b) => sum + b.quantity, 0);
            document.getElementById('total-inventory-val').innerText = `${totalQty} KG`;

            // 2. Update Farmer Count
            const farmers = [...new Set(batches.map(b => b.farmerName))].length;
            document.getElementById('active-farmers-count').innerText = farmers;

            // 3. Update Table Rows
            const tableBody = document.getElementById('transaction-table-body');
            tableBody.innerHTML = ""; 

            batches.forEach(item => {
                tableBody.innerHTML += `
                    <tr class="hover:bg-gray-800/30 transition-colors group">
                        <td class="py-4 px-6 font-mono text-green-500">${item.batchId}</td>
                        <td class="font-medium text-gray-200">${item.farmerName}</td>
                        <td class="text-gray-400">${item.crop}</td>
                        <td class="font-bold text-white">${item.quantity}</td>
                        <td><span class="px-2 py-0.5 bg-green-900/30 text-green-500 text-[10px] font-bold rounded border border-green-800/30">VERIFIED</span></td>
                    </tr>
                `;
            });
            console.log("UI updated with MongoDB data, bhai!");
        }
    } catch (err) {
        console.error("Connection Error:", err);
        document.getElementById('total-inventory-val').innerText = "Offline";
    }
}

// Initial Load
document.addEventListener('DOMContentLoaded', refreshDashboard);
