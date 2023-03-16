const themeButton = document.querySelector("#theme-btn");

function changeTheme() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

document.onload = changeTheme();

themeButton.addEventListener('click', () => {
    console.log(localStorage.theme);
    if (document.documentElement.classList.contains("dark")) {
        localStorage.theme = 'light';
        changeTheme();
    } else {
        localStorage.theme = 'dark';
        changeTheme();
    }
});
