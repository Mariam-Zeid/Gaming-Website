export class UI {
  // ? ========= Display Category Games =========
  displayCategoryGames(category) {
    let gamesCard = "";
    let categoryGames = document.querySelector("#gamesData");

    for (let i = 0; i < category.length; i++) {
      gamesCard += `<!-- Game Card -->
          <div class="col">
            <div class="card h-100 bg-transparent" role="button" data-id="${
              category[i].id
            }">
              <div class=" card-body">
                <figure class="position-relative">
                  <img class="card-img-top object-fit-cover h-100" src="${
                    category[i].thumbnail
                  }"/>
                </figure>
                <figcaption>
                  <div class="hstack justify-content-between">
                    <h3 class="h6 small">${category[i].title}</h3>
                    <span class="badge text-bg-primary p-2">Free</span>
                  </div>
                  <p class="card-text small text-center opacity-50">
                    ${category[i].short_description.split(" ", 8)}
                  </p>
                </figcaption>
              </div>
              <footer class="card-footer small hstack justify-content-between">
                <span class="badge badge-color">${category[i].genre}</span>
                <span class="badge badge-color">${category[i].platform}</span>
              </footer>
            </div>
          </div>`;
    }
    categoryGames.innerHTML = gamesCard;
  }
}
