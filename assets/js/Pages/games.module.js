export class Games {
  constructor() {
    // Select all navigation links
    const navLinks = document.querySelectorAll(".nav-link");
    // Attach click event listeners to each navigation link
    navLinks.forEach((clickedLink) => {
      clickedLink.addEventListener("click", () => {
        // Activate the clicked link
        this.activeLink(clickedLink);
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
}
