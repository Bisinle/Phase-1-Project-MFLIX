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
//async function that fetchs our data and awaits the responce
  async function FetchAllData() {
    try {
      const res = await fetch(`https://mflix-4c7j.onrender.com/films`);
      if (!res.ok) {
        console.log("Fetch FAILED");
        return;
      }
      console.log("Fetched SUCCESSFULLY");
      const movies = await res.json();

      movies.forEach((movie) => {
        movieCardCreator(movie);  
        imageSourceARRAY.push(movie);
      });

   
      carouselMaker(imageSourceARRAY);
      let likedMoviesReturn = addMovieToFavourites(movieCards); 
      console.log(likedMoviesReturn);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
//function to create our movie card dynamically
  function movieCardCreator(movie) {
    const Card = document.createElement("li");
    Card.classList.add("card");
    Card.innerHTML = `
    <div id="image-wrapper">
    <img src="${movie.poster}" class="card-img" alt="" />

    </div>
    <h1 class="card-title onCard">${movie.title}</h1>
    <i id="trash-${movie.id}" class="fa-solid card-delete fa-trash-can fa-xs"></i> 
    <a href="#fave-movies" id="like-link">

    <i id="trash-${movie.id}" class="fa-solid  card-like fa-heart"></i>
    </a>


    
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
    <a href="${movie.trailer}" class="card-btn">Watch Trailer</a>     
      </div>
    `;
    Card.setAttribute("data-movie-id", `${movie.id}`);
    movieUL.append(Card);
    const deleteButton = document.querySelector(`#trash-${movie.id}`);
    deleteButton.addEventListener("click", () => {
      deleteMovieCard(movie.id);
    });
  }

  // a function to create our carousel by looping through our array of objects
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
    setTimeout(() => carouselMaker(array), 4000); // Then use setTimeout to call the function again after 2000ms
  }

  FetchAllData(); // This  startS the loop once the data is fetched and processed.

  //**********************FORM SECTION************************************* */
  const form = document.querySelector("form");
  const allInputs = document.querySelectorAll(".inputs");
  const submitButton = document.querySelector("#submit");

  createsMovieObjectFromUserInput(allInputs);
  //create an object from the user input
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
//function to validate the form 
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
      //empty all the input fields when the form is submited
      for (let i = 0; i < input.length; i++) {
        input[i].value = "";
      }
      //close the form when it is submitted
      form.classList.remove("active");
      carousel.classList.remove("active");
      movieUL.classList.remove("active");
    });
  }
  //Open the form when the movieAdder is clicked by adding the folowin classes to it
  function formPopupOpener(movieAdder) {
    movieAdder.addEventListener("click", () => {
      form.classList.toggle("active");
      carousel.classList.add("active");
      movieUL.classList.add("active");
    });
  }
  //Remove the form when the formCloser is clicked by removing all the  classes from it
  function formPopupOCloser(formCloser) {
    formCloser.addEventListener("click", () => {
      form.classList.remove("active");
      carousel.classList.remove("active");
      movieUL.classList.remove("active");
    });
  }
  formPopupOpener(movieAdder);
  formPopupOCloser(formCloser);

  //Post the object that was created from the user input to the server to updat our database
  function postObjectCreatedFromTheUserInputToServer(
    objectCreatedFromTheUserInput
  ) {
    fetch(`https://mflix-4c7j.onrender.com/films`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectCreatedFromTheUserInput),
    });
  }

  function deleteMovieCard(id) {
    fetch(`https://mflix-4c7j.onrender.com/films/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  //***********FAVOURITE MOVIES SECTION************** */
  console.log(movieUL);
  const movieCards = movieUL.getElementsByTagName("li");
  const likedMovies = document.querySelector("#liked-movies");
  //Add a movie to Favourite section when the hert icon clicked
  function addMovieToFavourites(movieCards) {
    let clonedCardsArray = [];
    for (let i = 0; i < movieCards.length; i++) {
      const likeMovie = movieCards[i].querySelector(".card .card-like");
      likeMovie.addEventListener("click", () => {
        const clonedCard = movieCards[i].cloneNode(true);
        clonedCard.classList.add("resize-cloned-card");

        // Check if the cloned card is already present in the likedMovies div
        const existingCards = likedMovies.querySelectorAll(".card");
        const isDuplicate = Array.from(existingCards).some((card) =>
          card.isEqualNode(clonedCard)
        );

        if (!isDuplicate) {
          likedMovies.append(clonedCard);
          clonedCardsArray.push(clonedCard);
        } else {
          alert("You have already liked this movie.");
        }
        deleteFavouriteMovies(likedMovies, clonedCardsArray);
      });
    }

    return likedMovies;
  }

  //Delete a movies from the favourite movie section
  function deleteFavouriteMovies(likedMovies, array) {
    console.log(likedMovies);
    const clonedCards = Array.from(likedMovies.querySelectorAll(".card "));
    console.log(clonedCards);
    for (let i = 0; i < clonedCards.length; i++) {
      const deleteFaveMovie = clonedCards[i].querySelector(".card-delete ");
      deleteFaveMovie.addEventListener("click", () => {
        likedMovies.removeChild(clonedCards[i]);
      });
    }
    console.log(clonedCards);
  }
});
