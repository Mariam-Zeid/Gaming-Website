import { UI } from "./userInterface.js";

export class GameDetails {
  constructor(gameID) {
    // Fetch and display details for the specified game ID
    this.getGameDetails(gameID);
    this.ui = new UI();

    // Select game and details pages
    this.gamesPage = document.querySelector("#games");
    this.gameDetailsPage = document.querySelector("#details");

    // Hide the game details page
    this.hideGameDetails();
  }

  // ? ========= Fetch Game API Details =========
  async fetchGameDetails(gameID) {
    const loading = document.querySelector(".loading");
    loading.classList.remove("d-none");

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "22d691cc27msh87bcb8acdbce0f3p14119fjsn848952a9e908",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameID}`,
        options
      );
      const responseData = await response.json();
      console.log(responseData);

      loading.classList.add("d-none");

      return responseData;
    } catch (err) {
      console.log(err);
    }
  }

  // ? ========= Display Game Details =========
  async getGameDetails(gameID) {
    // Fetch details for the specified game ID
    const gameDetails = await this.fetchGameDetails(gameID);
    // Display game details in the UI
    this.ui.displayGameDetails(gameDetails);

    // Switch to the game details page and hide the games page
    this.gamesPage.classList.add("d-none");
    this.gameDetailsPage.classList.remove("d-none");
  }

  // ? ========= Closing Game Details Page =========
  hideGameDetails() {
    const closeBtn = document.querySelector("#btnClose");
    closeBtn.addEventListener("click", () => {
      // Switch to the game details page and hide the games page
      this.gamesPage.classList.remove("d-none");
      this.gameDetailsPage.classList.add("d-none");
    });
  }
}
