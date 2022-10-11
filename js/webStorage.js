const STORAGE_KEY = "BIT_BOOKS_APPS";

let books = [];

function isStorageExist() {
    if (!(typeof(Storage))) {
        alert("Your browser does not support local storage");
        return false
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("save_data"));
}

function loadDataFromStorage(search="") {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null){
        if(search){
            books = data.filter((a) => {
                for(let b of a.title.split(" ")){
                    if(b === search){
                        return b;
                    }
                } 
                for(let b of a.author.split(" ")){
                    if(b === search){
                        return b;
                    }
                } 
                for(let b of a.publisher.split(" ")){
                    if(b === search){
                        return b;
                    }
                } 
                for(let b of a.year.split(" ")){
                    if(b === search){
                        return b;
                    }
                } 
            });

            console.log(search)
        }else{
            books = data;
        }
    }    
    document.dispatchEvent(new Event("load_data"));
}

function updateDataToStorage() {
    if (isStorageExist())
        saveData();
}

function composeBookObject(title, author, publisher, year, isCompleted) {
    return {
        id: + new Date() + title.length,
        title,
        author,
        publisher,
        year,
        isCompleted
    };
}

function findBook(bookId) {
    for (book of books) {
        if (book.id === bookId)
            return book;
    }
    return null;
}

function findBookIndex(bookId) {
    let index = 0
    for (book of books) {
        if (book.id === bookId)
            return index;

        index++;
    }
    return -1;
}

function refreshDataFromBook() {
    let listUncompleted = document.getElementById("incompleteBookshelfList");
    let listCompleted = document.getElementById("completeBookshelfList");

    listUncompleted.innerHTML = "";
    listCompleted.innerHTML = "";

    for (book of books) {
        const newBook = createBook(book.title, book.author, book.publisher, book.year, book.isCompleted);
        newBook[ITEM_ID] = book.id;


        if (book.isCompleted) {
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
}
