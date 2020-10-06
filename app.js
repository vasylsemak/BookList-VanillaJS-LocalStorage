//   BOOK CLASS   /////////
class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

//   STORAGE CLASS   /////////
class Storage {
  static dispalyBooks() {
    let books;
    if (localStorage.getItem('books') === null) books = [];
    else books = JSON.parse(localStorage.getItem('books'));
    return books;
  }

  static addBook(book) {
    const books = this.dispalyBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(bookId) {
    let books = this.dispalyBooks();
    books = books.filter(book => book.id !== bookId);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

//   UI CLASS   /////////
class UI {
  static displayBooks() {
    const books = Storage.dispalyBooks();
    books.forEach(book => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.id}</td>
      <td>
        <a href="#" class="btn btn-sm btn-danger delete">X</a>
      </td>
    `;
    document.querySelector('#book-list').appendChild(tr);
  }

  static deleteBook(elem) {
    if (elem.classList.contains('delete')) {
      if (confirm('Do you want to delete this book?')) {
        const toRemoveElem = elem.parentElement.parentElement;
        toRemoveElem.remove();
        UI.showAlert('Book has been removed.', 'success');
      }
    }
  }

  static showAlert(message, type) {
    // create alert node
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.style.textAlign = 'center';
    alert.style.fontSize = '1.5rem';
    const text = document.createTextNode(message);
    alert.appendChild(text);
    // insert alert node
    const form = document.querySelector('#book-form');
    const button = document.querySelector('input[type="submit"]');
    form.insertBefore(alert, button);
    // remove node after 2 sec
    setTimeout(() => document.querySelector('.alert').remove(), 2000);
  }

  static clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('bookId').value = '';
  }
}

//         EVENTS         /////////////////
// SHOW ALL BOOKS
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// ADD BOOK
document.querySelector('#book-form').addEventListener('submit', evt => {
  evt.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const bookId = document.getElementById('bookId').value;

  if (title === '' || author === '' || bookId === '') {
    UI.showAlert('Please fill up all fields', 'danger');
  } else {
    const book = new Book(title, author, bookId);
    UI.addBookToList(book);
    Storage.addBook(book);
    UI.showAlert('Added to book list!', 'success');
    UI.clearForm();
  }
});

// REMOVE BOOK
document.querySelector('#book-list').addEventListener('click', evt => {
  let currBookId = evt.target.parentElement.previousElementSibling.textContent;
  Storage.removeBook(currBookId);
  UI.deleteBook(evt.target);
});
