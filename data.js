const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    if (searchField.value === '') {
        const fieldWarning = document.getElementById('field-warning');
    }
    // clear search-field after button pressed  
    searchField.value = '';

    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';


    resultBar(false);

    //show which book is searched for
    const inputText = document.getElementById('input-text');
    inputText.innerText = searchText;

    const url = https: //openlibrary.org/search.json?q=${searchText};

        fetch(url)
        .then((res) => res.json())
        .then((data) => displayResult(data.docs));
    // console.log(data.docs);
}
const displayResult = books => {
    const searchResult = document.getElementById('search-result');

    // counting total fetched result
    let totalResult = 0;
    // counting how many results to show 
    let showResult = 0;

    books.forEach(book => {

        totalResult++;
        resultCounter('total-result', totalResult);

        // applying condition to display minimum result 
        if (books.indexOf(book) < 10) {

            showResult++;
            resultCounter('result', showResult);

            const imageUrl = book.cover_i;
            const [publisher1] = [...book.publisher];

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100 rounded-3 shadow-lg bg-light">
                    <div class="row g-0">
                    <!-- thumbnail part -->
                        <div class="col-md-4">
                            <img src="https://covers.openlibrary.org/b/id/${imageUrl}-M.jpg" class="img-fluid rounded-start" alt="${book.title} cover">
                        </div>
                <!--  information part -->
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Book Name:
                                ${book.title}
                                </h5>
                                <p class="card-text">
                                    Author:
                                    ${book.author_name}
                                </p>
                                <p class="card-text">
                                    Publisher:
                                    ${publisher1}
                                    </p>
                                <p class="card-text">
                                    Publish  Date:
                                    ${book.publish_date[0]}
                                </p>
                                <p class="card-text">
                                    <small class="text-muted">
                                        First Publish:
                                        ${book.first_publish_year}
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            searchResult.appendChild(div);
        }

    });

    // console.log(showResult, totalResult);

}

const resultCounter = (idResult, result) => {
    const resultId = document.getElementById(idResult);
    resultId.innerText = result;
    resultBar(true);
}

//toggle result bar
const resultBar = isHidden => {
    const resultBarId = document.getElementById('result-bar');
    if (isHidden === true) {
        resultBarId.style.display = "block";
    } else {
        resultBarId.style.display = "none";
    }

}