const movieUL = document.querySelector("#movieUL");
console.log(movieUL);
function FetchAllData() {
  fetch(`  http://localhost:3000/films`)
    .then((res) => {
      if (res.ok) {
        console.log("Fetched SUCCESSFULLY");
      } else {
        console.log("Fetch FAILED");
      }
      return res.json();
    })
    .then((movies) => {
      movies.forEach((movie) => {
        movieCardCreator(movie);
      });
    });
}
FetchAllData();

//************************************************************ */
function movieCardCreator(movie) {
  console.log(movie);
  const Card = document.createElement("li");
  Card.classList.add("card");
  Card.innerHTML = `
    <img src="${movie.poster}" class="card-img" alt="" />
    <a href=""><i id="trash-${movie.id}" class="fa-solid fa-trash-can fa-xs"></i></a>
    
    <div class="card-body card-bodyHover">
    <div id="card-body-div">
    <h1 class="card-title">${movie.title}</h1>
    <hr>
    <div id="info-div">
     <h4>${movie.quality}</h4>
    <h4>${movie.year}</h4>
    <h4>${movie.runtime} min</h4>
    <h4>${movie.review}</h4>
    </div>
    <div id="genre-country">
    <h4><span>Country: </span> ${movie.country}</h4>
   <h4><span>Genre: </span> ${movie.genre}</h4>

   </div>
    <div id="description">
    <p>${movie.description}     Lorem ipsum dolor sit amet consectetur adipisicing 
    elit. Saepe laboriosam itaque veritatis 
    </p>
    </div>
   
  
    </div>
    </button>
    <button class="card-btn">Watch Trailer</button>
      </div>
    `;

  movieUL.append(Card);
}
