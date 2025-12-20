const booksSection = document.querySelector(".books-section");
const addBookButton = document.querySelector("#addBookButton");
const mainSection = document.querySelector("main");
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
    
    readWrapper.append(readLabel, readCheckbox);
    form.appendChild(readWrapper);
    
    // Button
    const button = document.createElement("button");
    button.classList = "form-button"
    button.textContent = "Add";
    form.appendChild(button);
    
    // append form to page
    mainSection.append(form);

    // Listener for close button
    formCloseButton.addEventListener("click", function(e) {
        e.preventDefault();
        form.remove();
        addBookButton.classList.toggle("hidden");
    })


}

// create function that takes arguments, creates book, and stores book in array
function addBookToLibrary(title, author, pages, isRead) {
    console.log(title)
}

// create function that loops through library array and displays books in DOM
function displayBooks() {

}


addBookButton.addEventListener("click", function() {
    console.log("book added")
    const bookForm = document.querySelector(".book-form");
    if (!bookForm) {
        addBookButton.classList.add("hidden");
        createForm()
    }
})

addBookToLibrary("test", "test", 24, false);
displayBooks();