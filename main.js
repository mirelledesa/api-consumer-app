//manipulacion del DOM
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
let currentPag = 1;
const itemsPerPag = 10 ;

const apiSelector = document.getElementById('apiSelector');
const searchInput = document.getElementById('searchInput');
const fetchButton = document.getElementById('fetchButton');
const loadingElement = document.getElementById('loading');
const errorElements = document.getElementById('error');
const resultsContainer = document.getElementById('results');
const paginationContainer = document.getElementById('pagination');


