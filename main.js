const booksSection = document.querySelector(".books-section");
const addBookButton = document.querySelector("#addBookButton");
const mainSection = document.querySelector("main");
let myLibrary = [];


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
function createForm(editItem) {
    if (editItem) {
     console.log(editItem)   
    }
    
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

    // Input text upon editing
    if (editItem) {
        const titleInput = form.querySelector('input[name="title"]');
        const authorInput = form.querySelector('input[name="author"]');
        const pagesInput = form.querySelector('input[name="pages"]');
        const readInput = form.querySelector('input[name="isRead"]');


        titleInput.value = editItem.querySelector(".book-title").textContent
        authorInput.value = editItem.querySelector(".book-author").textContent
        pagesInput.value = editItem.querySelector(".book-pages").textContent
        readInput.checked = editItem.dataset.isRead === "true";
    }

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
    formCloseButton.addEventListener("click", function (e) {
        e.preventDefault();
        form.remove();
        addBookButton.classList.remove("hidden");
    })

    // Listener for form on submit
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        // if statemement to catch empty inputs on submit
        const title = formData.get("title")?.trim();
        const author = formData.get("author")?.trim();
        const pages = formData.get("pages")?.trim();
        if (!title || !author || !pages) {
            return
        }

        const bookToBeAdded = new Book(formData.get("title"), formData.get("author"), formData.get("pages"), formData.get("isRead") === "on");
        addBookToLibrary(bookToBeAdded);
        displayBooks(myLibrary);

        // remove form from DOM and remove hidden class from add book button
        form.remove();
        addBookButton.classList.remove("hidden");
    })


}

// create function that takes arguments, creates book, and stores book in array
function addBookToLibrary(book) {
    console.log("the book that adds to lib:", book)
    myLibrary.push(book)
    console.log(myLibrary)
}

// create function to remove book from library on click
function removeBookFromLibrary(book) {
    myLibrary =  myLibrary.filter((item) => item.id !== book.id)
}

// create function that loops through library array and creates 
// and displays books in DOM
function displayBooks(booksArray) {

    // Clear DOM of previous items before adding new ones
    booksSection.innerHTML = ""

    booksArray.forEach((book) => {
        const bookItem = document.createElement("div");
        bookItem.classList = "book-item";
        bookItem.dataset.isRead = book.read;

        // add green border to book item if dataset-read === true
        if (book.read) {
            bookItem.classList.add("is-read");
        }


        const bookInfo = document.createElement("div");

        const bookTitle = document.createElement("p");
        bookTitle.classList = "book-title";
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement("p");
        bookAuthor.classList = "book-author";
        bookAuthor.textContent = book.author;

        const bookPages = document.createElement("p");
        bookPages.classList = "book-pages";
        bookPages.textContent = book.pages;

        const bookActions = document.createElement("div");
        bookActions.classList = "book-actions";
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        bookActions.append(editButton, removeButton)


        bookInfo.append(bookTitle, bookAuthor, bookPages);
        bookItem.append(bookInfo, bookActions);
        booksSection.appendChild(bookItem);


        // event listener for the remove button on each book
        removeButton.addEventListener("click", function(e){
            e.preventDefault();

            const form = document.querySelector("form");
            if (form) {
                return
            }

            removeBookFromLibrary(book);
            displayBooks(myLibrary);
        })

        // event listener for the edit button on each book
        editButton.addEventListener("click", function(e) {
            e.preventDefault();

            const form = document.querySelector("form");
            if (!form) {
                createForm(e.target.closest(".book-item"));
            }
        })

    })

}

// Listener for add book button
addBookButton.addEventListener("click", function () {
    const form = document.querySelector("form");
    if (!form) {
        addBookButton.classList.add("hidden");
        createForm()
    }
})

