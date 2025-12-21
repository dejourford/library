const booksSection = document.querySelector(".books-section");
const addBookButton = document.querySelector("#addBookButton");
const mainSection = document.querySelector("main");
const myLibrary = [];


// create constructor for book
class Book {
    constructor(title, author, pages, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}


//  CREATE DYNAMIC FORM TO ADD/REMOVE BOOKS
function createForm() {
    const form = document.createElement("form");
    form.className = "book-form";

    // Form Close Button
    const formCloseButton = document.createElement("button");
    formCloseButton.id = "close-form-button";
    formCloseButton.textContent = "X";
    form.appendChild(formCloseButton);

    // Title
    const titleHeading = document.createElement("h2");
    titleHeading.className = "form-title";
    titleHeading.textContent = "Enter book information:";
    form.appendChild(titleHeading);
    
    // Helper function for text/number inputs
    function createFormItem(labelText, type, placeholder) {
        const wrapper = document.createElement("div");
        wrapper.className = "form-item";
    
        const label = document.createElement("label");
        label.textContent = labelText;
    
        const input = document.createElement("input");
        input.name = placeholder;
        input.type = type;
        input.placholder = placeholder;
        wrapper.append(label, input)
        return wrapper;
    }
    
    // Form Inputs
    form.appendChild(createFormItem("Title", "text", "title"));
    form.appendChild(createFormItem("Author", "text", "author"));
    form.appendChild(createFormItem("Pages", "number", "pages"));
    
    // isRead checkbox
    const readWrapper = document.createElement("div");
    readWrapper.className = "form-item";
    readWrapper.id = "isRead";
    
    const readLabel = document.createElement("label");
    readLabel.textContent = "Read?";
    
    const readCheckbox = document.createElement("input");
    readCheckbox.classList = "isReadCheckbox";
    readCheckbox.type = "checkbox";
    readCheckbox.name = "isRead";

    readWrapper.append(readLabel, readCheckbox);
    form.appendChild(readWrapper);
    
    // Button
    const button = document.createElement("button");
    button.classList = "form-button"
    button.textContent = "Add";
    button.type = "submit";
    form.appendChild(button);
    
    // append form to page
    mainSection.append(form);

    // Listener for close button
    formCloseButton.addEventListener("click", function(e) {
        e.preventDefault();
        form.remove();
        addBookButton.classList.toggle("hidden");
    })

    // Listener for form on submit
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const formData = new FormData(form);

        const bookToBeAdded = new Book(formData.get("title"), formData.get("author"), formData.get("pages"), formData.get("isRead") === "on");
        addBookToLibrary(bookToBeAdded);
        displayBooks(myLibrary);

        // remove form from DOM and remove hidden class from add book button
        form.remove();
        addBookButton.classList.toggle("hidden");
    })


}

// create function that takes arguments, creates book, and stores book in array
function addBookToLibrary(book) {
    console.log("the book that adds to lib:", book)
    myLibrary.push(book)
    console.log(myLibrary)
}

// create function that loops through library array and creates 
// and displays books in DOM
function displayBooks(booksArray) {
    console.log("dispaly will be:", myLibrary)

    // Clear DOM of previous items before adding new ones
    booksSection.innerHTML = ""

    booksArray.forEach((book) => {
        const bookItem = document.createElement("div");
        bookItem.classList = "book-item";
    
        const bookTitle = document.createElement("p");
        bookTitle.id = "book-title";
        bookTitle.textContent = book.title;
    
        const bookAuthor = document.createElement("p");
        bookAuthor.id = "book-author";
        bookAuthor.textContent = book.author;

        const bookPages = document.createElement("p");
        bookPages.id = "book-pages";
        bookPages.textContent = book.pages;

        bookItem.append(bookTitle, bookAuthor, bookPages)
        booksSection.appendChild(bookItem)
    })
    
}

// Listener for add book button
addBookButton.addEventListener("click", function() {
    const bookForm = document.querySelector(".book-form");
    if (!bookForm) {
        addBookButton.classList.add("hidden");
        createForm()
    }
})

