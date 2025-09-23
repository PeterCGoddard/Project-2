// script.js
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const gifResults = document.getElementById('gifResults');

// Replace with your actual Giphy API key
const GIPHY_API_KEY = 'f65DzbgWZVG6JJXMTimgNn1guxDPkXsQ'; 

searchButton.addEventListener('click', fetchGifs);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchGifs();
    }
});

async function fetchGifs() {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) {
        alert('Please enter a search term!');
        return;
    }

    const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchTerm}&limit=25`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayGifs(data.data);
    } catch (error) {
        console.error('Error fetching GIFs:', error);
        gifResults.innerHTML = '<p>Failed to load GIFs. Please try again later.</p>';
    }
}

function displayGifs(gifs) {
    gifResults.innerHTML = '';
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
