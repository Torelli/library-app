const themeButton = document.querySelector("#theme-btn");
const themeTooltip = document.querySelector("#theme-tooltip");
const btnCloseModal = document.querySelector("#btn-close-modal");
const btnCancel = document.querySelector("#btn-cancel");
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookDescription = document.querySelector("#book-description");
const bookIsRead = document.querySelector("#is-read");
const btnAddBook = document.querySelector("#btn-add");
const modal = document.querySelector("#modal");
const modalWithin = document.querySelector("#modal-within");
const modalOut = document.querySelector("#modal-out");
const bookContainer = document.querySelector("#book-container");
const defaultBtnNewBook = bookContainer.innerHTML;
const sanitizer1 = new Sanitizer();

let btnNewBook = document.querySelector("#btn-new-book");

let myLibrary = [];

function Book(title, author, description, isRead) {
  this.title = title;
  this.author = author;
  this.description = description;
  this.isRead = isRead;
}

function resetBtnNewBook() {
  btnNewBook.removeEventListener("click", toggleModal);
  btnNewBook = document.querySelector("#btn-new-book");
  btnNewBook.addEventListener("click", toggleModal);
}

function displayBooks() {
  if (myLibrary != []) {
    bookContainer.setHTML(defaultBtnNewBook, { sanitizer: sanitizer1 });
    resetBtnNewBook();
    for (let book of myLibrary) {
      const article = document.createElement("article");
      article.classList.add(
        "bg-white",
        "pt-8",
        "pb-6",
        "px-4",
        "border",
        "border-gray-300",
        "dark:border-gray-200/5",
        "dark:bg-gray-900",
        "border-l-8",
        "border-l-indigo-600",
        "dark:border-l-indigo-700",
        "rounded-lg",
        "shadow"
      );

      const title = document.createElement("h3");
      title.classList.add("font-bold");
      title.textContent = book.title;
      article.appendChild(title);

      const author = document.createElement("p");
      author.classList.add(
        "text-gray-500",
        "dark:text-gray-400",
        "pl-2",
        "text-sm",
        "italic"
      );
      author.textContent = book.author;
      article.appendChild(author);

      const description = document.createElement("p");
      description.classList.add(
        "h-24",
        "pl-4",
        "text-xs",
        "text-gray-500",
        "dark:text-gray-400",
        "line-clamp-6"
      );
      description.textContent = book.description;
      article.appendChild(description);

      const buttons = document.createElement("div");
      buttons.classList.add("mt-4", "flex", "justify-end", "gap-4", "text-lg");

      const btnInfo = document.createElement("button");
      btnInfo.classList.add(
        "outline-none",
        "outline-0",
        "hover:text-slate-600",
        "focus-visible:text-slate-600",
        "focus-visible:ring-2",
        "focus-visible:ring-slate-700"
      );
      btnInfo.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
      buttons.appendChild(btnInfo);

      const btnRead = document.createElement("button");
      btnRead.classList.add(
        "outline-none",
        "outline-0",
        "hover:text-slate-600",
        "focus-visible:text-slate-600",
        "focus-visible:ring-2",
        "focus-visible:ring-slate-700"
      );
      if (book.isRead) {
        btnRead.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
      } else {
        btnRead.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
      }
      btnRead.setAttribute(
        "id",
        `btn-isRead-${myLibrary.findIndex((obj) => obj.title === book.title)}`
      );
      buttons.appendChild(btnRead);

      const btnDelete = document.createElement("button");
      btnDelete.classList.add(
        "outline-none",
        "outline-0",
        "hover:text-slate-600",
        "focus-visible:text-slate-600",
        "focus-visible:ring-2",
        "focus-visible:ring-slate-700"
      );
      btnDelete.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
      btnDelete.setAttribute(
        "id",
        `btn-delete-${myLibrary.findIndex((obj) => obj.title === book.title)}`
      );
      buttons.appendChild(btnDelete);

      article.appendChild(buttons);

      bookContainer.appendChild(article);

      const btnIsReadAppended = document.querySelector(
        `#btn-isRead-${myLibrary.findIndex((obj) => obj.title === book.title)}`
      );

      btnIsReadAppended.addEventListener("click", () => {
        if (book.isRead) {
          btnIsReadAppended.firstChild.classList.remove(
            "fa-solid",
            "fa-bookmark"
          );
          btnIsReadAppended.firstChild.classList.add(
            "fa-regular",
            "fa-bookmark"
          );
          myLibrary.map((obj) => {
            if (obj.title === book.title) {
              obj.isRead = false;
            }
          });
        } else {
          btnIsReadAppended.firstChild.classList.remove(
            "fa-regular",
            "fa-bookmark"
          );
          btnIsReadAppended.firstChild.classList.add("fa-solid", "fa-bookmark");
          myLibrary.map((obj) => {
            if (obj.title === book.title) {
              obj.isRead = true;
            }
          });
        }
      });

      const btnDeleteAppended = document.querySelector(
        `#btn-delete-${myLibrary.findIndex((obj) => obj.title === book.title)}`
      );

      btnDeleteAppended.addEventListener("click", () => {
        myLibrary.splice(
          myLibrary.findIndex((obj) => obj.title === book.title),
          1
        );
        displayBooks();
      });
    }
  }
}

function cleanForm() {
  bookTitle.value = "";
  bookAuthor.value = "";
  bookDescription.value = "";
  bookIsRead.checked = false;
}

function addBookToLibrary(title, author, description, isRead) {
  myLibrary.push(new Book(title, author, description, isRead));
  displayBooks();
}

function toggleModal() {
  if (modal.getAttribute("aria-modal") == "true") {
    modal.setAttribute("aria-modal", "false");
    cleanForm();
  } else {
    modal.setAttribute("aria-modal", "true");
  }
}

function modalClick(e) {
  e.stopPropagation();
  e.stopImmediatePropagation();
  return false;
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

btnCancel.addEventListener("click", toggleModal);

modalOut.addEventListener("click", toggleModal);

btnNewBook.addEventListener("click", toggleModal);

modalWithin.addEventListener("click", modalClick);

btnAddBook.addEventListener("click", (e) => {
  if (bookTitle.value !== "" && bookAuthor.value !== "") {
    e.preventDefault();
    addBookToLibrary(
      bookTitle.value,
      bookAuthor.value,
      bookDescription.value,
      bookIsRead.checked
    );
    toggleModal();
  }
});

themeButton.addEventListener("click", () => {
  if (document.documentElement.classList.contains("dark")) {
    localStorage.theme = "light";
    changeTheme();
  } else {
    localStorage.theme = "dark";
    changeTheme();
  }
});
