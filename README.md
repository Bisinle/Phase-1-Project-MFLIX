# MFLIX

## Description

`the code in this project  fetches movie data from a server, creates movie cards dynamically, and enables users to add and remove movies to/from favourite movies. handles form submission and validation and also
POST and DELETE data from the server`

## Features

`Movie carousel:` The code implements a carousel that displays movie cards one at a time. It periodically updates the movie details and image source to create a dynamic carousel effect.
`Fetch movie data: `The code fetches movie data from a server using the fetch() API. It retrieves movies from the specified URL and processes the response data.
`Create movie cards:` Movie cards are dynamically created based on the fetched data. Each card includes details such as the movie title, image, review, year, genre, and runtime. Users can click on the "Watch Trailer" button to view the movie trailer.
`Add movies to favorites:` Users can click on the heart icon to add movies to their favorites list. When a movie is liked, a cloned version of the movie card is appended to the `Favourite Movies` section. Duplicate movies cannot be added to the list.
`Delete movies`: Users can delete movie cards by just hovering over the card title section and click the delete icon, additionally, users can also delete movie from the favorites list by clicking on the trash can icon associated with each movie card.
`Form submission and validation:` The code includes a form section where users can input details of a new movie. Upon form submission, the data is sent to the server via a `POST` request. Form validation ensures that all required fields are filled before submission.

## Setup and Usage

To use this code, follow these steps:

1. Clone the repository or download the code files.
2. Open the HTML file in a web browser.
3. The movie carousel will start automatically, displaying movie cards fetched from the server.
4. To watch a trailer of the movie that is displaying on the carousel, click on the `Watch trailer` button
5. hover over a card to see that movie card information
6. To add a movie to the favorites list, click the` heart icon` on a movie card. The cloned movie card will appear in the `Favourite Movies` section.
7. To delete a movie from the database and from favorites list, click the `trash-can icon` associated with the movie card in the section. when trash-can on `Favourite Movie` movies is clicked, that movie is removed from the `Favourite Movie` section not from the database
8. To add a new movie, click the "Add Movie" button. A form will appear where you can enter the details of the new movie. Fill in all the required fields and click the "Submit" button to add the movie. Note: The form data is sent to a server specified in the code, so make sure the server is running and accessible.
   The movie carousel will continue to display movies in a loop, updating every few seconds.

## Dependencies

This code does not have any external dependencies. It uses standard HTML, CSS, and JavaScript.

## Credits

This code was developed by `Abdiwadud Mohamed`. It utilizes the Fetch API for data retrieval and manipulation.

## License

This code is licensed under the `Bisinle` License.

Feel free to modify and use this code according to your needs.

## Issues and Contributions

If you encounter any issues or have suggestions for improvements, please create an issue in this repository. Contributions and pull requests are also welcome.

## Contact

For any further questions or inquiries, please contact `abdiwadud.mohamedd.@gmail.com`.
