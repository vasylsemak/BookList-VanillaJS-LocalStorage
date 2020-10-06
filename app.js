// Book Class
class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

// Storage class

// UI Class
class UI {
  static displayBooks() {
    const booksStorage = [
      {
        title: 'JavaScript for beginers',
        author: 'Bred Miles',
        id: 54321,
      },
      {
        title: 'Python in DataScience',
        author: 'Ted Baker',
        id: 9876,
      },
    ];
    const books = booksStorage;
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
    alert.appendChild(document.createTextNode(message));
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

// Events
// Show all books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Add a book
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
    UI.showAlert('Added to book list!', 'success');
    UI.clearForm();
  }
});

// Remove book
document
  .querySelector('#book-list')
  .addEventListener('click', evt => UI.deleteBook(evt.target));
