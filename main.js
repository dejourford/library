const booksSection = document.querySelector(".books-section");
const myLibrary = [];


// create constructor for book
class Book {
    constructor(title, author, pages) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
}


// create function that takes arguments, creates book, and stores book in array
function addBookToLibrary(title, author, pages, isRead) {
    console.log(title)
}

// create function that loops through library array and displays books in DOM
function displayBooks() {
    
}


addBookToLibrary("test", "test", 24, false);
displayBooks();