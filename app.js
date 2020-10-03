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
}

// Events
// Show all books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Add a book

// Remove book
