// Main function to retrieve and display a new joke
async function getAndDisplayNewJoke() {
  const joke = await getJoke();
  displayJoke(joke);
}

// Function to retrieve a random joke
async function retrieveJoke() {
  // Jokes is an array of 'joke' strings
  const jokes = await getJokes();
  // Random index is a random number between 0 and the length of the jokes array
  const randomIndex = Math.floor(Math.random() * jokes.length);
  // We display a random joke from the array by using the random index to index it
  displayJoke(jokes[randomIndex]);
}

// Function to update the DOM with the provided joke
function displayJoke(joke) {
  const jokeElement = document.getElementById("joke");
  jokeElement.textContent = joke;
}

// Waits for the DOM to be fully loaded and then displays an initial joke.
document.addEventListener("DOMContentLoaded", retrieveJoke);

// Retrieves the "new joke" button
const newJokeButton = document.getElementById("newJokeBtn");

// Sets up a click event listener to fetch and display a new joke upon clicking the newJokeButton.
newJokeButton.addEventListener("click", retrieveJoke);

async function getJoke() {
  const response = await fetch("https://icanhazdadjoke.com/", {
    method: "GET",
    headers: {
      Accept: "application/JSON",
    },
  });
  const data = await response.json();
  return data.joke;
}

async function getJokes() {
  // Get the response from the API, using 'search' to get multiple jokes
  const response = await fetch("https://icanhazdadjoke.com/search", {
    method: "GET",
    headers: {
      Accept: "application/JSON",
    },
  });
  // Reformat the data so we can use it
  const data = await response.json();
  // Get just the results from the data
  const results = data.results;
  // Make an empty array to store just the joke strings from the results
  const jokes = [];
  // Loop over the results array and store each result's joke in the jokes array
  for (let i = 0; i < results.length; i++) {
    jokes.push(results[i].joke);
  }
  // Return the jokes
  return jokes;
}
