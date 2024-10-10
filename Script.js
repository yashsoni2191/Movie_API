const apiKey = '651ccf26'
const movieName = document.getElementById("search")
const option = document.getElementById("opt")
const resultBox = document.getElementById("box")

movieName.addEventListener("input", () => {
    if (movieName.value) {
        fetchData(movieName.value, option.value)
    }
})

option.addEventListener("change", () => {
    if (movieName.value) {
        fetchData(movieName.value, option.value)
    }
})

function fetchData(movie, type) {
    let url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${movie}`
    if (type === "movie" || type === "series") {
        url += `&type=${type}`
    } else if (type === "year") {
        url += `&y=${movie}`
    }

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if (data.Response === 'False') {
                resultBox.innerHTML = "<p>No results found.</p>"
            } else {
                displayMovies(data.Search)
            }
        })
        .catch((err) => {
            console.error("Error fetching data:", err)
            resultBox.innerHTML = "<p>Error loading results. Please try again.</p>"
        })
}

function displayMovies(movies) {
    resultBox.innerHTML = ''
    movies.forEach(movie => {
        const movieCard = document.createElement('div')
        movieCard.classList.add('movie-card')

        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title} poster">
            <div class="movie-info">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
            </div>
        `

        resultBox.appendChild(movieCard)
    })
}
