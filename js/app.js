//  input field
const searchBook = () => {
    const searchField = document.getElementById('book-input');
    const searchText = searchField.value;
    // clear result 
    toggleClearResult('none');

    // toggle spinner 


    if (searchField.value === "") {
        // spinner
        toggleSpinner('none');
        // book name alert
        const booksFound = document.getElementById('books-found');

        booksFound.innerHTML = `
         <h2>Please!, Enter your book Name</h2>
         `;
    }
    else {
        // message toggle
        toggleClearMessage('none');
        // spinner toggle
        toggleSpinner('block');
        // clear search field 
        searchField.value = '';

        // load data 
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data));
    }




}
// toggle spinner 
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
// toggle  result 
const toggleClearResult = displayStyle => {
    document.getElementById('clear-result').style.display = displayStyle;

}
// toggle message
const toggleClearMessage = displayStyle => {
    document.getElementById('books-found').style.display = displayStyle;
}


// display result 
const displaySearchResult = (books) => {
    const searchBookResult = document.getElementById('search-result');
    // clear data 
    searchBookResult.textContent = '';
    const booksFound = document.getElementById('books-found');
    if (books.numFound === 0) {
        booksFound.innerHTML = `
        <h2> Enter valid book Name </h2>`;
    }
    else {
        booksFound.innerHTML = `
        <h2> Your search Books Found ${books.numFound} </h2>`;
    }




    // loop 
    books.docs.forEach(book => {
        // undefined image handling
        if (!book.cover_i == '') {
            // create a div
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card h-100 p-2">
            <img height="400px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title">Book Name : ${book.title ? book.title : 'Book name not found'}</h3>
                <p class="card-text">Author Name : ${book.author_name ? book.author_name : 'Author name not found'}</p>
                <p class="card-text">First Publish Year : ${book.first_publish_year ? book.first_publish_year : 'publish year not define'}</p>
                <p class="card-text">Publisher : ${book.publisher ? book.publisher : 'publisher not found'}</p>
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
    // clear message
    toggleClearMessage('block');


}