const movieUL = document.querySelector("#movieUL");
const wrapper = document.querySelector("#wrapper");

console.log(movieUL);
let imageSourceARRAY = [];

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
        movieImageArrayCreator(movie.poster, movie.id, movie.title);
      });
    });
}
FetchAllData();

//************************************************************ */
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
    </button>
    <button class="card-btn">Watch Trailer</button>
      </div>
    `;

  movieUL.append(Card);
}

function movieImageArrayCreator(Image, id, title) {
  const imageElmentBuilt = document.createElement("img");
  const imageList = document.createElement("li");
  imageList.classList.add("slide"); //give each list a className of slide
  imageElmentBuilt.classList.add("images");
  imageElmentBuilt.setAttribute("src", `${Image}`);
  imageElmentBuilt.setAttribute("alt", `${title} image `);
  imageElmentBuilt.setAttribute("data-movie-id", `${id}`);
  imageList.append(imageElmentBuilt); //attach the image to the li
  wrapper.append(imageList); //attach the list that has the image inside to the wrapper in the HTML

  imageSourceARRAY.push(imageList);
  return wrapper;
}
console.log(wrapper);
const litsThatContainImages = wrapper.getElementsByTagName("li");
for (let i=1; i<litsThatContainImages; i++) {
  li[0].setAttribute('data-active','true')
    break
  
}
 const listimages = wrapper.getElementsByTagName("li");
 console.log(listimages);
// // imageSourceARRAY[0].setAttribute("data-active", "true");
// console.log(imageSourceARRAY);
