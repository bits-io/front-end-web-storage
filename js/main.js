document.addEventListener("DOMContentLoaded", function() {

    const submitForm = document.getElementById("inputBook");

    submitForm.addEventListener("submit", function(event) {
        event.preventDefault();
        addBook();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }

    const searchForm = document.getElementById("searchSubmit");
    searchForm.addEventListener('click', function(event) {
        event.preventDefault();
        const title = document.getElementById('searchBookTitle').value;
        loadDataFromStorage(title);
    })
});

document.addEventListener("save_data", () => {
    alert('Data Berhasil Disimpan');
});

document.addEventListener("load_data", () => {
    refreshDataFromBook();
});