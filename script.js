document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const gifResults = document.getElementById('gifResults');
    const GIPHY_API_KEY = 'f65DzbgWZVG6JJXMTimgNnguxDPkXsQ'; // Replace with your GIPHY API Key

    async function fetchGifs(query) {
        gifResults.innerHTML = ''; // Clear previous results
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${query}&limit=20`);
            const data = await response.json();
            displayGifs(data.data);
        } catch (error) {
            console.error('Error fetching GIFs:', error);
            gifResults.innerHTML = '<p>Error loading GIFs. Please try again.</p>';
        }
    }

    function displayGifs(gifs) {
        if (gifs.length === 0) {
            gifResults.innerHTML = '<p>No GIFs found for your search.</p>';
            return;
        }
        gifs.forEach(gif => {
            const gifItem = document.createElement('div');
            gifItem.classList.add('gif-item');
            const img = document.createElement('img');
            img.src = gif.images.fixed_height.url;
            img.alt = gif.title;
            gifItem.appendChild(img);
            gifResults.appendChild(gifItem);
        });
    }

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            fetchGifs(query);
        } else {
            gifResults.innerHTML = '<p>Please enter a search term.</p>';
        }
    });

    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });
});
