const themeButton = document.querySelector("#theme-btn");
const themeTooltip = document.querySelector("#theme-tooltip");
const btnCloseModal = document.querySelector("#btn-close-modal");
const modal = document.querySelector("#modal");
// const modalBackdrop = document.querySelector("#modal-backdrop");
const btnNewBook = document.querySelector("#btn-new-book");

function toggleModal() {
  if (modal.getAttribute("aria-modal") == "true") {
    modal.setAttribute("aria-modal", "false");
  } else {
    modal.setAttribute("aria-modal", "true");
  }
}

function changeTheme() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    themeTooltip.textContent = "Turn off dark mode";
  } else {
    document.documentElement.classList.remove("dark");
    themeTooltip.textContent = "Turn on dark mode";
  }
}

document.onload = changeTheme();

btnCloseModal.addEventListener("click", toggleModal);

// modalBackdrop.addEventListener("click", toggleModal);

btnNewBook.addEventListener("click", toggleModal);

themeButton.addEventListener("click", () => {
  console.log(localStorage.theme);
  if (document.documentElement.classList.contains("dark")) {
    localStorage.theme = "light";
    changeTheme();
  } else {
    localStorage.theme = "dark";
    changeTheme();
  }
});
