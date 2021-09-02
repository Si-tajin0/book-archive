//  input field
const searchBook = () => {
    const searchField = document.getElementById('book-input');
    const searchText = searchField.value;
    // clear result 
    toggleClearResult('none');
    // toggle spinner 
    toggleSpinner('block');
    // clear search field 
    searchField.value = '';

    // load data 
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs));




}
// spinner 
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
// clear result 
const toggleClearResult = displayStyle => {
    document.getElementById('clear-result').style.display = displayStyle;

}
// display result 
const displaySearchResult = (books) => {
    const searchBookResult = document.getElementById('search-result');
    // clear data 
    searchBookResult.textContent = '';
    // Books Found 
    let booksFound = document.getElementById('books-found').innerText =
        `Your search Books Found ${books.length}`;
    // loop 
    books.forEach(book => {
        // undefined image handling
        if (!book.cover_i == '') {
            // create a div
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card h-100 p-2">
            <img height="400px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title">Book Name : ${book.title}</h3>
                <p class="card-text">Author Name : ${book.author_name}</p>
                <p class="card-text">First Publish Year : ${book.first_publish_year ? book.first_publish_year : 'publish year not define'}</p>
                <p class="card-text">Publisher : ${book.publisher}</p>
            </div>
        </div>
        `;
            // div append
            searchBookResult.appendChild(div);
        }

    });
    // toggle spinner 
    toggleSpinner('none');
    // clear result 
    toggleClearResult('block');


}