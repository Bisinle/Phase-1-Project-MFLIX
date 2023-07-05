const movieUL = document.querySelector("#movieUL");
const wrapper = document.querySelector("#wrapper");
const imageFromHTML = document.querySelector("#imageFromHTML");
const movieTitle = document.querySelector("#movie-title");
const movieYear = document.querySelector("#movieYear");
const movieRuntime = document.querySelector("#movieRuntime");
const movieReview = document.querySelector("#movieReview");
const movieCountry = document.querySelector("#movieCountry");
const movieGenre = document.querySelector("#movieGenre");
const movieQuality = document.querySelector("#movieQuality");
const movieDescription = document.querySelector("#movieDescription");

console.log(imageFromHTML);

console.log(movieUL);
let imageSourceARRAY = [];

async function FetchAllData() {
  try {
    const res = await fetch(`http://localhost:3000/films`);
    if (!res.ok) {
      console.log("Fetch FAILED");
      return;
    }
    console.log("Fetched SUCCESSFULLY");
    const movies = await res.json();

    movies.forEach((movie) => {
      movieCardCreator(movie);
      let srcValues = Object.values(movie.poster).join("");
      imageSourceARRAY.push(movie);
    });

    // After all data is fetched and processed, you can log the array here

    // Or call a function that relies on the array here
    loopThroughTheArrayofImageSource(imageSourceARRAY);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
console.log(imageSourceARRAY);

FetchAllData();

function movieCardCreator(movie) {
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
    <button class="card-btn">Watch Trailer</button>
      </div>
    `;

  movieUL.append(Card);
}

let start = 0;

function loopThroughTheArrayofImageSource(array) {
  if (start < array.length - 1) {
    start += 1;
  } else {
    start = 0; // Changed start = 1 to start = 0 to restart the loop
  }
  const currentMovieObject = array[start]; // Here, you can do something with the image source from the array at the current index 'start'
  const currentImageSource = currentMovieObject.poster;
  imageFromHTML.src = currentImageSource; // For example, you can set the source of an <img> element to display the current image:
  movieTitle.textContent = currentMovieObject.title;
  movieYear.textContent = currentMovieObject.year;
  movieQuality.textContent = currentMovieObject.quality;
  movieRuntime.textContent = currentMovieObject.runtime + " min";
  movieReview.textContent = currentMovieObject.review;

  movieGenre.textContent = ` ${currentMovieObject.genre}`;
  movieDescription.textContent = `${currentMovieObject.description}   Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
  laboriosam itaque veritatis Lorem, ipsum dolor sit amet consectetur
  adipisicing elit. Beatae magnam numquam officiis repudiandae`;
  setTimeout(() => loopThroughTheArrayofImageSource(array), 2000); // Then use setTimeout to call the function again after 2000ms
}

FetchAllData(); // This will start the loop once the data is fetched and processed.
