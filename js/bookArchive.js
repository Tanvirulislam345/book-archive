const searchValue = document.getElementById('searchInputId');
const setValue = document.getElementById('totalSearch');
const details = document.getElementById('details');

//function for search button
const search = () => {
    details.innerHTML = '';
    const searchInput = searchValue.value;
    if (searchInput == "") {
        setValue.innerText = "Search field cannot be empty";
        return;
    } else {
        //fetch data from url and coverted single value
        setValue.innerText = '';
        const url = `https://openlibrary.org/search.json?q=${searchInput}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.numFound !== 0) {
                    let match = 1;
                    data.docs.forEach(result => {
                        setValue.innerText = `search result found : ${data.numFound}. your match result : ${match++} `;
                        // setValue.innerText = `search result found : ${a++}`;

                    })
                    displayData(data.docs);

                } else {
                    setValue.innerText = "Search result not found";
                    return;
                }
            })
    }
    searchValue.value = "";
}

//this functio used for display all result
const displayData = results => {
    results.forEach(result => {
        let pic, author, publishDate;
        if (result.cover_i === undefined || result.author_name === undefined || result.first_publish_year === undefined) {
            pic = 8236407;
            author = ["Author name was hide by author"];
            publishDate = ['publish date was hide'];
        } else {
            pic = result.cover_i;
            author = result.author_name[0];
            publishDate = result.first_publish_year;
        }
        const url = `https://covers.openlibrary.org/b/id/${pic}-M.jpg`;
        // console.log(url);
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
                <div class="card h-100">
                    <img src="${url}" class="card-img-top" alt="...">
                    <ul class="list-group">
                        <li class="list-group-item list-item"><b>Book Name :</b> ${result.title}</li>
                        <li class="list-group-item list-item"><b>Author Name</b> : ${author}</li>
                        <li class="list-group-item"><b>First publish</b> : ${publishDate}</li>
                    </ul>
                    <div class="card-footer">
                    <button type="button " class="btn btn-outline-danger w-100 ">details</button>
                    </div>
                </div
                `;

        details.appendChild(div);

    })

}