const themeButton = document.querySelector("#theme-btn");
const themeTooltip = document.querySelector("#theme-tooltip");
const btnCloseModal = document.querySelector("#btn-close-modal");
const btnCancel = document.querySelector("#btn-cancel");
const bookTitle = document.querySelector("#book-title");
const labelBookTitle = document.querySelector("#lbl-book-title");
const bookAuthor = document.querySelector("#book-author");
const bookDescription = document.querySelector("#book-description");
const bookIsRead = document.querySelector("#is-read");
const btnAddBook = document.querySelector("#btn-add");
const modal = document.querySelector("#modal");
const modalWithin = document.querySelector("#modal-within");
const modalOut = document.querySelector("#modal-out");
const bookContainer = document.querySelector("#book-container");
const formNewBook = document.querySelector("#form-new-book");
const modalTitle = document.querySelector("#modal-title");
const infoModal = document.querySelector("#info-modal");
const authorModal = document.querySelector("#author-modal");
const modalIcon = document.querySelector("#modal-icon");
const focusableElements =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
const focusableContent = modal.querySelectorAll(focusableElements);
const lastFocusableElement = focusableContent[focusableContent.length - 1];
const defaultBtnNewBook = `<article class="bg-white border border-gray-300 dark:border-gray-200/5 dark:bg-gray-900 border-l-8 border-l-indigo-600 dark:border-l-indigo-700 rounded-lg shadow"><button id="btn-new-book" class="group w-full h-full pt-8 pb-6 px-4 flex flex-col items-center justify-around text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-700"> <i class="fa-solid fa-circle-plus text-7xl group-hover:scale-105 transition-all"></i> <h3 class="font-bold transition-all">Add book</h3></button></article>`;

let isBtnNewBook = false;

let btnNewBook = document.querySelector("#btn-new-book");

let myLibrary = [];

function Book(title, author, description, isRead) {
  this.title = title;
  this.author = author;
  this.description = description;
  this.isRead = isRead;
}

function resetBtnNewBook() {
  if (isBtnNewBook) btnNewBook.removeEventListener("click", () => toggleForm());
  btnNewBook = document.querySelector("#btn-new-book");
  btnNewBook.addEventListener("click", () => toggleForm());
}

function displayBooks() {
  bookContainer.innerHTML = defaultBtnNewBook;
  resetBtnNewBook();
  if (myLibrary != []) {
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
        "before:content-['By']",
        "before:not-italic",
        "text-gray-500",
        "dark:text-gray-400",
        "pl-2",
        "mb-2",
        "text-sm",
        "italic"
      );
      author.textContent = ` ${book.author}`;
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
      btnInfo.setAttribute(
        "id",
        `btn-info-${myLibrary.findIndex(
          (obj) => obj.title === book.title && obj.author === book.author
        )}`
      );
      buttons.appendChild(btnInfo);

      const btnRead = document.createElement("button");
      btnRead.classList.add(
        "group",
        "relative",
        "outline-none",
        "outline-0",
        "hover:text-slate-600",
        "focus-visible:text-slate-600",
        "focus-visible:ring-2",
        "focus-visible:ring-slate-700"
      );
      if (book.isRead) {
        btnRead.innerHTML = `<i class="fa-solid fa-bookmark"></i>
        <div
          class="opacity-0 -translate-y-1 whitespace-nowrap bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-center text-base rounded-lg py-2 absolute z-10 group-hover:translate-y-0 group-hover:opacity-100 top-10 -left-6 px-3 pointer-events-none transition-all">
          <span id="read-tooltip">Read</span>
          <svg class="absolute text-gray-900 dark:text-white rotate-180 h-2 bottom-10 left-[1.7rem]" x="0px" y="0px"
            viewBox="0 0 255 255" xml:space="preserve">
            <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </div>`;
      } else {
        btnRead.innerHTML = `<i class="fa-regular fa-bookmark"></i>
        <div
          class="opacity-0 -translate-y-1 whitespace-nowrap bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-center text-base rounded-lg py-2 absolute z-10 group-hover:translate-y-0 group-hover:opacity-100 top-10 -left-6 px-3 pointer-events-none transition-all">
          <span id="read-tooltip">Not read</span>
          <svg class="absolute text-gray-900 dark:text-white rotate-180 h-2 bottom-10 left-[1.7rem]" x="0px" y="0px"
            viewBox="0 0 255 255" xml:space="preserve">
            <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </div>`;
      }
      btnRead.setAttribute(
        "id",
        `btn-isRead-${myLibrary.findIndex(
          (obj) => obj.title === book.title && obj.author === book.author
        )}`
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
        `btn-delete-${myLibrary.findIndex(
          (obj) => obj.title === book.title && obj.author === book.author
        )}`
      );
      buttons.appendChild(btnDelete);

      article.appendChild(buttons);

      bookContainer.appendChild(article);

      const btnInfoAppended = document.querySelector(
        `#btn-info-${myLibrary.findIndex(
          (obj) => obj.title === book.title && obj.author === book.author
        )}`
      );

      btnInfoAppended.addEventListener("click", () => {
        toggleForm("close", book.title, book.author, book.description);
      });

      const btnIsReadAppended = document.querySelector(
        `#btn-isRead-${myLibrary.findIndex(
          (obj) => obj.title === book.title && obj.author === book.author
        )}`
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
          document.querySelector("#read-tooltip").textContent = "Not read";
          myLibrary.map((obj) => {
            if (obj.title === book.title && obj.author === book.author) {
              obj.isRead = false;
            }
          });
        } else {
          btnIsReadAppended.firstChild.classList.remove(
            "fa-regular",
            "fa-bookmark"
          );
          btnIsReadAppended.firstChild.classList.add("fa-solid", "fa-bookmark");
          document.querySelector("#read-tooltip").textContent = "Read";
          myLibrary.map((obj) => {
            if (obj.title === book.title && obj.author === book.author) {
              obj.isRead = true;
            }
          });
        }
      });

      const btnDeleteAppended = document.querySelector(
        `#btn-delete-${myLibrary.findIndex(
          (obj) => obj.title === book.title && obj.author === book.author
        )}`
      );

      btnDeleteAppended.addEventListener("click", () => {
        myLibrary.splice(
          myLibrary.findIndex(
            (obj) => obj.title === book.title && obj.author === book.author
          ),
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
  if (
    myLibrary.some((book) => title === book.title && author === book.author)
  ) {
    labelBookTitle.setAttribute(
      "data-help",
      "This book already exists in your library"
    );
    bookTitle.focus();
    labelBookTitle.classList.remove(
      "peer-focus-visible:peer-valid:after:opacity-0"
    );
    labelBookTitle.classList.remove("peer-focus-visible:animate-fade");
    labelBookTitle.classList.add("peer-focus-visible:animate-alert");
  } else {
    labelBookTitle.setAttribute("data-help", "* This is a required field");
    labelBookTitle.classList.remove("peer-focus-visible:animate-alert");
    labelBookTitle.classList.add("peer-focus-visible:animate-fade");
    labelBookTitle.classList.add(
      "peer-focus-visible:peer-valid:after:opacity-0"
    );
    myLibrary.push(new Book(title, author, description, isRead));
    displayBooks();
    toggleModal();
  }
}

function toggleModal() {
  if (modal.getAttribute("aria-modal") == "true") {
    modal.setAttribute("aria-modal", "false");
    cleanForm();
  } else {
    modal.setAttribute("aria-modal", "true");
  }
}

function toggleForm(
  func = "open",
  title = "Add a new book",
  author = "",
  description = ""
) {
  if (func == "open") {
    infoModal.classList.add("hidden");
    authorModal.classList.add("hidden");
    formNewBook.classList.remove("hidden");
    modalIcon.classList.remove("fa-book-open");
    btnAddBook.classList.remove("hidden");
    btnCancel.textContent = "Cancel";
    modalIcon.classList.add("fa-circle-plus");
  } else {
    formNewBook.classList.add("hidden");
    btnAddBook.classList.add("hidden");
    btnCancel.textContent = "Close";
    authorModal.classList.remove("hidden");
    infoModal.classList.remove("hidden");
    modalIcon.classList.remove("fa-circle-plus");
    modalIcon.classList.add("fa-book-open");
  }
  authorModal.textContent = ` ${author}`;
  infoModal.textContent = description;
  modalTitle.textContent = title;
  toggleModal();
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

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.getAttribute("aria-modal") === "true") {
    toggleModal();
  }
});

document.addEventListener("keydown", function (e) {
  let isTabPressed = e.key === "Tab";

  if (!isTabPressed) {
    return;
  }

  if (e.shiftKey) {
    // if shift key pressed for shift + tab combination
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus(); // add focus for the last focusable element
      e.preventDefault();
    }
  } else {
    // if tab key is pressed
    if (document.activeElement === lastFocusableElement) {
      // if focused has reached to last focusable element then focus first focusable element after pressing tab
      firstFocusableElement.focus(); // add focus for the first focusable element
      e.preventDefault();
    }
  }
});

displayBooks();

firstFocusableElement.focus();

btnCloseModal.addEventListener("click", toggleModal);

btnCancel.addEventListener("click", toggleModal);

modalOut.addEventListener("click", toggleModal);

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
