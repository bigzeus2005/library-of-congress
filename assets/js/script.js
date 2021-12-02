var searchFormEl = document.querySelector('#searchBar');
var searchTypeEl = document.querySelector('.select-dropdown');
var submitBtnEl = document.querySelector('.btn-primary');
// var goBackBtnEl = document.querySelector(); // TODO add class/id for this
var resultContainerEl = document.querySelector('#results-container');

var formSubmitHandler = function (event) {
    event.preventDefault();
    // create keyword from form submission
    var keyword = `?q=${searchFormEl.value.trim()}`;
    var type = "";
    var formatType = "";
    // set type
    if (!searchTypeEl.value === "----") {
        type = `${type}/`;
        formatType = `format=${type}`;
    } else {
        type = "search/";
        formatType = "format=";
    }

    showResultsPage(keyword, formatType);

    var searchUrl = `https://www.loc.gov/search/?${type}${keyword}&fo=json`;
    runSearch(searchUrl);
};

var showResultsPage = function (keyword, type) {
    if (window.location.href === "./index.html") {
        window.location = `./search-results.html/?q=${keyword}${type}`;
    };
};

var runSearch = function (searchUrl) {
    fetch()
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    displayResults(data, searchUrl);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to LoC');
        });
};

var displayResults = function (results, searchTerm) {
    if (results.length === 0) {
      resultContainerEl.textContent = 'No results found.';
      return;
    }
  
    searchTerm.textContent = searchTerm;
  
    for (var i = 0; i < results.length; i++) {
    // iterate through results and display on screen   
        // var resultName = results. 
        console.log(results[i]);
    }
  };

  var goBackToMain = function () {
    window.location = "./index.html";
  }

  // Event listeners
  submitBtnEl.addEventListener('submit', formSubmitHandler);
  goBackBtnEl.addEventListener('click', goBackToMain);
