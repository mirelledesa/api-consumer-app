//manipulacion del DOM
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
let currentPage = 1;
const itemsPerPage = 10 ;

const apiSelector = document.getElementById('apiSelector');
const searchInput = document.getElementById('searchInput');
const fetchButton = document.getElementById('fetchButton');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const resultsContainer = document.getElementById('results');
const paginationContainer = document.getElementById('pagination');

function showLoading(){
    loadingElement.classList.remove('hidden');
}

function hideLoading(){
    loadingElement.classList.add('hidden');
}

function showError(message){
errorElement.textContent = message;
errorElement.classList.remove('hidden');
}

function hideError(){
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
}

//listen for the event
fetchButton.addEventListener('click', () => {
    currentPage = 1; 
    fetchData();
});

async function fetchData () {
    hideError();
    showLoading();

    const searchTerm = searchInput.value.trim();
    const seletedApi = apiSelector.value;

    try{
        let result;

        if( selectedApi === 'fetch'){
            result = await fetchDataWithFetch(searchTerm);
        }else{ 
            result = await fetchDataWithAxios(searchTerm);        
    }

    displayResults(result.data, result.totalItems);
} catch (error){
    showError(`Error al obtener los datos: ${error.message}`);
}finally {
    hideLoading();
}

async function fetchDataWithFetch(searchTerm){
    const url = new URL(API_URL);
    url.searchParams.append('_page', currentPage);
    url.searchParams.append('_limit', itemsPerPage);

    if (searchTerm){
        url.searchParams.append('q', searchTerm); 
    }
    const response = await fetch(url.toString());
    
    if (!response.ok){
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }
    const totalCountHeader = response.headers.get('X-Total-Count');

    const totalItems = totalCountHeader ? parseInt(totalCountHeader, 10) : 0 ;
    
    const data = await response.json();

    return { data, totalItems};
}

