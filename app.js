const API_URL = "https://agrichain-backend-y068.onrender.com/api/inventory";

async function fetchMyData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.length > 0) {
            // Stats Update
            const total = data.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById('total-inventory-val').innerText = `${total} KG`;

            const farmers = [...new Set(data.map(item => item.farmerName))].length;
            document.getElementById('active-farmers-count').innerText = farmers;

            // Table Update (Exact layout as before)
            const table = document.getElementById('transaction-table-body');
            table.innerHTML = "";
            data.forEach(item => {
                table.innerHTML += `
                    <tr class="border-b border-gray-900/50">
                        <td class="py-5 text-green-500 font-mono font-bold">${item.batchId}</td>
                        <td class="py-5 font-bold">${item.farmerName}</td>
                        <td class="py-5 text-gray-400">${item.crop}</td>
                        <td class="py-5 font-bold">${item.quantity}</td>
                        <td class="py-5"><span class="bg-green-900/20 text-green-500 px-3 py-1 rounded-full text-[10px] border border-green-800/30 font-bold">VERIFIED</span></td>
                    </tr>
                `;
            });
        }
    } catch (err) {
        console.log("Server error", err);
    }
}
document.addEventListener('DOMContentLoaded', fetchMyData);
