const API_URL = "https://agrichain-backend-y068.onrender.com/api/inventory";

async function loadData() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        if (data.length > 0) {
            // Stats Update
            const total = data.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById('total-inventory-val').innerText = `${total} KG`;

            const farmers = [...new Set(data.map(item => item.farmerName))].length;
            document.getElementById('active-farmers-count').innerText = farmers;

            // Table Update
            const tbody = document.getElementById('transaction-table-body');
            tbody.innerHTML = "";
            data.forEach(item => {
                tbody.innerHTML += `
                    <tr>
                        <td class="batch-id">${item.batchId}</td>
                        <td class="font-bold">${item.farmerName}</td>
                        <td class="text-gray-400">${item.crop}</td>
                        <td class="font-bold">${item.quantity}</td>
                        <td><span class="status-verified">VERIFIED</span></td>
                    </tr>
                `;
            });
        }
    } catch (err) {
        console.error("Backend offline", err);
    }
}
document.addEventListener('DOMContentLoaded', loadData);
