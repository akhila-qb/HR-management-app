//function to fetch and store data
function fetch_store_content(url, variable_to_store_json) {
    fetch(url)
        .then(response => response.json())
        .then(list => localStorage.setItem(variable_to_store_json, JSON.stringify(list)))
}