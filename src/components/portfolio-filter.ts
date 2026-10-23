type ProjectCategory = "all" | "ui" | "ux" | "crud";

const filterButtons = [...document.querySelectorAll<HTMLButtonElement>("[data-project-filter]")];
const projectCards = [...document.querySelectorAll<HTMLElement>("[data-project-category]")];
const demoGrid = document.querySelector<HTMLElement>(".demo-grid");

function isProjectCategory(value: string | undefined): value is ProjectCategory {
  return value === "all" || value === "ui" || value === "ux" || value === "crud";
}

function applyProjectFilter(category: ProjectCategory): void {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.projectFilter === category;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  projectCards.forEach((card) => {
    card.hidden = category !== "all" && card.dataset.projectCategory !== category;
  });

  if (demoGrid) {
    const demoCards = [...demoGrid.querySelectorAll<HTMLElement>("[data-project-category]")];
    demoGrid.hidden = demoCards.every((card) => card.hidden);
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.projectFilter;
    if (isProjectCategory(category)) applyProjectFilter(category);
  });
});
