document.addEventListener("DOMContentLoaded",()=>{
    const apikey="7dd8a9005c956dfdaf601e4a660a95f5";
    const searchBtn=document.querySelector(".btn");
    const searchInput=document.querySelector(".Movies-input");
    const moviesSection=document.querySelector(".movies-section");

    // Trigger search on button click
    searchBtn.addEventListener("click",()=>{
        const query = searchInput.value.trim();
        if(query){
            fetchMovies(query);
        }
    });

    //Optional: trigger on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
  });

   // 🔄 Fetch movies from TMDB API
   async function fetchMovies(query) {
        console.log('Searching for:', query); // 👈 Debug log
        const url=`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${encodeURIComponent(query)}`;
        console.log('Fetching URL:', url); // 👈 Debug log

        try{
        const response = await fetch(url);
        const data = await response.json();
        console.log('API Response:', data); // 👈 Debug log

          if (!data || !data.results) {
            throw new Error("Invalid data format from API");
          }

          displayMovies(data.results);
        } catch(error){
        console.error("Error:",error);
        moviesSection.innerHTML = "<p style='color:white'>⚠️ Failed to load data.</p>";
        }
    }

     // 🖼️ Dynamically display movie cards
    function displayMovies(movies) {
    moviesSection.innerHTML = '';

    if (!movies || movies.length === 0) {
      moviesSection.innerHTML = "<p style='color:white'>❌ No results found.</p>";
      return;
    }

    movies.forEach(movie => {
        const title = movie.title || 'No Title';
        const overview = movie.overview || 'No description available.';
        const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
        const releaseDate = movie.release_date || 'Unknown';
        const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`: 'https://via.placeholder.com/208x300?text=No+Image';
       
        const box = document.createElement('div');
        box.className = 'box';

        box.innerHTML = `
        <div class="box-content">
          <div style="background-image:url('${imageUrl}'); height:300px; background-size:cover; background-position:top center; border-radius:8px;"></div>
          <h2 class="title" style="font-size:1.1rem; padding:5px 0;">${title}</h2>
          <p class="m-info" style="font-size:0.9rem; padding:0 5px;">${overview.slice(0, 80)}...</p>
          <a class="rating" style="display:block; margin-top:8px; text-align:center;">⭐ ${rating} | 📅 ${releaseDate}</a>
        </div>
      `;
      moviesSection.appendChild(box);
    });
    }
});

