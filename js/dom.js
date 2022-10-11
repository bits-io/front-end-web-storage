const COMPLETED = "completeBookshelfList";
const ITEM_ID = "itemId";

const checkbox = document.getElementById("inputBookIsComplete");
checkbox.addEventListener("click", function() {
    const button = document.querySelector("#bookSubmit span");
    if (checkbox.checked) {
        button.innerText = "selesai dibaca";
    } else {
        button.innerText = "Belum dibaca";
    }
});

function addBook() {
    const uncompletedBOOKList = document.getElementById("incompleteBookshelfList");
    const listCompleted = document.getElementById("completeBookshelfList");

    const BookTitle = document.getElementById("inputBookTitle").value;
    const BookAuthor = document.getElementById("inputBookAuthor").value;
    const BookPublisher = document.getElementById("inputBookPublisher").value;
    const BookYear = document.getElementById("inputBookYear").value;
    const BookIsComplete = document.getElementById("inputBookIsComplete").checked;

    const book = createBook(BookTitle, BookAuthor, BookPublisher, BookYear, BookIsComplete);
    const bookObject = composeBookObject(BookTitle, BookAuthor, BookPublisher, BookYear, BookIsComplete);

    book[ITEM_ID] = bookObject.id;
    books.push(bookObject);

    if (BookIsComplete) {
        listCompleted.append(book);
    } else {
        uncompletedBOOKList.append(book);
    }
    updateDataToStorage();

}

function createBook(title, author, publisher, year, isComplete) {

    const textTitle = document.createElement("h3");
    textTitle.innerText = title;

    const textAuthor = document.createElement("p");
    textAuthor.innerText = author;
    
    const texPublisher = document.createElement("p");
    texPublisher.innerText = publisher;

    const textYear = document.createElement("p");
    textYear.innerText = year;

    const container = document.createElement("article");
    container.classList.add("book_item")
    container.append(textTitle, textAuthor, texPublisher, textYear);

    const containerAction = document.createElement('div');
    containerAction.classList.add('action');

    if (isComplete) {
        containerAction.append(createUndoButton(), createTrashButton());
    } else {
        containerAction.append(createCheckButton(), createTrashButton());
    }

    container.append(containerAction);

    return container;
}

function createCheckButton() {
    return createButton("Selesai dibaca", "green", function(event) {
        addBookToCompleted(event.target.parentElement.parentElement);
    });
}

function createTrashButton() {
    return createButton("Hapus buku", "red", function(event) {
        removeBookFromUncompleted(event.target.parentElement.parentElement);
    });
}

function createUndoButton() {
    return createButton("Belum Dibaca", "green", function(event) {
        addBookToUnCompleted(event.target.parentElement.parentElement);
    });
}

function createButton(buttonText, buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = buttonText;
    button.addEventListener("click", function(event) {
        eventListener(event);
    });   
    return button;
}

function addBookToCompleted(bookElement) {
    const listCompleted = document.getElementById("completeBookshelfList");
    const BookTitle = bookElement.querySelector(".book_item > h3").innerText;
    const BookAuthor = bookElement.querySelectorAll(".book_item > p")[0].innerText;
    const BookPublisher = bookElement.querySelectorAll(".book_item > p")[1].innerText;
    const BookYear = bookElement.querySelectorAll(".book_item > p")[2].innerText;
    const BookIsComplete = true;

    const newBook = createBook(BookTitle, BookAuthor, BookPublisher, BookYear, BookIsComplete);
    const book = findBook(bookElement[ITEM_ID]);

    book.isCompleted = true;
    newBook[ITEM_ID] = book.id;

    listCompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function removeBookFromUncompleted(bookElement) {
    const bookPosition = findBookIndex(bookElement[ITEM_ID]);
    books.splice(bookPosition, 1);

    bookElement.remove();
    updateDataToStorage();
}

function addBookToUnCompleted(bookElement) {
    const BookTitle = bookElement.querySelector(".book_item > h3").innerText;
    const BookAuthor = bookElement.querySelectorAll(".book_item > p")[0].innerText;
    const BookPublisher = bookElement.querySelectorAll(".book_item > p")[1].innerText;
    const BookYear = bookElement.querySelectorAll(".book_item > p")[2].innerText;
    const BookIsComplete = false;

    const newBook = createBook(BookTitle, BookAuthor, BookPublisher, BookYear, BookIsComplete);
    const book = findBook(bookElement[ITEM_ID]);

    book.isCompleted = false;
    newBook[ITEM_ID] = book.id;

    const listUncompleted = document.getElementById("incompleteBookshelfList");
    listUncompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}