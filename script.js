class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
    this.dataId = 0;
  }

  getDataId() {
    return this.dataId;
  }

  changeReadStatus() {
    if (this.read) {
      this.read = false;
    } else {
      this.read = true;
    }
  }
}

// Declare global variables
const openPopUpButton = document.querySelector('.add-book');
const closePopUpButton = document.querySelector('.cancel');
const overlay = document.querySelector('.overlay');
const popup = document.querySelector('.popup');
const titleInput = document.querySelector('.title-input');
const authorInput = document.querySelector('.author-input');
const pagesInput = document.querySelector('.pages-input');
const checkboxInput = document.querySelector('.checkbox-input');
const booksContainer = document.querySelector('.books-container');
const submit = document.querySelector('.popup-submit-button');

const myLibrary = []; // Array for storing book objects
let dataId = 1; // variable for data-id attribute

// Pop-up Open and close functionality
openPopUpButton.addEventListener('click', () => {
  openPopUp();
});

closePopUpButton.addEventListener('click', () => {
  closePopUp();
  clearInputValues();
});

overlay.addEventListener('click', () => {
  closePopUp();
  clearInputValues();
});

// Listen for click events to remove a book or toggle read status
booksContainer.addEventListener('click', (e) => {
  const clickedButton = e.target;
  if (clickedButton.matches('.remove')) {
    removeBook(e);
  } else if (clickedButton.matches('.read-status')) {
    toggleRead(e);
  }
});

// Listen for submit event to add new book
submit.addEventListener('click', (e) => {
  if (
    titleInput.value === '' ||
    authorInput.value === '' ||
    pagesInput.value === ''
  )
    return;
  getUserInput(e);
  clearInputValues();
  closePopUp();
});

function openPopUp() {
  if (popup === null) return;
  popup.classList.add('active');
  overlay.classList.add('active');
}

function closePopUp() {
  if (popup === null) return;
  popup.classList.remove('active');
  overlay.classList.remove('active');
}

function getUserInput(event) {
  const newBook = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value
  ); // Creates new Book object instance

  newBook.dataId = dataId;

  if (checkboxInput.checked) {
    newBook.read = true;
  }
  myLibrary.push(newBook); // Adds Book object to Library array
  booksContainer.appendChild(
    createNewBook(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      newBook.read
    )
  );
  event.preventDefault(); // Prevents form submission to server
}

// Reset Input variables
function clearInputValues() {
  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
  checkboxInput.checked = false;
}

// Create new book element
function createNewBook(title, author, pages, read) {
  const book = document.createElement('div');
  book.setAttribute('data-id', dataId);
  dataId += 1; // Increment variable for data-id attribute
  const bookTitle = document.createElement('div');
  const by = document.createElement('div');
  const bookAuthor = document.createElement('div');
  const bookPages = document.createElement('div');
  const readStatus = document.createElement('button');
  const remove = document.createElement('button');

  book.classList.add('book');
  bookTitle.classList.add('title');
  by.classList.add('by');
  bookAuthor.classList.add('author');
  bookPages.classList.add('pages');
  readStatus.classList.add('read-status');
  remove.classList.add('remove');

  book.appendChild(bookTitle);
  book.appendChild(by);
  book.appendChild(bookAuthor);
  book.appendChild(bookPages);
  book.appendChild(readStatus);
  book.appendChild(remove);

  bookTitle.textContent = `"${title}"`;
  by.textContent = 'By';
  bookAuthor.textContent = author;
  bookPages.textContent = `${pages} pages`;
  if (read === true) {
    readStatus.textContent = 'Read';
    readStatus.classList.add('read');
  } else {
    readStatus.textContent = 'Not read';
    readStatus.classList.add('not-read');
  }
  remove.textContent = 'Remove';
  return book;
}

function removeBook(event) {
  const removeButton = event.target;
  const closest = removeButton.closest('.book');
  const removedBookId = closest.getAttribute('data-id');
  booksContainer.removeChild(closest); // Removes book's element from html

  myLibrary.forEach((object) => {
    if (object.dataId === Number(removedBookId)) {
      const index = myLibrary.indexOf(object);
      myLibrary.splice(index, 1); // Removes book's object from Library array
    }
  });
}

function toggleRead(event) {
  const readbutton = event.target;
  const book = readbutton.closest('.book');
  const readStatus = book.querySelector('.read-status');

  // Change book's element read-status
  if (readStatus.textContent === 'Read') {
    readStatus.classList.remove('read');
    readStatus.classList.add('not-read');
    readStatus.textContent = 'Not Read';
  } else {
    readStatus.classList.remove('not-read');
    readStatus.classList.add('read');
    readStatus.textContent = 'Read';
  }

  const bookId = book.getAttribute('data-id');

  // Change book's object read property
  myLibrary.forEach((object) => {
    if (object.getDataId() === Number(bookId)) {
      object.changeReadStatus();
    }
  });
}
