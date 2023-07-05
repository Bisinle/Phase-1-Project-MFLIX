document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
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
  const trailerBtn = document.querySelector(".movie-card-btn");
  const movieAdder = document.querySelector(".movie-card-adder");
  const formCloser = document.querySelector("#formCloser");
  //movie-card-adder
  let imageSourceARRAY = [];
  console.log(imageSourceARRAY);

  movieAdder.addEventListener("click", () => {
    form.classList.toggle("active");
    carousel.classList.add("active");
    movieUL.classList.add("active");
  });
  formCloser.addEventListener("click", () => {
    form.classList.remove("active");
    carousel.classList.remove("active");
    movieUL.classList.remove("active");
  });

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
      carouselMaker(imageSourceARRAY);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function movieCardCreator(movie) {
    const Card = document.createElement("li");
    Card.classList.add("card");
    Card.innerHTML = `
    <img src="${movie.poster}" class="card-img" alt="" />
    
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
    <i id="trash-${movie.id}" class="fa-solid card-delete fa-trash-can fa-xs"></i> 
      </div>
    `;

    movieUL.append(Card);
    const deleteButton = document.querySelector(`#trash-${movie.id}`);
    deleteButton.addEventListener("click", () => {
      deleteMovieCard(movie.id);
    });
  }

  let start = 0;
  function carouselMaker(array) {
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
  laboriosam itaque veritatis Lorem, ipsum dolor sit amet consectetur`;
    trailerBtn.href = currentMovieObject.trailer;
    setTimeout(() => carouselMaker(array), 2000); // Then use setTimeout to call the function again after 2000ms
  }

  FetchAllData(); // This  startS the loop once the data is fetched and processed.

  //**********************FORM SECTION************************************* */
  const form = document.querySelector("form");
  const allInputs = document.querySelectorAll(".inputs");
  const submitButton = document.querySelector("#submit");

  function createsMovieObjectFromUserInput(input) {
    let objectCreatedFromTheUserInput = {};
    for (let i = 0; i < input.length; i++) {
      input[i].addEventListener("input", () => {
        console.log(input[i].value);
        if (input[i].placeholder === "review") {
          objectCreatedFromTheUserInput[
            input[i].placeholder
          ] = `${input[i].value}/10`;
        } else {
          objectCreatedFromTheUserInput[input[i].placeholder] = input[i].value;
        }
      });
    }
    formValidator(objectCreatedFromTheUserInput, input);
  }
  function formValidator(objectCreatedFromTheUserInput, input) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let isFormValid = true;

      for (let i = 0; i < input.length; i++) {
        if (input[i].value === "") {
          isFormValid = false;
          break;
        }
      }

      if (isFormValid) {
        postObjectCreatedFromTheUserInputToServer(
          objectCreatedFromTheUserInput
        );
      } else {
        alert("No can do. Please fill in all the fields.");
      }
    });
  }

  console.log(createsMovieObjectFromUserInput(allInputs));

  function postObjectCreatedFromTheUserInputToServer(
    objectCreatedFromTheUserInput
  ) {
    fetch(`http://localhost:3000/films`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectCreatedFromTheUserInput),
    });
  }

  function deleteMovieCard(id) {
    fetch(`http://localhost:3000/films/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
});
