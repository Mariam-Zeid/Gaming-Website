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
    const categoryData = await this.fetchGamesData(category);
    this.ui.displayCategoryGames(categoryData)
  }
}
