import { GameDetails } from "./gameDetails.module.js";
import { UI } from "./userInterface.js";

export class Games {
  constructor() {
    // Default category name for the first entry
    this.getGamesData("mmorpg");
    // Select all navigation links
    const navLinks = document.querySelectorAll(".nav-link");
    // Attach click event listeners to each navigation link
    navLinks.forEach((clickedLink) => {
      clickedLink.addEventListener("click", () => {
        // Activate the clicked link
        this.activeLink(clickedLink);
        const category = this.getCategory(clickedLink);
        this.getGamesData(category);
      });
    });
  }

  // ? ========= Change active Link =========
  activeLink(clickedLink) {
    // * Activates the clicked navigation link, removing the active class from any other active link.

    // Remove the active class from any navlink that currently has it.
    const activeLink = document.querySelector(".navbar-nav .active");
    activeLink.classList.remove("active");

    // Assign the active class only to the link that was clicked.
    clickedLink.classList.add("active");
  }

  // ? ========= Fetch Games API Data =========
  async fetchGamesData(category) {

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
        `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
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

  // ? ========= Get Games Category =========
  getCategory(activeLink) {
    const category = activeLink.dataset.category;
    console.log(category);
    return category;
  }

  // ? ========= Display Category Games =========
  async getGamesData(category) {
    this.ui = new UI();

    // Fetch games data for the specified category
    const categoryData = await this.fetchGamesData(category);

    // Display the fetched games data in the UI
    this.ui.displayCategoryGames(categoryData);

    // Once the data is added to the HTML, we can get the card ID (Identifying the exact card clicked to display its details.)
    // Identify the exact card clicked to display its details
    this.gameId();
  }

  // ? ========= Get Game ID =========
  gameId() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.dataset.id;
        console.log(id);
        // Returning Game Details
        const gameDetails = new GameDetails(id);
      });
    });
  }
}
