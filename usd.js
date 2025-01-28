document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('echoesForm');
    const resultDiv = document.getElementById('result');
    const body = document.body;

    // Array of background image URLs
    const backgroundImages = [
        'https://i.redd.it/pt6tuw5ijrna1.jpg',
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

    // Function to select a random image from the array
    function getRandomImage(images) {
        return images[Math.floor(Math.random() * images.length)];
    }

    // Set the random background image
    const randomImage = getRandomImage(backgroundImages);
    body.style.backgroundImage = `url('${randomImage}')`;

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
            { echoes: 60, bonus: 60, price: 0.99 },
            { echoes: 185, bonus: 194, price: 2.99 },
            { echoes: 305, bonus: 320, price: 4.99 },
            { echoes: 690, bonus: 723, price: 9.99 },
            { echoes: 1308, bonus: 1371, price: 19.99 },
            { echoes: 2025, bonus: 2123, price: 29.99 },
            { echoes: 3330, bonus: 3498, price: 49.99 },
            { echoes: 6590, bonus: 6918, price: 99.99 },
        ];

        // Iterate over the packages from the largest to the smallest
        for (let i = packages.length - 1; i >= 0; i--) {
            while (remainingEchoes >= packages[i].bonus) {
                remainingEchoes -= packages[i].bonus;
                totalCostUSD += packages[i].price;
                quantities[i]++;
            }
        }

        // Handle remaining echoes if not perfectly divisible
        if (remainingEchoes > 0) {
            for (let i = 0; i < packages.length; i++) {
                if (remainingEchoes <= packages[i].bonus) {
                    totalCostUSD += packages[i].price;
                    quantities[i]++;
                    remainingEchoes = 0; // All echoes are now covered
                    break;
                }
            }
        }

        resultDiv.innerHTML = `
            <div class="total-cost-box">
                Total Cost: $${totalCostUSD.toFixed(2)} (USD)
            </div>
        `;

        const quantityCells = document.querySelectorAll('.quantity');
        quantityCells.forEach((cell, index) => {
            cell.textContent = quantities[index] > 0 ? quantities[index] : '-';
        });
    });
});
