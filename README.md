# API Consumer App

An interactive web application built with Vanilla JavaScript for fetching, filtering, and paginating data retrieved from a public REST API ([JSONPlaceholder](https://jsonplaceholder.typicode.com/)). 

The project allows switching between two modern HTTP request approaches (`Fetch API` and `Axios`), featuring real-time term searching and dynamic DOM construction focused on XSS vulnerability prevention.

---

## 🚀 Features

- **REST API Integration:** Dynamic data fetching for posts (`/posts`).
- **HTTP Client Switching:** Support for requests using either the native browser **Fetch API** or the **Axios** library.
- **Search & Filtering:** Real-time search filtering based on user input.
- **Dynamic Pagination:** Calculation and navigation across pages using the `X-Total-Count` header returned by the API.
- **Secure UI Rendering (XSS Protection):** Strict DOM manipulation using `document.createElement()` and `.textContent` without using `innerHTML` for external data.
- **UI State Management:** Visual feedback for loading states and network error handling.

---

## 🛠️ Technologies Usedgit sta

- **HTML5:** Semantic structure of the application.
- **CSS3:** Responsive layout and card components styling.
- **JavaScript (ES6+):** Core logic, asynchronous manipulation (`async/await`), and DOM creation.
- **Axios:** External Promise-based HTTP client library.
- **JSONPlaceholder:** Fake REST API for testing and prototyping.

---

## 📁 Project Structure

```text
api-consumer-app/
│
├── index.html          # Main layout and UI elements
├── style.css          # Application styling and responsive layout
├── main.js             # API fetching logic, pagination, and DOM manipulation
└── README.md          # Project documentation