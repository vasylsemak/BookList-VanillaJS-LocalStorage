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

  static deleteBook(evt) {
    if (evt.target.classList.contains('delete')) {
      if (confirm('Do you want to delete this book?')) {
        const toRemoveElem = evt.target.parentElement.parentElement;
        toRemoveElem.remove();
      }
    }
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
    alert('Please fill up all fields');
  } else {
    const book = new Book(title, author, bookId);
    UI.addBookToList(book);
    UI.clearForm();
  }
});

// Remove book
document.querySelector('#book-list').addEventListener('click', UI.deleteBook);
