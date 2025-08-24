const apiKey = 'YOUR_API_KEY_HERE'; // 🟡 Insert your real key here
const searchBtn = document.getElementById('searchBtn');
const movieInput = document.getElementById('movieInput');
const output = document.getElementById('output');

    searchBtn.addEventListener('click', async () => {
    const query = movieInput.value.trim();
      if (!query) return;

      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("data=",data);
        output.innerHTML = '';

        if (data.results && data.results.length > 0) {
          data.results.forEach(movie => {
            const div = document.createElement('div');
            div.innerHTML = `<h3>${movie.title}</h3>`;
            output.appendChild(div);
          });
        } else {
          output.innerHTML = '<p>No results found.</p>';
        }
      } catch (err) {
        output.innerHTML = '<p>Error fetching movies.</p>';
        console.error(err);
    }
});
