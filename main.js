
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
let currentPage = 1;
const itemsPerPage = 10;

const apiSelector = document.getElementById('apiSelector');
const searchInput = document.getElementById('searchInput');
const fetchButton = document.getElementById('fetchButton');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const resultsContainer = document.getElementById('results');
const paginationContainer = document.getElementById('pagination');

function showLoading() {
  loadingElement.classList.remove('hidden');
}

function hideLoading() {
  loadingElement.classList.add('hidden');
}

function showError(message) {
  errorElement.textContent = message;
  errorElement.classList.remove('hidden');
}

function hideError() {
  errorElement.textContent = '';
  errorElement.classList.add('hidden');
}

fetchButton.addEventListener('click', () => {
  currentPage = 1; 
  fetchData();
});

async function fetchData() {
  hideError();
  showLoading();

  const searchTerm = searchInput.value.trim();
  const selectedApi = apiSelector.value;

  try {
    let result;

    if (selectedApi === 'fetch') {
      result = await fetchDataWithFetch(searchTerm);
    } else { 
      result = await fetchDataWithAxios(searchTerm);        
    }

    displayResults(result.data, result.totalItems);
  } catch (error) {
    showError(`Error al obtener los datos: ${error.message}`);
  } finally {
    hideLoading();
  }
} 

async function fetchDataWithFetch(searchTerm) {
  const url = new URL(API_URL);
  url.searchParams.append('_page', currentPage);
  url.searchParams.append('_limit', itemsPerPage);

  if (searchTerm) {
    url.searchParams.append('q', searchTerm); 
  }

  const response = await fetch(url.toString());
    
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
  }

  const totalCountHeader = response.headers.get('X-Total-Count');
  const totalItems = totalCountHeader ? parseInt(totalCountHeader, 10) : 0;
  const data = await response.json();

  return { data, totalItems };
}

async function fetchDataWithAxios(searchTerm) {
  const params = {
    _page: currentPage,
    _limit: itemsPerPage
  };
    
  if (searchTerm) {
    params.q = searchTerm;
  }

  
  const response = await axios.get(API_URL, { params });

  const totalCountHeader = response.headers['x-total-count'];
  const totalItems = totalCountHeader ? parseInt(totalCountHeader, 10) : 0;

  return {
    data: response.data,
    totalItems: totalItems
  };
}

function displayResults(posts, totalItems) {
  resultsContainer.innerHTML = '';

  if (!posts || posts.length === 0) {
    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = 'No se encontraron publicaciones.';
    resultsContainer.appendChild(noResultsMessage);
    paginationContainer.innerHTML = '';
    return;
  }

  posts.forEach(post => {
    const card = document.createElement('article');
    card.classList.add('card');

    
    const title = document.createElement('h3');
    const body = document.createElement('p');

    
    title.textContent = post.title;
    body.textContent = post.body;

   
    card.appendChild(title);
    card.appendChild(body);

    resultsContainer.appendChild(card);
  });

  renderPagination(totalItems);
}

function renderPagination(totalItems) {
  paginationContainer.innerHTML = '';

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return;

 
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;

    if (i === currentPage) {
      pageButton.disabled = true;
    }

    pageButton.addEventListener('click', () => {
      currentPage = i;
      fetchData();
    });

    paginationContainer.appendChild(pageButton);
  }
}