document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('echoesForm');
    const resultDiv = document.getElementById('result');
    const body = document.body;

    // Array of background image URLs
    const backgroundImages = [
        'https://pbs.twimg.com/media/Ge1RiR8bkAAbqE4?format=jpg&name=4096x4096',
        'https://pbs.twimg.com/media/GhKUOKVbIAAc_F5?format=jpg&name=4096x4096',
        'https://pbs.twimg.com/media/EGWQsgmUUAAJ_cq?format=jpg&name=4096x4096',
        'https://pbs.twimg.com/media/GD2SWamagAA9iNd?format=jpg&name=4096x4096',
        'https://pbs.twimg.com/media/F6hD7EcbQAA2vOX?format=jpg&name=large',
        'https://pbs.twimg.com/media/GRU-Cj7XAAAB8Pm?format=jpg&name=large',
        'https://i.redd.it/y81ncir47le31.jpg',
        'https://pbs.twimg.com/media/GRU-92rWYAArCTS?format=jpg&name=large',
        'https://pbs.twimg.com/media/GRU9q1SWoAADkGW?format=jpg&name=large',
        'https://pbs.twimg.com/media/GRU9tpUXkAA_gfE?format=jpg&name=large',
        'https://pbs.twimg.com/media/GRU9xR9bcAA8Yr2?format=jpg&name=large',
        'https://pbs.twimg.com/media/GRU-tEPXAAAeuMZ?format=jpg&name=large',
        'https://pbs.twimg.com/media/GRU-0d_XwAAlODV?format=jpg&name=large',
    ];

    function getRandomImage(images) {
        return images[Math.floor(Math.random() * images.length)];
    }

    body.style.backgroundImage = `url('${getRandomImage(backgroundImages)}')`;

    const conversionRate = parseFloat(body.getAttribute('data-rate')) || 1;
    const currency = body.getAttribute('data-currency') || 'USD';

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const itemPrice = parseInt(document.getElementById('textbox').value, 10);

        if (isNaN(itemPrice) || itemPrice <= 0) {
            resultDiv.textContent = 'Please enter a valid item price.';
            return;
        }

        let totalCostUSD = 0;
        let remainingEchoes = itemPrice;
        const quantities = new Array(8).fill(0);

        const packages = [
            { bonus: 60, price: 0.99 },
            { bonus: 194, price: 2.99 },
            { bonus: 320, price: 4.99 },
            { bonus: 723, price: 9.99 },
            { bonus: 1371, price: 19.99 },
            { bonus: 2123, price: 29.99 },
            { bonus: 3498, price: 49.99 },
            { bonus: 6918, price: 99.99 },
        ];

        for (let i = packages.length - 1; i >= 0; i--) {
            while (remainingEchoes >= packages[i].bonus) {
                remainingEchoes -= packages[i].bonus;
                totalCostUSD += packages[i].price;
                quantities[i]++;
            }
        }

        if (remainingEchoes > 0) {
            for (let i = 0; i < packages.length; i++) {
                if (remainingEchoes <= packages[i].bonus) {
                    totalCostUSD += packages[i].price;
                    quantities[i]++;
                    remainingEchoes = 0;
                    break;
                }
            }
        }

        const totalCostConverted = (totalCostUSD * conversionRate).toFixed(2);

        // ✅ Fixed this part to only show second currency if it's not USD
        let resultText = `Total Cost: $${totalCostUSD.toFixed(2)} (USD)`;
        if (currency !== 'USD') {
            resultText += ` / ${totalCostConverted} ${currency}`;
        }
        resultDiv.innerHTML = `<div class="total-cost-box">${resultText}</div>`;

        document.querySelectorAll('.quantity').forEach((cell, index) => {
            cell.textContent = quantities[index] > 0 ? quantities[index] : '-';
        });

        document.querySelectorAll('.price-sar').forEach(cell => {
            const usdPrice = parseFloat(cell.getAttribute('data-usd'));
            const convertedPrice = (usdPrice * conversionRate).toFixed(2);
            cell.textContent = `${convertedPrice} ${currency}`;
        });
    });

    document.querySelectorAll('.price-sar').forEach(cell => {
        const usdPrice = parseFloat(cell.getAttribute('data-usd'));
        const convertedPrice = (usdPrice * conversionRate).toFixed(2);
        cell.textContent = `${convertedPrice} ${currency}`;
    });
});
